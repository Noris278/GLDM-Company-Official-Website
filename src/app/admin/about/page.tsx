"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SiteContent } from "@/lib/content"

export default function AboutContentAdminPage() {
  const router = useRouter()
  const [content, setContent] = useState<SiteContent | null>(null)
  const [status, setStatus] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data: SiteContent) => setContent(data))
      .catch(() => setStatus("加载内容失败，请稍后再试。"))
  }, [])

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

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">内容加载中...</p>
      </div>
    )
  }

  const about = content.about
  const companyIntro = about.companyIntro
  const history = about.history
  const workshop = about.workshop
  const equipment = about.equipment
  const culture = about.culture

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <header className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">关于我们内容管理</h1>
          <p className="text-sm text-gray-500">在此维护公司介绍、发展历程等页面文案。</p>
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
        <Link href="/admin/content" className="hover:text-primary-600">
          首页内容
        </Link>
        <span>·</span>
        <span className="text-primary-600 font-semibold">关于我们内容</span>
      </div>

      {status && <div className="text-sm text-primary-600">{status}</div>}

      <Card>
        <CardHeader>
          <CardTitle>页面英雄区域</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            徽章文字
            <input
              className="mt-1 w-full rounded border border-gray-200 p-2"
              value={about.hero.badge}
              onChange={(event) =>
                setContent({
                  ...content,
                  about: {
                    ...about,
                    hero: { ...about.hero, badge: event.target.value },
                  },
                })
              }
            />
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            <label className="text-sm font-medium text-gray-700">
              标题
              <input
                className="mt-1 w-full rounded border border-gray-200 p-2"
                value={about.hero.title}
                onChange={(event) =>
                  setContent({
                    ...content,
                    about: {
                      ...about,
                      hero: { ...about.hero, title: event.target.value },
                    },
                  })
                }
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              高亮文字
              <input
                className="mt-1 w-full rounded border border-gray-200 p-2"
                value={about.hero.highlight}
                onChange={(event) =>
                  setContent({
                    ...content,
                    about: {
                      ...about,
                      hero: { ...about.hero, highlight: event.target.value },
                    },
                  })
                }
              />
            </label>
          </div>
          <label className="text-sm font-medium text-gray-700">
            描述
            <textarea
              className="mt-1 w-full rounded border border-gray-200 p-2 h-24"
              value={about.hero.description}
              onChange={(event) =>
                setContent({
                  ...content,
                  about: {
                    ...about,
                    hero: { ...about.hero, description: event.target.value },
                  },
                })
              }
            />
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>公司介绍</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            标题
            <input
              className="mt-1 w-full rounded border border-gray-200 p-2"
              value={about.companyIntro.title}
              onChange={(event) =>
                setContent({
                  ...content,
                  about: {
                    ...about,
                    companyIntro: { ...about.companyIntro, title: event.target.value },
                  },
                })
              }
            />
          </label>

          <div className="space-y-4">
            <div className="text-sm font-medium text-gray-700">段落内容</div>
            {about.companyIntro.paragraphs.map((paragraph, index) => (
              <div key={index} className="space-y-2">
                <textarea
                  className="w-full rounded border border-gray-200 p-2 h-24"
                  value={paragraph}
                  onChange={(event) => {
                    const next = [...about.companyIntro.paragraphs]
                    next[index] = event.target.value
                    setContent({
                      ...content,
                      about: {
                        ...about,
                        companyIntro: { ...about.companyIntro, paragraphs: next },
                      },
                    })
                  }}
                />
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const next = about.companyIntro.paragraphs.filter((_, i) => i !== index)
                      setContent({
                        ...content,
                        about: {
                          ...about,
                          companyIntro: { ...about.companyIntro, paragraphs: next },
                        },
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
              onClick={() =>
                setContent({
                  ...content,
                  about: {
                    ...about,
                    companyIntro: {
                      ...about.companyIntro,
                      paragraphs: [...about.companyIntro.paragraphs, ""],
                    },
                  },
                })
              }
            >
              新增段落
            </Button>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-gray-700">核心数据</div>
            {about.companyIntro.stats.map((stat, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-4">
                <label className="text-sm font-medium text-gray-700">
                  数值
                  <input
                    className="mt-1 w-full rounded border border-gray-200 p-2"
                    value={stat.value}
                    onChange={(event) => {
                      const next = [...about.companyIntro.stats]
                      next[index] = { ...stat, value: event.target.value }
                      setContent({
                        ...content,
                        about: {
                          ...about,
                          companyIntro: { ...about.companyIntro, stats: next },
                        },
                      })
                    }}
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  描述
                  <input
                    className="mt-1 w-full rounded border border-gray-200 p-2"
                    value={stat.label}
                    onChange={(event) => {
                      const next = [...about.companyIntro.stats]
                      next[index] = { ...stat, label: event.target.value }
                      setContent({
                        ...content,
                        about: {
                          ...about,
                          companyIntro: { ...about.companyIntro, stats: next },
                        },
                      })
                    }}
                  />
                </label>
                <div className="md:col-span-2 flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const next = about.companyIntro.stats.filter((_, i) => i !== index)
                      setContent({
                        ...content,
                        about: {
                          ...about,
                          companyIntro: { ...about.companyIntro, stats: next },
                        },
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
              onClick={() =>
                setContent({
                  ...content,
                  about: {
                    ...about,
                    companyIntro: {
                      ...about.companyIntro,
                      stats: [...about.companyIntro.stats, { value: "0", label: "描述" }],
                    },
                  },
                })
              }
            >
              新增统计
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <label className="text-sm font-medium text-gray-700">
              配图地址
              <input
                className="mt-1 w-full rounded border border-gray-200 p-2"
                value={companyIntro.image.src}
                onChange={(event) =>
                  setContent({
                    ...content,
                    about: {
                      ...about,
                      companyIntro: {
                        ...about.companyIntro,
                        image: { ...about.companyIntro.image, src: event.target.value },
                      },
                    },
                  })
                }
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              配图标题
              <input
                className="mt-1 w-full rounded border border-gray-200 p-2"
                value={companyIntro.image.title}
                onChange={(event) =>
                  setContent({
                    ...content,
                    about: {
                      ...about,
                      companyIntro: {
                        ...about.companyIntro,
                        image: { ...about.companyIntro.image, title: event.target.value },
                      },
                    },
                  })
                }
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              配图副标题
              <input
                className="mt-1 w-full rounded border border-gray-200 p-2"
                value={companyIntro.image.subtitle}
                onChange={(event) =>
                  setContent({
                    ...content,
                    about: {
                      ...about,
                      companyIntro: {
                        ...about.companyIntro,
                        image: { ...about.companyIntro.image, subtitle: event.target.value },
                      },
                    },
                  })
                }
              />
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>发展历程</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            标题
            <input
              className="mt-1 w-full rounded border border-gray-200 p-2"
              value={history.title}
              onChange={(event) =>
                setContent({
                  ...content,
                  about: {
                    ...about,
                    history: { ...history, title: event.target.value },
                  },
                })
              }
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            描述
            <textarea
              className="mt-1 w-full rounded border border-gray-200 p-2 h-20"
              value={history.description}
              onChange={(event) =>
                setContent({
                  ...content,
                  about: { ...about, history: { ...history, description: event.target.value } },
                })
              }
            />
          </label>
          {history.timeline.map((item, index) => (
            <div key={index} className="space-y-3 border border-dashed border-gray-200 rounded-lg p-4">
              <div className="grid md:grid-cols-3 gap-4">
                <label className="text-sm font-medium text-gray-700">
                  年份
                  <input
                    className="mt-1 w-full rounded border border-gray-200 p-2"
                    value={item.year}
                    onChange={(event) => {
                      const next = [...history.timeline]
                      next[index] = { ...item, year: event.target.value }
                      setContent({
                        ...content,
                        about: { ...about, history: { ...history, timeline: next } },
                      })
                    }}
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  标题
                  <input
                    className="mt-1 w-full rounded border border-gray-200 p-2"
                    value={item.title}
                    onChange={(event) => {
                      const next = [...history.timeline]
                      next[index] = { ...item, title: event.target.value }
                      setContent({
                        ...content,
                        about: { ...about, history: { ...history, timeline: next } },
                      })
                    }}
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  描述
                  <input
                    className="mt-1 w-full rounded border border-gray-200 p-2"
                    value={item.description}
                    onChange={(event) => {
                      const next = [...history.timeline]
                      next[index] = { ...item, description: event.target.value }
                      setContent({
                        ...content,
                        about: { ...about, history: { ...history, timeline: next } },
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
                    const next = history.timeline.filter((_, i) => i !== index)
                    setContent({
                      ...content,
                      about: { ...about, history: { ...history, timeline: next } },
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
            onClick={() =>
              setContent({
                ...content,
                about: {
                  ...about,
                  history: {
                    ...history,
                    timeline: [...history.timeline, { year: "年份", title: "节点标题", description: "" }],
                  },
                },
              })
            }
          >
            新增节点
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>厂房车间</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            标题
            <input
              className="mt-1 w-full rounded border border-gray-200 p-2"
              value={workshop.title}
              onChange={(event) =>
                setContent({
                  ...content,
                  about: { ...about, workshop: { ...workshop, title: event.target.value } },
                })
              }
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            描述
            <textarea
              className="mt-1 w-full rounded border border-gray-200 p-2 h-20"
              value={workshop.description}
              onChange={(event) =>
                setContent({
                  ...content,
                  about: { ...about, workshop: { ...workshop, description: event.target.value } },
                })
              }
            />
          </label>

          {workshop.gallery.map((item, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-4 border border-dashed border-gray-200 rounded-lg p-4">
              <label className="text-sm font-medium text-gray-700">
                名称
                <input
                  className="mt-1 w-full rounded border border-gray-200 p-2"
                  value={item.name}
                  onChange={(event) => {
                    const next = [...workshop.gallery]
                    next[index] = { ...item, name: event.target.value }
                    setContent({
                      ...content,
                      about: { ...about, workshop: { ...workshop, gallery: next } },
                    })
                  }}
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                图片
                <input
                  className="mt-1 w-full rounded border border-gray-200 p-2"
                  value={item.image}
                  onChange={(event) => {
                    const next = [...workshop.gallery]
                    next[index] = { ...item, image: event.target.value }
                    setContent({
                      ...content,
                      about: { ...about, workshop: { ...workshop, gallery: next } },
                    })
                  }}
                />
              </label>
              <div className="md:col-span-2 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const next = workshop.gallery.filter((_, i) => i !== index)
                    setContent({
                      ...content,
                      about: { ...about, workshop: { ...workshop, gallery: next } },
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
            onClick={() =>
              setContent({
                ...content,
                about: {
                  ...about,
                  workshop: {
                    ...workshop,
                    gallery: [...workshop.gallery, { name: "新设备", image: "/images/factory/example.webp" }],
                  },
                },
              })
            }
          >
            新增图片
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>先进设备</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            标题
            <input
              className="mt-1 w-full rounded border border-gray-200 p-2"
              value={equipment.title}
              onChange={(event) =>
                setContent({
                  ...content,
                  about: { ...about, equipment: { ...equipment, title: event.target.value } },
                })
              }
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            描述
            <textarea
              className="mt-1 w-full rounded border border-gray-200 p-2 h-20"
              value={equipment.description}
              onChange={(event) =>
                setContent({
                  ...content,
                  about: { ...about, equipment: { ...equipment, description: event.target.value } },
                })
              }
            />
          </label>
          {equipment.items.map((item, index) => (
            <div key={index} className="grid md:grid-cols-3 gap-4 border border-dashed border-gray-200 rounded-lg p-4">
              <label className="text-sm font-medium text-gray-700">
                名称
                <input
                  className="mt-1 w-full rounded border border-gray-200 p-2"
                  value={item.name}
                  onChange={(event) => {
                    const next = [...equipment.items]
                    next[index] = { ...item, name: event.target.value }
                    setContent({
                      ...content,
                      about: { ...about, equipment: { ...equipment, items: next } },
                    })
                  }}
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                描述
                <input
                  className="mt-1 w-full rounded border border-gray-200 p-2"
                  value={item.description}
                  onChange={(event) => {
                    const next = [...equipment.items]
                    next[index] = { ...item, description: event.target.value }
                    setContent({
                      ...content,
                      about: { ...about, equipment: { ...equipment, items: next } },
                    })
                  }}
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                图标（Lucide 名称）
                <input
                  className="mt-1 w-full rounded border border-gray-200 p-2"
                  value={item.icon}
                  onChange={(event) => {
                    const next = [...equipment.items]
                    next[index] = { ...item, icon: event.target.value }
                    setContent({
                      ...content,
                      about: { ...about, equipment: { ...equipment, items: next } },
                    })
                  }}
                />
              </label>
              <div className="md:col-span-3 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const next = equipment.items.filter((_, i) => i !== index)
                    setContent({
                      ...content,
                      about: { ...about, equipment: { ...equipment, items: next } },
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
            onClick={() =>
              setContent({
                ...content,
                about: {
                  ...about,
                  equipment: {
                    ...equipment,
                    items: [...equipment.items, { name: "新设备", description: "", icon: "Cog" }],
                  },
                },
              })
            }
          >
            新增设备
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>企业文化</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            标题
            <input
              className="mt-1 w-full rounded border border-gray-200 p-2"
              value={culture.title}
              onChange={(event) =>
                setContent({
                  ...content,
                  about: { ...about, culture: { ...culture, title: event.target.value } },
                })
              }
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            描述
            <textarea
              className="mt-1 w-full rounded border border-gray-200 p-2 h-20"
              value={culture.ctaText}
              onChange={(event) =>
                setContent({
                  ...content,
                  about: { ...about, culture: { ...culture, ctaText: event.target.value } },
                })
              }
            />
          </label>
          {culture.cards.map((card, index) => (
            <div key={index} className="grid md:grid-cols-3 gap-4 border border-dashed border-gray-200 rounded-lg p-4">
              <label className="text-sm font-medium text-gray-700">
                标题
                <input
                  className="mt-1 w-full rounded border border-gray-200 p-2"
                  value={card.title}
                  onChange={(event) => {
                    const next = [...culture.cards]
                    next[index] = { ...card, title: event.target.value }
                    setContent({
                      ...content,
                      about: { ...about, culture: { ...culture, cards: next } },
                    })
                  }}
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                描述
                <input
                  className="mt-1 w-full rounded border border-gray-200 p-2"
                  value={card.description}
                  onChange={(event) => {
                    const next = [...culture.cards]
                    next[index] = { ...card, description: event.target.value }
                    setContent({
                      ...content,
                      about: { ...about, culture: { ...culture, cards: next } },
                    })
                  }}
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                图标（Lucide 名称）
                <input
                  className="mt-1 w-full rounded border border-gray-200 p-2"
                  value={card.icon}
                  onChange={(event) => {
                    const next = [...culture.cards]
                    next[index] = { ...card, icon: event.target.value }
                    setContent({
                      ...content,
                      about: { ...about, culture: { ...culture, cards: next } },
                    })
                  }}
                />
              </label>
              <div className="md:col-span-3 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const next = culture.cards.filter((_, i) => i !== index)
                    setContent({
                      ...content,
                      about: { ...about, culture: { ...culture, cards: next } },
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
            onClick={() =>
              setContent({
                ...content,
                about: {
                  ...about,
                  culture: { ...culture, cards: [...culture.cards, { title: "新项目", description: "", icon: "Award" }] },
                },
              })
            }
          >
            新增卡片
          </Button>

          <div className="grid md:grid-cols-2 gap-4">
            <label className="text-sm font-medium text-gray-700">
              按钮文字
              <input
                className="mt-1 w-full rounded border border-gray-200 p-2"
                value={culture.buttonText}
                onChange={(event) =>
                  setContent({
                    ...content,
                    about: { ...about, culture: { ...culture, buttonText: event.target.value } },
                  })
                }
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              按钮链接
              <input
                className="mt-1 w-full rounded border border-gray-200 p-2"
                value={culture.buttonLink}
                onChange={(event) =>
                  setContent({
                    ...content,
                    about: { ...about, culture: { ...culture, buttonLink: event.target.value } },
                  })
                }
              />
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
