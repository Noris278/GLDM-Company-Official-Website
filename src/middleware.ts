import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { verifyAuthToken } from "@/lib/auth"

const PROTECTED_API_PREFIXES = ["/api/content", "/api/upload"]

function isProtectedAdminPath(pathname: string) {
  return pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")
}

function isProtectedApi(pathname: string) {
  return PROTECTED_API_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("admin-auth")?.value
  const isAuthenticated = await verifyAuthToken(token)

  if (isProtectedAdminPath(pathname) || isProtectedApi(pathname)) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url)
      if (isProtectedApi(pathname)) {
        return NextResponse.json({ error: "未授权" }, { status: 401 })
      }
      return NextResponse.redirect(loginUrl)
    }
  }

  if (pathname.startsWith("/admin/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/content", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
}
