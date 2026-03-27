import { NextResponse } from "next/server";

/** Paths that must not redirect to `/` (first-party pages + route handlers + SEO + OG). */
const ALLOWED = new Set([
  "/",
  "/about",
  "/projects",
  "/profile.json",
  "/projects.json",
  "/robots.txt",
  "/sitemap.xml",
  "/icon",
  "/opengraph-image",
  "/twitter-image",
]);

function normalizePathname(pathname) {
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.replace(/\/+$/, "") || "/";
  }
  return pathname;
}

export function proxy(request) {
  const pathname = normalizePathname(request.nextUrl.pathname);

  if (pathname.startsWith("/.well-known/")) {
    return NextResponse.next();
  }

  if (ALLOWED.has(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url), 308);
}

export const config = {
  matcher: [
    /*
     * Run proxy for all paths except Next internals and typical static assets
     * (public files like llms.txt, *.svg still resolve without hitting redirect logic).
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|woff2?|txt)$).*)",
  ],
};
