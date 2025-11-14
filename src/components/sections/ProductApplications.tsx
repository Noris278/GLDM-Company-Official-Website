"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Wind, Droplets, Leaf, Zap, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import type { SiteContent } from "@/lib/content"

const iconMap = {
  Wind,
  Droplets,
  Leaf,
  Zap,
}

type ProductApplicationsProps = {
  applications: SiteContent["productApplications"]
}

export default function ProductApplications({ applications }: ProductApplicationsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const prefersReducedMotion = usePrefersReducedMotion()
  const totalSlides = applications.length
  const hasSlides = totalSlides > 0

  // 自动播放
  useEffect(() => {
    if (prefersReducedMotion || !hasSlides) {
      return
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 3000)
    return () => clearInterval(interval)
  }, [prefersReducedMotion, hasSlides, totalSlides])

  const nextSlide = () => {
    if (!hasSlides) return
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    if (!hasSlides) return
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    if (!hasSlides) return
    setCurrentIndex(index)
  }

  // 计算每个卡片的位置和样式
  const getCardStyle = (index: number) => {
    const diff = index - currentIndex
    const absIndex = Math.abs(diff)

    if (absIndex === 0) {
      // 中心卡片
      return {
        scale: 1,
        x: 0,
        rotate: 0,
        zIndex: 50,
        opacity: 1
      }
    } else if (absIndex === 1) {
      // 第一层
      return {
        scale: 0.85,
        x: diff > 0 ? 120 : -120,
        rotate: diff > 0 ? 15 : -15,
        zIndex: 40,
        opacity: 0.8
      }
    } else if (absIndex === 2) {
      // 第二层
      return {
        scale: 0.7,
        x: diff > 0 ? 200 : -200,
        rotate: diff > 0 ? 25 : -25,
        zIndex: 30,
        opacity: 0.6
      }
    } else {
      // 后层
      return {
        scale: 0.5,
        x: diff > 0 ? 300 : -300,
        rotate: diff > 0 ? 35 : -35,
        zIndex: 20,
        opacity: 0.4
      }
    }
  }

  if (!hasSlides) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="container mx-auto px-4 text-center text-gray-500">
          暂无产品应用数据，请在后台维护内容。
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
            产品应用
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            广泛的
            <span className="text-primary-600">应用领域</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            我们的负离子发生器广泛应用于各类家电产品中，为用户带来更健康的生活体验
          </p>
        </motion.div>

        {/* 堆叠滚动容器 */}
        <div className="relative">
          {/* 卡片容器 */}
          <div className="relative h-[500px] flex items-center justify-center perspective-1000">
            {applications.map((app, index) => {
              const Icon = iconMap[app.icon as keyof typeof iconMap] ?? Wind
              const style = getCardStyle(index)

              return (
                <motion.div
                  key={app.name}
                  className="absolute cursor-pointer"
                  style={{ zIndex: style.zIndex }}
                  animate={{
                    scale: style.scale,
                    x: style.x,
                    rotate: style.rotate,
                    opacity: style.opacity
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.6,
                    ease: "easeInOut"
                  }}
                  onClick={() => goToSlide(index)}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          scale: style.scale * 1.05,
                          transition: { duration: 0.2 }
                        }
                  }
                >
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-80 h-96">
                    {/* 产品图片 */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={app.image}
                        alt={app.name}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${app.color} opacity-20`}></div>
                    </div>

                    {/* 内容区域 */}
                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${app.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{app.name}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-sm">{app.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* 左右箭头 */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-60 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-60 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* 指示器 */}
          <div className="flex justify-center gap-2 mt-8">
            {applications.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 应用统计 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-3xl shadow-xl p-8 lg:p-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">4+</div>
              <div className="text-gray-600 font-medium">主要应用领域</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">1500万</div>
              <div className="text-gray-600 font-medium">年产能（台）</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">100+</div>
              <div className="text-gray-600 font-medium">合作客户</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">99.9%</div>
              <div className="text-gray-600 font-medium">产品合格率</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
