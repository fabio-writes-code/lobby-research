/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import { withSentryConfig } from "@sentry/nextjs"

/** @type {import("next").NextConfig} */
const config = {};

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
