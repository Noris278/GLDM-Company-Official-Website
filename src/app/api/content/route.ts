import { NextRequest, NextResponse } from "next/server"
import { getSiteContent, updateSiteContent, type SiteContent } from "@/lib/content"

export async function GET() {
  try {
    const content = await getSiteContent()
    return NextResponse.json(content)
  } catch (error) {
    console.error("读取内容失败", error)
    return NextResponse.json({ error: "读取内容失败" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const payload = (await request.json()) as SiteContent
    await updateSiteContent(payload)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("更新内容失败", error)
    return NextResponse.json({ error: "更新内容失败" }, { status: 500 })
  }
}
