export const publicRoutes = [
    "/",
];

export const authRoutes = [
    "/auth/login",
    "/auth/register",
];
/**
 * Prefix for all API authentication routes.
 * Routes that start with this prefix is for API authentication. 
 * should be excluded from the middleware to allow next-auth to handle them
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect path after user is logged in
 */
export const DEFAULT_LOGIN_RERDIRECT = "/settings";