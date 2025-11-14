import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createAuthToken, isPasswordValid } from "@/lib/auth"

export async function POST(request: Request) {
  const { password } = await request.json()

  if (!isPasswordValid(password ?? "")) {
    return NextResponse.json({ error: "密码错误" }, { status: 401 })
  }

  const token = await createAuthToken(password)
  cookies().set("admin-auth", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  })

  return NextResponse.json({ success: true })
}
