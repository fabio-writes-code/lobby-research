/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import { withSentryConfig } from "@sentry/nextjs"

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
