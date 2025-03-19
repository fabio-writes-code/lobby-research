'use server'

import { headers } from 'next/headers';
import * as Sentry from '@sentry/nextjs';

/**
 * Security event types for application monitoring
 * 
 * Note on CSRF protection:
 * This application relies on Next.js 14's built-in CSRF protections for Server Actions:
 * - Server Actions only accept POST requests
 * - Same-Site cookies are the default
 * - Origin/Host header validation is automatically performed
 * 
 * No additional CSRF tokens are required, but proper HTML sanitization
 * should be implemented for any user-generated content.
 */
type SecurityEventType = 
  | 'authentication_failure'
  | 'authorization_failure'
  | 'rate_limit_exceeded'
  | 'suspicious_activity'
  | 'csrf_failure';

interface SecurityEvent {
  type: SecurityEventType;
  message: string;
  ip?: string;
  userId?: string;
  path?: string;
  timestamp: string;
  metadata?: Record<string, string | number | boolean | null | undefined>;
}

export async function logSecurityEvent(event: Omit<SecurityEvent, 'ip' | 'path' | 'timestamp'>) {
  try {
    const headersList = headers();
    const forwardedFor = headersList.get('x-forwarded-for') ?? '';
    const ip = forwardedFor ? forwardedFor.split(',')[0]!.trim() : 'unknown';
    const path = headersList.get('x-invoke-path') ?? 'unknown';
    
    const securityEvent: SecurityEvent = {
      ...event,
      ip,
      path,
      timestamp: new Date().toISOString(),
    };
    
    // Log to console in development
    console.warn('SECURITY EVENT:', securityEvent);
    
    // Send to Sentry
    Sentry.captureMessage(`Security Event: ${event.type}`, {
      level: getSeverityLevel(event.type),
      tags: {
        securityEventType: event.type,
        userId: event.userId ?? 'anonymous',
        path: path
      },
      contexts: {
        securityEvent: {
          ...securityEvent
        }
      }
    });
    
  } catch (error) {
    // Ensure logging failures don't break the application
    console.error('Failed to log security event:', error);
  }
}

/**
 * Maps security event types to Sentry severity levels
 */
function getSeverityLevel(eventType: SecurityEventType): Sentry.SeverityLevel {
  switch (eventType) {
    case 'suspicious_activity':
    case 'csrf_failure':
      return 'error';
    case 'authentication_failure':
    case 'authorization_failure':
      return 'warning';
    case 'rate_limit_exceeded':
      return 'info';
    default:
      return 'warning';
  }
}

// Example function to notify administrators
// async function notifyAdministrators(event: SecurityEvent) {
//   // Implementation depends on your notification system
// }

