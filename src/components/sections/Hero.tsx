"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SiteContent } from "@/lib/content"

type HeroProps = {
  data: SiteContent["hero"]
  stats: SiteContent["heroStats"]
}

export default function Hero({ data, stats }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const hasGallery = data.gallery && data.gallery.length > 0

  useEffect(() => {
    if (!hasGallery) return
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % data.gallery.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [data.gallery.length, hasGallery])

  const goToPrevious = () => {
    if (!hasGallery) return
    setCurrentImageIndex((prev) => (prev - 1 + data.gallery.length) % data.gallery.length)
  }

  const goToNext = () => {
    if (!hasGallery) return
    setCurrentImageIndex((prev) => (prev + 1) % data.gallery.length)
  }

  const currentImage = hasGallery ? data.gallery[currentImageIndex] : null

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-16 lg:py-24">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100"></div>
      
      {/* 装饰性几何图形 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
              {data.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {data.title.prefix}
              <span className="text-primary-600 relative">
                {data.title.highlight}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary-200" viewBox="0 0 100 12" fill="currentColor">
                  <path d="M0 8c30-4 70-4 100 0v4H0z"/>
                </svg>
              </span>
              <br />
              {data.title.suffix}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed space-y-4"
            >
              {data.descriptions.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </motion.div>

            {/* 特色标签 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {data.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* 行动按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="group" asChild>
                <Link href="/contact">
                  立即咨询
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            {/* 数据展示 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary-600">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* 右侧图片/动画区域 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-100 to-primary-200">
              {currentImage ? (
                <>
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt || "产品展示"}
                    fill
                    sizes="(max-width: 1024px) 100vw, (max-width: 1440px) 45vw, 720px"
                    priority={currentImageIndex === 0}
                    loading={currentImageIndex === 0 ? "eager" : "lazy"}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div>
                      <p className="text-white text-lg font-semibold">{currentImage.alt || "产品展示"}</p>
                      <p className="text-white/70 text-sm">负离子解决方案</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={goToPrevious}
                        className="w-10 h-10 rounded-full bg-white/90 text-gray-700 hover:bg-white flex items-center justify-center transition"
                        aria-label="上一张"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={goToNext}
                        className="w-10 h-10 rounded-full bg-white/90 text-gray-700 hover:bg-white flex items-center justify-center transition"
                        aria-label="下一张"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {data.gallery.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? "bg-white scale-110" : "bg-white/50"
                        }`}
                        aria-label={`切换到第${index + 1}张`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-primary-700">
                  <div className="text-center space-y-2">
                    <p className="text-lg font-medium">负离子发生器</p>
                    <p className="text-sm opacity-75">产品展示区域</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 滚动指示器 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  )
}
