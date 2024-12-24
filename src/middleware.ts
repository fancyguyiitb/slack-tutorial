import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// Define public pages
const isPublicPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware(async (request) => {
  const isAuthenticated = await isAuthenticatedNextjs(); // Await the result of the authentication check

  // If the request is for a public page, allow access
  if (isPublicPage(request)) {
    // If the user is already authenticated and tries to access the public page, redirect them to the home page
    if (isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/");
    }
    return; // Allow unauthenticated users to access public pages
  }

  // If the user is not authenticated, redirect them to /auth
  if (!isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }

  // If authenticated and accessing a protected route, allow the request to proceed
  return;
});

// Configure middleware to run on all relevant routes
export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Matches all routes except static files
    "/", // Match the root route
    "/(api|trpc)(.*)", // Match API routes
  ],
};
