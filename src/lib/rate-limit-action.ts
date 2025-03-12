"use server";

import { rateLimitAction } from './rate-limit';

// Wrapper for sign-in rate limiting
export async function checkSignInRateLimit() {
  return rateLimitAction('sign-in', {
    limit: 5,
    windowInSeconds: 60 // 1 minute
  });
}

// Wrapper for password reset request rate limiting
export async function checkPasswordResetRateLimit() {
  return rateLimitAction('password-reset-request', {
    limit: 3,
    windowInSeconds: 300 // 5 minutes
  });
}

// Wrapper for registration rate limiting
export async function checkRegistrationRateLimit() {
  return rateLimitAction('registration', {
    limit: 3,
    windowInSeconds: 300 // 5 minutes
  });
}

