import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function resolveSiteId(hostname: string): string {
  if (hostname.includes("mdfiletopdf")) return "converter";
  if (hostname.includes("viewmdfile")) return "viewer";
  return "viewer";
}

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "localhost";
  let siteId = resolveSiteId(hostname);

  // Allow ?site=converter|viewer query param for local development
  const siteParam = request.nextUrl.searchParams.get("site");
  if (siteParam === "converter" || siteParam === "viewer") {
    siteId = siteParam;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-site-id", siteId);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
