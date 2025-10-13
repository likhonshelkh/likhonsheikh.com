import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

const PUBLIC_FILE = /\.(?:[\w-]+)$/;

function negotiateLocale(header: string | null): Locale {
  if (!header) return defaultLocale;
  const languages = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim())
    .filter(Boolean) as string[];

  for (const language of languages) {
    const base = language.toLowerCase().split("-")[0];
    if (isLocale(base)) {
      return base;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0];

  if (isLocale(locale)) {
    return NextResponse.next();
  }

  const matched = negotiateLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${matched}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|.*\\.\w+|api).*)"],
};
