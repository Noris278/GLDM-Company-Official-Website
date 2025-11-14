"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { usePrefersReducedMotion, useFadeInMotion } from "@/hooks/usePrefersReducedMotion"
import type { SiteContent } from "@/lib/content"

type QualityStandardsProps = {
  items: SiteContent["qualityStandards"]
}

export default function QualityStandards({ items }: QualityStandardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const prefersReducedMotion = usePrefersReducedMotion()
  const fadeIn = useFadeInMotion()
  const hasItems = items.length > 0

  // 自动切换
  useEffect(() => {
    if (prefersReducedMotion || !hasItems) {
      return
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [prefersReducedMotion, items.length, hasItems])

  const goToPrevious = () => {
    if (!hasItems) return
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    if (!hasItems) return
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex
    const absIndex = Math.abs(diff)

    if (absIndex === 0) {
      // 中心卡片
      return {
        scale: 1,
        zIndex: 50,
        x: 0,
        opacity: 1,
        rotateY: 0
      }
    } else if (absIndex === 1) {
      // 第一层
      return {
        scale: 0.85,
        zIndex: 40,
        x: diff > 0 ? 120 : -120,
        opacity: 0.8,
        rotateY: diff > 0 ? -15 : 15
      }
    } else if (absIndex === 2) {
      // 第二层
      return {
        scale: 0.7,
        zIndex: 30,
        x: diff > 0 ? 200 : -200,
        opacity: 0.6,
        rotateY: diff > 0 ? -25 : 25
      }
    } else {
      // 隐藏的卡片
      return {
        scale: 0.5,
        zIndex: 10,
        x: diff > 0 ? 300 : -300,
        opacity: 0.3,
        rotateY: diff > 0 ? -35 : 35
      }
    }
  }

  if (!hasItems) {
    return (
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 text-center text-gray-500">
          暂无质量标准内容，请在后台维护。
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div {...fadeIn()} className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
            检验标准
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            严格的
            <span className="text-primary-600">检验标准</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            建立完善的检验标准体系，确保每一个产品都符合最高质量要求
          </p>
        </motion.div>

        {/* 堆叠滚动展示 */}
        <div className="relative h-[500px] flex items-center justify-center mb-16">
          {/* 左侧控制按钮 */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 z-60 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-primary-600" />
          </button>

          {/* 右侧控制按钮 */}
          <button
            onClick={goToNext}
            className="absolute right-4 z-60 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-primary-600" />
          </button>

          {/* 卡片堆叠 */}
          <div className="relative w-full max-w-md h-full">
            {items.map((standard, index) => {
              const style = getCardStyle(index)

              return (
                <motion.div
                  key={`${standard.title}-${index}`}
                  className="absolute inset-0 cursor-pointer"
                  animate={style}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.6,
                    ease: "easeInOut"
                  }}
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    perspective: "1000px"
                  }}
                >
                  <Card className="w-full h-full overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
                    <div className="relative h-full">
                      <Image
                        src={standard.image}
                        alt={standard.title}
                        fill
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 60vw, 420px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-6 text-white">
                          <h3 className="text-lg font-bold mb-2">{standard.title}</h3>
                          <p className="text-sm opacity-90">{standard.description}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* 指示器 */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-60">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-600 scale-125'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 检验标准统计 */}
        <motion.div
          {...fadeIn({ delay: 0.3 })}
          className="mt-16 bg-white rounded-3xl shadow-xl p-8 lg:p-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">8+</div>
              <div className="text-gray-600 font-medium">检验标准文件</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">检验项目</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">产品检验覆盖率</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">24小时</div>
              <div className="text-gray-600 font-medium">检验报告时效</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
