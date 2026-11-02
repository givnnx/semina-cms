import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith("/signin");
  const isProtectedRoute =
    pathname === "/" ||
    pathname.startsWith("/categories") ||
    pathname.startsWith("/talents") ||
    pathname.startsWith("/events") ||
    pathname.startsWith("/payments") ||
    pathname.startsWith("/orders");

  if (!token && isProtectedRoute) {
    const signInUrl = new URL("/signin", request.url);
    return NextResponse.redirect(signInUrl);
  }

  if (token && isAuthRoute) {
    const dashboardUrl = new URL("/", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/signin/:path*",
    "/categories/:path*",
    "/talents/:path*",
    "/events/:path*",
    "/payments/:path*",
    "/orders/:path*",
  ],
};
