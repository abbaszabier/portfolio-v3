import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/locales"

function detectLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language")
  if (!acceptLanguage) return DEFAULT_LOCALE

  const preferred = acceptLanguage
    .split(",")
    .map((entry) => entry.split(";")[0].trim().toLowerCase())

  for (const lang of preferred) {
    const base = lang.split("-")[0]
    const match = LOCALES.find((locale) => locale === lang || locale === base)
    if (match) return match
  }

  return DEFAULT_LOCALE
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
  if (hasLocale) return

  const locale = detectLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/((?!admin|_next|api|.*\\..*).*)"],
}
