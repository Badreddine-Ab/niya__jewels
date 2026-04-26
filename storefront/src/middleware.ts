import { NextRequest, NextResponse } from "next/server"

const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "ma"

// Hardcoded country → region map — no backend call on every request
const COUNTRY_CODES = new Set(["ma", "fr", "dz", "tn", "be", "ch"])

function getCountryCode(request: NextRequest): string {
  const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase()
  if (urlCountryCode && COUNTRY_CODES.has(urlCountryCode)) {
    return urlCountryCode
  }

  const vercelCountryCode = request.headers
    .get("x-vercel-ip-country")
    ?.toLowerCase()
  if (vercelCountryCode && COUNTRY_CODES.has(vercelCountryCode)) {
    return vercelCountryCode
  }

  return DEFAULT_REGION
}

export function middleware(request: NextRequest) {
  // Static assets pass through
  if (request.nextUrl.pathname.includes(".")) {
    return NextResponse.next()
  }

  const countryCode = getCountryCode(request)

  const urlHasCountryCode =
    request.nextUrl.pathname.split("/")[1]?.toLowerCase() === countryCode

  if (urlHasCountryCode) {
    return NextResponse.next()
  }

  const redirectPath =
    request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname
  const queryString = request.nextUrl.search || ""
  const redirectUrl = `${request.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`

  return NextResponse.redirect(redirectUrl, 307)
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}