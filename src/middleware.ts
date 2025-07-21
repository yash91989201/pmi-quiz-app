import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
// CONSTANTS
import { apiAuthPrefix, authRoutes, publicRoutes } from "@/config/routes";

export async function middleware(req: NextRequest) {
  const nextUrl = req.nextUrl;
  const sessionToken = req.cookies.get("__Secure-authjs.session-token")?.value;

  const isLoggedIn = !!sessionToken;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Decide redirect path based on route
  const notAuthenticatedRedirect = nextUrl.pathname.startsWith("/admin")
    ? "/auth/admin/login"
    : "/auth/login";

  if (isApiAuthRoute) return NextResponse.next();

  if (isAuthRoute) {
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(
      new URL(notAuthenticatedRedirect, req.nextUrl.origin),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
