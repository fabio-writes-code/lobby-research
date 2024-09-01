/**
 * An array of routes that are accesible to the public
 * Routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/auth/signIn"];

/**
 * An array of routes used for authentication purposes
 * Will redirect users to contacts/list upon successful authentication
 * @type {string[]}
 */

export const authRoutes: string[] = ["/auth/signIn", "/error"];

/**
 * Prefix for all API authentication routes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect route after successful authentication
 * @type {string}
 */

export const DEFAULT_REDIRECT = "/";
