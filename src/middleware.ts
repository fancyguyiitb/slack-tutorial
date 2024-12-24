import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// Define public pages
const isPublicPage = createRouteMatcher(["/signin"]);

export default convexAuthNextjsMiddleware(async (request) => {
  const isAuthenticated = await isAuthenticatedNextjs(); // Ensure this function gets the request context

  // If the request is for a public page, allow access
  if (isPublicPage(request)) {
    return;
  }

  // If the user is not authenticated, redirect to /signin
  if (!isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/signin");
  }

  // If authenticated, proceed
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
