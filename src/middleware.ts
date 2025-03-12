import { auth } from "~/auth";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_REDIRECT,
} from "../routes";
import { NextResponse } from "next/server";
import { rateLimit } from "./lib/rate-limit";

function addSecurityHeaders(response:NextResponse):void{
  // Basic security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
}

export default auth(async(req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const rateLimitResponse = await rateLimit(req);
  if (rateLimitResponse) return rateLimitResponse
  

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Create a response variable to add security headers later
  let response: NextResponse | undefined;

  if (isApiRoute) {
    return undefined;
  }

  if (isAuthRoute && !isLoggedIn) {
    return undefined;
  }

  if (isAuthRoute && isLoggedIn) {
    response = NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }

  if (req.nextUrl.pathname.startsWith("/api/admin/")) {
    // For admin routes, check both authentication and authorization
    if (!isLoggedIn) {
      response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else if (req.auth?.user.role !== "ADMIN") {
      // Assuming role is available in auth object
      response = NextResponse.json({ error: "Forbidden" }, { status: 403 });
    } else {
      return undefined;
    }
  }

  if (!isLoggedIn && !isPublicRoute) {
    // Store the original URL to redirect back after login
    const callbackUrl = encodeURIComponent(nextUrl.pathname);
    response = NextResponse.redirect(
      new URL(`/auth/sign-in?callbackUrl=${callbackUrl}`, nextUrl.origin)
    );
  }

  // Add security headers to the response if we have one
  if (response) {
    addSecurityHeaders(response);
  }

  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
