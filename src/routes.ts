/**
 * an Array of route that publicly accessible
 * these routes do not requires authentication
 * @type string[]
 */
export const publicRoutes = ["/"];

/**
 * An array of route that requires authentication
 * these routes will redirect logged in user to /settings 
 * @type string[]

 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * the prefix for Nextauth API
 * the route start with this prefix is used for authentication purposes
 * @type string
 *
 */
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
