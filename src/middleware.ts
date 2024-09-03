import { auth } from "~/auth";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_REDIRECT,
} from "../routes";
import { NextRequest, NextResponse } from "next/server";

export default auth((req) => {
  console.log("repeat");
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) return undefined;

  if (isAuthRoute && !isLoggedIn) return undefined;

  if (isAuthRoute && isLoggedIn)
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

  if (req.nextUrl.pathname.startsWith("/api/admin/users/") && !isLoggedIn)
    return undefined;

  if (!isLoggedIn && !isPublicRoute)
    return NextResponse.redirect(new URL("/auth/sign-in", nextUrl.origin));

  return undefined;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
