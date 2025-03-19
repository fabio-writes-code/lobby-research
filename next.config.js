/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import { withSentryConfig } from "@sentry/nextjs"

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline' https://maxcdn.bootstrapcdn.com;
    img-src 'self' blob: data:;
    font-src 'self' https://maxcdn.bootstrapcdn.com data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    worker-src 'self' blob: ;
    connect-src 'self' https://cdn.jsdelivr.net;
`

/** @type {import("next").NextConfig} */
const config = {
  images: {
    // Disable image optimization in development mode
    unoptimized: process.env.NODE_ENV === 'development',
    // Configure domains for remote images if needed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    // Increase the image size limit if needed
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256, 384],
  },
  // Add security headers
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key:'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, '')
          }
        ],
      },
    ];
  },
};

// The withSentryConfig function expects the Next.js config as the first argument
// and the Sentry webpack plugin options as the second argument
export default withSentryConfig(
  config,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options
    org: "alberta-counsel-00",
    project: "hansard_webapp",
    silent: !process.env.CI,
    
    // These options were previously in the third argument
    // but should be part of the second argument
    widenClientFileUpload: true,
    tunnelRoute: "/monitoring",
    disableLogger: true,
  }
);
