"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SiteContent } from "@/lib/content"

export default function ContentAdminPage() {
  const router = useRouter()
  const [content, setContent] = useState<SiteContent | null>(null)
  const [status, setStatus] = useState<string>("")
  const [saving, setSaving] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<{ original: string; webp: string; avif: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data: SiteContent) => setContent(data))
      .catch(() => setStatus("加载内容失败，请稍后再试。"))
  }, [])

  const updateHeroField = <K extends keyof SiteContent["hero"]>(field: K, value: SiteContent["hero"][K]) => {
    if (!content) return
    setContent({
      ...content,
      hero: {
        ...content.hero,
        [field]: value,
      },
    })
  }

  const updateHeroTitle = (field: keyof SiteContent["hero"]["title"], value: string) => {
    if (!content) return
    setContent({
      ...content,
      hero: {
        ...content.hero,
        title: {
          ...content.hero.title,
          [field]: value,
        },
      },
    })
  }

  const handleSave = async () => {
    if (!content) return
    setSaving(true)
    setStatus("")
    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      })
      if (!response.ok) {
        throw new Error("保存失败")
      }
      setStatus("内容已保存。")
    } catch (error) {
      console.error(error)
      setStatus("保存失败，请检查日志或稍后再试。")
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  const uploadFile = async (file: File) => {
    setUploading(true)
    setStatus("")
    try {
      const formData = new FormData()
      formData.append("file", file)
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error ?? "上传失败")
      }
      setUploadResult(data)
      setStatus("文件上传成功，可复制路径至对应内容表单。")
    } catch (error) {
      console.error(error)
      setStatus("上传失败，请重试。")
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(false)
    const file = event.dataTransfer.files?.[0]
    if (file) uploadFile(file)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(false)
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) uploadFile(file)
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">内容加载中...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">内容管理</h1>
          <p className="text-sm text-gray-500">在此更新官网展示的文案、图片和统计数据。</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleLogout}>
            退出登录
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "保存中..." : "保存内容"}
          </Button>
        </div>
      </header>

      <div className="flex gap-4 text-sm text-gray-600">
        <span className="text-primary-600 font-semibold">首页内容</span>
        <span>·</span>
        <Link href="/admin/about" className="hover:text-primary-600">
          关于我们内容
        </Link>
      </div>

      {status && <div className="text-sm text-primary-600">{status}</div>}

      <Card>
        <CardHeader>
          <CardTitle>素材上传（自动转为 WebP/AVIF）</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
              dragActive ? "border-primary bg-primary-50" : "border-gray-300 bg-white"
            } ${uploading ? "opacity-60" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p className="text-gray-600 mb-4">拖拽图片到此或点击按钮选择文件</p>
            <div className="flex justify-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? "上传中..." : "选择文件"}
              </Button>
              {uploadResult && (
                <div className="text-left text-sm text-gray-600">
                  <p>原图：{uploadResult.original}</p>
                  <p>WebP：{uploadResult.webp}</p>
                  <p>AVIF：{uploadResult.avif}</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>首页应用领域标题</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            徽章文字
            <input
              className="mt-1 w-full rounded border border-gray-200 p-2"
              value={content.applicationIntro.badge}
              onChange={(event) =>
                setContent({
                  ...content,
                  applicationIntro: { ...content.applicationIntro, badge: event.target.value },
                })
              }
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            标题
            <input
              className="mt-1 w-full rounded border border-gray-200 p-2"
              value={content.applicationIntro.title}
              onChange={(event) =>
                setContent({
                  ...content,
                  applicationIntro: { ...content.applicationIntro, title: event.target.value },
                })
              }
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            高亮文字
            <input
              className="mt-1 w-full rounded border border-gray-200 p-2"
              value={content.applicationIntro.highlight}
              onChange={(event) =>
                setContent({
                  ...content,
                  applicationIntro: { ...content.applicationIntro, highlight: event.target.value },
                })
              }
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            描述
            <textarea
              className="mt-1 w-full rounded border border-gray-200 p-2 h-24"
              value={content.applicationIntro.description}
              onChange={(event) =>
                setContent({
                  ...content,
                  applicationIntro: { ...content.applicationIntro, description: event.target.value },
                })
              }
            />
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>核心优势（六宫格）</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.advantages.map((advantage, index) => (
            <div key={index} className="space-y-4 border border-dashed border-gray-200 rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <label className="text-sm font-medium text-gray-700">
                  标题
                  <input
                    className="mt-1 w-full rounded border border-gray-200 p-2"
                    value={advantage.title}
                    onChange={(event) => {
                      const next = [...content.advantages]
                      next[index] = { ...advantage, title: event.target.value }
                      setContent({ ...content, advantages: next })
                    }}
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  图片路径
                  <input
                    className="mt-1 w-full rounded border border-gray-200 p-2"
                    value={advantage.image}
                    onChange={(event) => {
                      const next = [...content.advantages]
                      next[index] = { ...advantage, image: event.target.value }
                      setContent({ ...content, advantages: next })
                    }}
                  />
                </label>
              </div>
              <label className="text-sm font-medium text-gray-700">
                描述
                <textarea
                  className="mt-1 w-full rounded border border-gray-200 p-2 h-24"
                  value={advantage.description}
                  onChange={(event) => {
                    const next = [...content.advantages]
                    next[index] = { ...advantage, description: event.target.value }
                    setContent({ ...content, advantages: next })
                  }}
                />
              </label>
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const next = content.advantages.filter((_, i) => i !== index)
                    setContent({ ...content, advantages: next })
                  }}
                >
                  删除
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setContent({
                ...content,
                advantages: [
                  ...content.advantages,
                  { title: "新增优势", description: "", image: "/images/factory/winding-machine.webp" },
                ],
              })
            }
          >
            新增卡片
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>核心优势 - 统计数据</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.advantagesStats.map((stat, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-4">
              <label className="text-sm font-medium text-gray-700">
                数值
                <input
                  className="mt-1 w-full rounded border border-gray-200 p-2"
                  value={stat.value}
                  onChange={(event) => {
                    const next = [...content.advantagesStats]
                    next[index] = { ...stat, value: event.target.value }
                    setContent({ ...content, advantagesStats: next })
                  }}
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                描述
                <input
                  className="mt-1 w-full rounded border border-gray-200 p-2"
                  value={stat.label}
                  onChange={(event) => {
                    const next = [...content.advantagesStats]
                    next[index] = { ...stat, label: event.target.value }
                    setContent({ ...content, advantagesStats: next })
                  }}
                />
              </label>
              <div className="md:col-span-2 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const next = content.advantagesStats.filter((_, i) => i !== index)
                    setContent({ ...content, advantagesStats: next })
                  }}
                >
                  删除
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setContent({
                ...content,
                advantagesStats: [...content.advantagesStats, { value: "0", label: "新增描述" }],
              })
            }
          >
            新增统计
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>产品中心 - 页面文案</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            徽章文字
            <input
              className="mt-1 w-full rounded border border-gray-200 p-2"
              value={content.productIntro.badge}
              onChange={(event) =>
                setContent({
                  ...content,
                  productIntro: { ...content.productIntro, badge: event.target.value },
                })
              }
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            标题
            <input
              className="mt-1 w-full rounded border border-gray-200 p-2"
              value={content.productIntro.title}
              onChange={(event) =>
                setContent({
                  ...content,
                  productIntro: { ...content.productIntro, title: event.target.value },
                })
              }
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            高亮文字
            <input
              className="mt-1 w-full rounded border border-gray-200 p-2"
              value={content.productIntro.highlight}
              onChange={(event) =>
                setContent({
                  ...content,
                  productIntro: { ...content.productIntro, highlight: event.target.value },
                })
              }
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            描述
            <textarea
              className="mt-1 w-full rounded border border-gray-200 p-2 h-24"
              value={content.productIntro.description}
              onChange={(event) =>
                setContent({
                  ...content,
                  productIntro: { ...content.productIntro, description: event.target.value },
                })
              }
            />
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>产品中心 - 产品列表</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {content.products.map((product, index) => (
            <div key={index} className="space-y-4 border border-dashed border-gray-200 rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <label className="text-sm font-medium text-gray-700">
                  标题
                  <input
                    className="mt-1 w-full rounded border border-gray-200 p-2"
                    value={product.title}
                    onChange={(event) => {
                      const next = [...content.products]
                      next[index] = { ...product, title: event.target.value }
                      setContent({ ...content, products: next })
                    }}
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  副标题
                  <input
                    className="mt-1 w-full rounded border border-gray-200 p-2"
                    value={product.subtitle}
                    onChange={(event) => {
                      const next = [...content.products]
                      next[index] = { ...product, subtitle: event.target.value }
                      setContent({ ...content, products: next })
                    }}
                  />
                </label>
              </div>
              <label className="text-sm font-medium text-gray-700">
                描述
                <textarea
                  className="mt-1 w-full rounded border border-gray-200 p-2 h-24"
                  value={product.description}
                  onChange={(event) => {
                    const next = [...content.products]
                    next[index] = { ...product, description: event.target.value }
                    setContent({ ...content, products: next })
                  }}
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                图片路径
                <input
                  className="mt-1 w-full rounded border border-gray-200 p-2"
                  value={product.image}
                  onChange={(event) => {
                    const next = [...content.products]
                    next[index] = { ...product, image: event.target.value }
                    setContent({ ...content, products: next })
                  }}
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                特性（每行一个）
                <textarea
                  className="mt-1 w-full rounded border border-gray-200 p-2 h-24"
                  value={product.features.join("\n")}
                  onChange={(event) => {
                    const values = event.target.value
                      .split("\n")
                      .map((item) => item.trim())
                      .filter(Boolean)
                    const next = [...content.products]
                    next[index] = { ...product, features: values }
                    setContent({ ...content, products: next })
                  }}
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                应用领域（每行一个）
                <textarea
                  className="mt-1 w-full rounded border border-gray-200 p-2 h-20"
                  value={product.applications.join("\n")}
                  onChange={(event) => {
                    const values = event.target.value
                      .split("\n")
                      .map((item) => item.trim())
                      .filter(Boolean)
                    const next = [...content.products]
                    next[index] = { ...product, applications: values }
                    setContent({ ...content, products: next })
                  }}
                />
              </label>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-800">技术规格</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const next = [...content.products]
                      next[index] = {
                        ...product,
                        specs: [...product.specs, { label: "新规格", value: "" }],
                      }
                      setContent({ ...content, products: next })
                    }}
                  >
                    新增规格
                  </Button>
                </div>
                {product.specs.map((spec, specIndex) => (
                  <div key={specIndex} className="grid md:grid-cols-2 gap-3 items-center">
                    <input
                      className="rounded border border-gray-200 p-2 text-sm"
                      value={spec.label}
                      onChange={(event) => {
                        const next = [...content.products]
                        const specs = [...product.specs]
                        specs[specIndex] = { ...spec, label: event.target.value }
                        next[index] = { ...product, specs }
                        setContent({ ...content, products: next })
                      }}
                    />
                    <div className="flex space-x-2">
                      <input
                        className="w-full rounded border border-gray-200 p-2 text-sm"
                        value={spec.value}
                        onChange={(event) => {
                          const next = [...content.products]
                          const specs = [...product.specs]
                          specs[specIndex] = { ...spec, value: event.target.value }
                          next[index] = { ...product, specs }
                          setContent({ ...content, products: next })
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const next = [...content.products]
                          next[index] = {
                            ...product,
                            specs: product.specs.filter((_, i) => i !== specIndex),
                          }
                          setContent({ ...content, products: next })
                        }}
                      >
                        删除
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const next = content.products.filter((_, i) => i !== index)
                    setContent({ ...content, products: next })
                  }}
                >
                  删除产品
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setContent({
                ...content,
                products: [
                  ...content.products,
                  {
                    title: "新增产品",
                    subtitle: "Product Sub Title",
                    description: "",
                    image: "/images/products/spec-01.webp",
                    features: [],
                    applications: [],
                    specs: [],
                  },
                ],
              })
            }
          >
            新增产品
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>首页应用领域卡片</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.applicationCards.map((card, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-4 border border-dashed border-gray-200 rounded-lg p-4">
              <label className="text-sm font-medium text-gray-700">
                标题
                <input
                  className="mt-1 w-full rounded border border-gray-200 p-2"
                  value={card.title}
                  onChange={(event) => {
                    const next = [...content.applicationCards]
                    next[index] = { ...card, title: event.target.value }
                    setContent({ ...content, applicationCards: next })
                  }}
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                图片路径
                <input
                  className="mt-1 w-full rounded border border-gray-200 p-2"
                  value={card.image}
                  onChange={(event) => {
                    const next = [...content.applicationCards]
                    next[index] = { ...card, image: event.target.value }
                    setContent({ ...content, applicationCards: next })
                  }}
                />
              </label>
              <div className="md:col-span-2 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const next = content.applicationCards.filter((_, i) => i !== index)
                    setContent({ ...content, applicationCards: next })
                  }}
                >
                  删除卡片
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setContent({
                ...content,
                applicationCards: [
                  ...content.applicationCards,
                  { title: "新增应用", image: "/images/products/spec-01.webp" },
                ],
              })
            }
          >
            新增应用卡片
          </Button>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>首页 Hero 区域</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            徽章文字
            <input
              className="mt-1 w-full rounded border border-gray-200 p-2"
              value={content.hero.badge}
              onChange={(event) => updateHeroField("badge", event.target.value)}
            />
          </label>
          <div className="grid md:grid-cols-3 gap-4">
            {(["prefix", "highlight", "suffix"] as Array<keyof SiteContent["hero"]["title"]>).map((field) => (
              <label key={field} className="block text-sm font-medium text-gray-700">
                标题 {field === "prefix" ? "前缀" : field === "highlight" ? "高亮" : "后缀"}
                <input
                  className="mt-1 w-full rounded border border-gray-200 p-2"
                  value={content.hero.title[field]}
                  onChange={(event) => updateHeroTitle(field, event.target.value)}
                />
              </label>
            ))}
          </div>
          <label className="block text-sm font-medium text-gray-700">
            段落（每行一段）
            <textarea
              className="mt-1 w-full rounded border border-gray-200 p-2 h-32"
              value={content.hero.descriptions.join("\n")}
              onChange={(event) =>
                updateHeroField(
                  "descriptions",
                  event.target.value
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean)
                )
              }
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            特色标签（每行一个）
            <textarea
              className="mt-1 w-full rounded border border-gray-200 p-2 h-24"
              value={content.hero.features.join("\n")}
              onChange={(event) =>
                updateHeroField(
                  "features",
                  event.target.value
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean)
                )
              }
            />
          </label>
          <div className="border-t border-gray-100 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900">右侧轮播图片</h3>
                <p className="text-sm text-gray-500">
                  可先使用上方“素材上传”功能获取图片地址，再填入此处。
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const next = [
                    ...content.hero.gallery,
                    { src: "/images/factory/winding-machine.webp", alt: "新增轮播图" },
                  ]
                  setContent({ ...content, hero: { ...content.hero, gallery: next } })
                }}
              >
                新增图片
              </Button>
            </div>
            {content.hero.gallery.length === 0 && (
              <p className="text-sm text-gray-500">当前没有轮播图片。</p>
            )}
            {content.hero.gallery.map((image, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-4 border border-dashed border-gray-200 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-700">
                  图片路径
                  <input
                    className="mt-1 w-full rounded border border-gray-200 p-2"
                    value={image.src}
                    onChange={(event) => {
                      const next = [...content.hero.gallery]
                      next[index] = { ...image, src: event.target.value }
                      setContent({ ...content, hero: { ...content.hero, gallery: next } })
                    }}
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  文案/Alt
                  <input
                    className="mt-1 w-full rounded border border-gray-200 p-2"
                    value={image.alt ?? ""}
                    onChange={(event) => {
                      const next = [...content.hero.gallery]
                      next[index] = { ...image, alt: event.target.value }
                      setContent({ ...content, hero: { ...content.hero, gallery: next } })
                    }}
                  />
                </label>
                <div className="md:col-span-2 flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const next = content.hero.gallery.filter((_, i) => i !== index)
                      setContent({ ...content, hero: { ...content.hero, gallery: next } })
                    }}
                  >
                    删除
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>首页统计（Hero 下方）</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.heroStats.map((stat, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-4">
              <label className="text-sm font-medium text-gray-700">
                数值
                <input
                  className="mt-1 w-full rounded border border-gray-200 p-2"
                  value={stat.value}
                  onChange={(event) => {
                    const newStats = [...content.heroStats]
                    newStats[index] = { ...stat, value: event.target.value }
                    setContent({ ...content, heroStats: newStats })
                  }}
                />
              </label>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  标签
                  <input
                    className="mt-1 w-full rounded border border-gray-200 p-2"
                    value={stat.label}
                    onChange={(event) => {
                      const newStats = [...content.heroStats]
                      newStats[index] = { ...stat, label: event.target.value }
                      setContent({ ...content, heroStats: newStats })
                    }}
                  />
                </label>
                <div className="mt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const next = content.heroStats.filter((_, i) => i !== index)
                      setContent({ ...content, heroStats: next })
                    }}
                  >
                    删除
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setContent({
                ...content,
                heroStats: [...content.heroStats, { label: "新增指标", value: "0" }],
              })
            }
          >
            新增指标
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>产品应用卡片</CardTitle>
          <p className="text-sm text-gray-500">图标字段可填 Wind、Droplets、Leaf、Zap。</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {content.productApplications.map((app, index) => (
            <div key={index} className="border border-dashed border-gray-200 rounded-lg p-4 space-y-2">
              <div className="grid md:grid-cols-2 gap-4">
                <label className="text-sm font-medium text-gray-700">
                  名称
                  <input
                    className="mt-1 w-full rounded border border-gray-200 p-2"
                    value={app.name}
                    onChange={(event) => {
                      const next = [...content.productApplications]
                      next[index] = { ...app, name: event.target.value }
                      setContent({ ...content, productApplications: next })
                    }}
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  图标
                  <input
                    className="mt-1 w-full rounded border border-gray-200 p-2"
                    value={app.icon}
                    onChange={(event) => {
                      const next = [...content.productApplications]
                      next[index] = { ...app, icon: event.target.value }
                      setContent({ ...content, productApplications: next })
                    }}
                  />
                </label>
              </div>
              <label className="text-sm font-medium text-gray-700">
                描述
                <textarea
                  className="mt-1 w-full rounded border border-gray-200 p-2 h-20"
                  value={app.description}
                  onChange={(event) => {
                    const next = [...content.productApplications]
                    next[index] = { ...app, description: event.target.value }
                    setContent({ ...content, productApplications: next })
                  }}
                />
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <label className="text-sm font-medium text-gray-700">
                  图片路径
                  <input
                    className="mt-1 w-full rounded border border-gray-200 p-2"
                    value={app.image}
                    onChange={(event) => {
                      const next = [...content.productApplications]
                      next[index] = { ...app, image: event.target.value }
                      setContent({ ...content, productApplications: next })
                    }}
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  渐变色类名
                  <input
                    className="mt-1 w-full rounded border border-gray-200 p-2"
                    value={app.color}
                    onChange={(event) => {
                      const next = [...content.productApplications]
                      next[index] = { ...app, color: event.target.value }
                      setContent({ ...content, productApplications: next })
                    }}
                  />
                </label>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-gray-400">卡片 #{index + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const next = content.productApplications.filter((_, i) => i !== index)
                    setContent({ ...content, productApplications: next })
                  }}
                >
                  删除
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setContent({
                ...content,
                productApplications: [
                  ...content.productApplications,
                  {
                    name: "新应用",
                    icon: "Wind",
                    description: "",
                    image: "/images/products/spec-01.webp",
                    color: "from-primary-500 to-primary-600",
                  },
                ],
              })
            }
          >
            新增应用卡片
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>质量标准轮播</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.qualityStandards.map((standard, index) => (
            <div key={index} className="grid md:grid-cols-3 gap-4">
              <label className="text-sm font-medium text-gray-700">
                标题
                <input
                  className="mt-1 w-full rounded border border-gray-200 p-2"
                  value={standard.title}
                  onChange={(event) => {
                    const next = [...content.qualityStandards]
                    next[index] = { ...standard, title: event.target.value }
                    setContent({ ...content, qualityStandards: next })
                  }}
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                简介
                <input
                  className="mt-1 w-full rounded border border-gray-200 p-2"
                  value={standard.description}
                  onChange={(event) => {
                    const next = [...content.qualityStandards]
                    next[index] = { ...standard, description: event.target.value }
                    setContent({ ...content, qualityStandards: next })
                  }}
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                图片路径
                <input
                  className="mt-1 w-full rounded border border-gray-200 p-2"
                  value={standard.image}
                  onChange={(event) => {
                    const next = [...content.qualityStandards]
                    next[index] = { ...standard, image: event.target.value }
                    setContent({ ...content, qualityStandards: next })
                  }}
                />
              </label>
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const next = content.qualityStandards.filter((_, i) => i !== index)
                    setContent({ ...content, qualityStandards: next })
                  }}
                >
                  删除
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setContent({
                ...content,
                qualityStandards: [
                  ...content.qualityStandards,
                  { title: "新标准", description: "", image: "/images/quality/standard-01.webp" },
                ],
              })
            }
          >
            新增质量卡片
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>企业实力模块</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-4">
            <h3 className="font-semibold text-gray-800">实力概览</h3>
            {content.companyStrength.strengths.map((strength, index) => (
              <div key={index} className="space-y-2 border border-dashed border-gray-200 rounded-lg p-4">
                <div className="grid md:grid-cols-4 gap-4">
                  {(["icon", "title", "value", "description"] as const).map((field) => (
                    <label key={field} className="text-sm font-medium text-gray-700">
                      {field === "icon" ? "图标" : field === "title" ? "标题" : field === "value" ? "数值" : "描述"}
                      <input
                        className="mt-1 w-full rounded border border-gray-200 p-2"
                      value={strength[field]}
                      onChange={(event) => {
                        const next = [...content.companyStrength.strengths]
                        next[index] = { ...strength, [field]: event.target.value }
                        setContent({
                          ...content,
                          companyStrength: { ...content.companyStrength, strengths: next },
                        })
                      }}
                      />
                    </label>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const next = content.companyStrength.strengths.filter((_, i) => i !== index)
                      setContent({
                        ...content,
                        companyStrength: { ...content.companyStrength, strengths: next },
                      })
                    }}
                  >
                    删除
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const next = [
                  ...content.companyStrength.strengths,
                  { icon: "Building2", title: "新增实力", value: "0", description: "" },
                ]
                setContent({ ...content, companyStrength: { ...content.companyStrength, strengths: next } })
              }}
            >
              新增实力项
            </Button>
          </section>

          <section className="space-y-4">
            <h3 className="font-semibold text-gray-800">认证列表</h3>
            {content.companyStrength.certifications.map((cert, index) => (
              <div key={index} className="space-y-2 border border-dashed border-gray-200 rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="text-sm font-medium text-gray-700">
                    名称
                    <input
                    className="mt-1 w-full rounded border border-gray-200 p-2"
                    value={cert.name}
                    onChange={(event) => {
                      const next = [...content.companyStrength.certifications]
                      next[index] = { ...cert, name: event.target.value }
                      setContent({
                        ...content,
                        companyStrength: { ...content.companyStrength, certifications: next },
                      })
                    }}
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  编号/说明
                  <input
                    className="mt-1 w-full rounded border border-gray-200 p-2"
                    value={cert.code}
                    onChange={(event) => {
                      const next = [...content.companyStrength.certifications]
                      next[index] = { ...cert, code: event.target.value }
                      setContent({
                        ...content,
                        companyStrength: { ...content.companyStrength, certifications: next },
                      })
                    }}
                  />
                </label>
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const next = content.companyStrength.certifications.filter((_, i) => i !== index)
                      setContent({
                        ...content,
                        companyStrength: { ...content.companyStrength, certifications: next },
                      })
                    }}
                  >
                    删除
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const next = [...content.companyStrength.certifications, { name: "新增认证", code: "" }]
                setContent({ ...content, companyStrength: { ...content.companyStrength, certifications: next } })
              }}
            >
              新增认证
            </Button>
          </section>

          <section className="space-y-4">
            <h3 className="font-semibold text-gray-800">工厂图片（路径需存在于 public/images）</h3>
            {content.companyStrength.factoryImages.map((image, index) => (
              <div key={index} className="space-y-2 border border-dashed border-gray-200 rounded-lg p-4">
                <div className="grid md:grid-cols-3 gap-4">
                  {(["src", "title", "description"] as const).map((field) => (
                    <label key={field} className="text-sm font-medium text-gray-700">
                      {field === "src" ? "图片路径" : field === "title" ? "标题" : "描述"}
                    <input
                      className="mt-1 w-full rounded border border-gray-200 p-2"
                      value={image[field]}
                      onChange={(event) => {
                        const next = [...content.companyStrength.factoryImages]
                        next[index] = { ...image, [field]: event.target.value }
                        setContent({
                          ...content,
                          companyStrength: { ...content.companyStrength, factoryImages: next },
                        })
                      }}
                      />
                    </label>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const next = content.companyStrength.factoryImages.filter((_, i) => i !== index)
                      setContent({
                        ...content,
                        companyStrength: { ...content.companyStrength, factoryImages: next },
                      })
                    }}
                  >
                    删除
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const next = [
                  ...content.companyStrength.factoryImages,
                  { src: "/images/factory/winding-machine.webp", title: "新增设备", description: "" },
                ]
                setContent({ ...content, companyStrength: { ...content.companyStrength, factoryImages: next } })
              }}
            >
              新增工厂图片
            </Button>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
