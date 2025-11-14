import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import sharp from "sharp"

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get("file")

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "缺少文件" }, { status: 400 })
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "仅支持图片上传" }, { status: 400 })
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads")
  await fs.mkdir(uploadsDir, { recursive: true })

  const timestamp = Date.now()
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
  const baseName = `${timestamp}-${safeName.replace(/\.[^.]+$/, "")}`

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const originalExt = path.extname(safeName) || ".img"
  const originalPath = path.join(uploadsDir, `${baseName}${originalExt}`)

  await fs.writeFile(originalPath, buffer)

  const webpPath = path.join(uploadsDir, `${baseName}.webp`)
  const avifPath = path.join(uploadsDir, `${baseName}.avif`)
  await sharp(buffer).webp({ quality: 80 }).toFile(webpPath)
  await sharp(buffer).avif({ quality: 45 }).toFile(avifPath)

  return NextResponse.json({
    original: `/uploads/${baseName}${originalExt}`,
    webp: `/uploads/${baseName}.webp`,
    avif: `/uploads/${baseName}.avif`,
  })
}
