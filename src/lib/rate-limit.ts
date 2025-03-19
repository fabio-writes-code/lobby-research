'use server'
import { redis } from './redis';
import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export interface RateLimitConfig {
  // Maximum number of requests allowed within the window
  limit: number;
  // Time window in seconds
  windowInSeconds: number;
}

// Default rate limit configuration
const DEFAULT_RATE_LIMIT: RateLimitConfig = {
  limit: 60,
  windowInSeconds: 60, // 1 minute
};

// Stricter rate limit for auth actions
const AUTH_RATE_LIMIT: RateLimitConfig = {
  limit: 10,
  windowInSeconds: 60, // 1 minute
};

// Core rate limiting function that works with any identifier and action
export async function rateLimitCore(
  identifier: string,
  action: string,
  config: RateLimitConfig = DEFAULT_RATE_LIMIT
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  try {
    // Create a unique key for this identifier and action
    const key = `rate-limit:${identifier}:${action}`;
    
    // Get the current count for this key
    const currentCount = await redis.get<number>(key) ?? 0;
    
    // If this is the first request, set the key with expiration
    if (currentCount === 0) {
      await redis.set(key, 1, { ex: config.windowInSeconds });
      return { 
        success: true, 
        limit: config.limit,
        remaining: config.limit - 1,
        reset: config.windowInSeconds
      };
    }
    
    // If under the limit, increment the counter
    if (currentCount < config.limit) {
      await redis.incr(key);
      const ttl = await redis.ttl(key);
      return { 
        success: true, 
        limit: config.limit,
        remaining: config.limit - currentCount - 1,
        reset: ttl > 0 ? ttl : config.windowInSeconds
      };
    }
    
    // If over the limit, return failure
    const ttl = await redis.ttl(key);
    return { 
      success: false, 
      limit: config.limit,
      remaining: 0,
      reset: ttl > 0 ? ttl : config.windowInSeconds
    };
  } catch (error) {
    // If Redis is unavailable, log the error but don't block the request
    console.error('Rate limiting error:', error);
    return { 
      success: true, 
      limit: config.limit,
      remaining: config.limit - 1,
      reset: config.windowInSeconds
    };
  }
}

// Rate limiting for middleware (HTTP routes)
export async function rateLimit(
  req: NextRequest,
): Promise<NextResponse | null> {
  // Only apply rate limiting to public authentication endpoints that need protection
  const { pathname } = req.nextUrl;
  
  // Skip rate limiting for session checks and CSRF token requests
  if (pathname.includes('/api/auth/session') || 
      pathname.includes('/api/auth/csrf') ||
      pathname.includes('/_next/image') ||
      pathname.includes('/favicon.ico')) {
    return null;
  }
  
  // Define specific routes that need rate limiting
  const publicAuthRoutes = [
    '/auth/sign-in',
    '/auth/register',
    '/auth/reset',
    '/auth/request-password-reset',
    '/auth/password-reset',
    '/api/auth/callback',
    '/api/auth/signin',
    '/api/auth/signout',
    '/api/users/userRegister',
    '/api/send_password_reset',
    '/api/users/password-reset'
  ];
  
  // Check if the current path matches any of our protected routes
  const isProtectedRoute = publicAuthRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );
  
  if (!isProtectedRoute) {
    return null;
  }

  // Use stricter limits for auth routes
  const rateConfig = AUTH_RATE_LIMIT;

  // Get client identifier (IP address)
  const ip = req.ip ?? 'anonymous';
  
  const result = await rateLimitCore(ip, pathname, rateConfig);
  
  if (!result.success) {
    // If over the limit, return 429 Too Many Requests
    const response = NextResponse.json(
      { error: "Too many requests, please try again later" },
      { status: 429 }
    );
    
    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', String(result.limit));
    response.headers.set('X-RateLimit-Remaining', String(result.remaining));
    response.headers.set('X-RateLimit-Reset', String(result.reset));
    response.headers.set('Retry-After', String(result.reset));
    
    return response;
  }
  
  return null;
}

// Rate limiting for server actions
export async function rateLimitAction(
  actionName: string,
  config: RateLimitConfig = AUTH_RATE_LIMIT
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get client IP from headers
    const headersList = headers();
    const forwardedFor = headersList.get('x-forwarded-for') ?? '';
    const ip = forwardedFor ? forwardedFor.split(',')[0]!.trim() : 'anonymous';
    
    const result = await rateLimitCore(ip, `action:${actionName}`, config);
    
    if (!result.success) {
      // Import and use the security logger
      const { logSecurityEvent } = await import('./security-logger');
      await logSecurityEvent({
        type: 'rate_limit_exceeded',
        message: `Rate limit exceeded for action: ${actionName}`,
        metadata: { 
          ip,
          actionName,
          limit: config.limit,
          windowInSeconds: config.windowInSeconds
        }
      });
      
      return { 
        success: false, 
        error: `Too many attempts. Please try again in ${result.reset} seconds.` 
      };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Action rate limiting error:', error);
    // If there's an error with rate limiting, allow the action to proceed
    return { success: true };
  }
}
