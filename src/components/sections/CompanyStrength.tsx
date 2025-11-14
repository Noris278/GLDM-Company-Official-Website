"use client"

import { motion } from "framer-motion"
import { Building2, Users, Cog, Award, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import Image from "next/image"
import { usePrefersReducedMotion, useFadeInMotion } from "@/hooks/usePrefersReducedMotion"
import type { SiteContent } from "@/lib/content"

const iconMap = {
  Building2,
  Users,
  Cog,
  Award,
}

type CompanyStrengthProps = {
  data: SiteContent["companyStrength"]
}

export default function CompanyStrength({ data }: CompanyStrengthProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const prefersReducedMotion = usePrefersReducedMotion()
  const fadeIn = useFadeInMotion()
  const hasFactoryImages = data.factoryImages.length > 0
  const currentImage = hasFactoryImages ? data.factoryImages[currentImageIndex] : null
  const sliderButtonState = hasFactoryImages ? "" : "opacity-40 cursor-not-allowed pointer-events-none"

  // 自动轮播
  useEffect(() => {
    if (prefersReducedMotion || !hasFactoryImages) {
      return
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % data.factoryImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [prefersReducedMotion, data.factoryImages.length, hasFactoryImages])

  const nextImage = () => {
    if (!hasFactoryImages) return
    setCurrentImageIndex((prev) => (prev + 1) % data.factoryImages.length)
  }

  const prevImage = () => {
    if (!hasFactoryImages) return
    setCurrentImageIndex((prev) => (prev - 1 + data.factoryImages.length) % data.factoryImages.length)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4">
        {/* 标题区域 */}
        <motion.div {...fadeIn()} className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
            企业实力
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            实力铸就
            <span className="text-primary-600">品质保证</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            拥有现代化的生产基地、专业的技术团队和完善的质量管理体系
          </p>
        </motion.div>

        {/* 实力数据展示 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {data.strengths.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Building2
            return (
              <motion.div key={index} {...fadeIn({ delay: index * 0.1 })}>
                <Card className="text-center h-full hover:shadow-xl transition-all duration-300 group bg-white/80 backdrop-blur-sm border-0">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                      {item.value}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* 资质认证展示 */}
        <motion.div
          {...fadeIn({ delay: 0.3 })}
          className="bg-white rounded-3xl shadow-xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">权威认证</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              通过多项国际权威认证，产品质量和安全性得到国内外客户认可
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {data.certifications.map((cert, index) => (
              <motion.div
                key={index}
                {...fadeIn({ delay: index * 0.1 })}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors duration-300">
                  <Award className="w-10 h-10 text-primary-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{cert.name}</h4>
                <p className="text-sm text-gray-500">{cert.code}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 生产设备展示 */}
        <motion.div
          {...fadeIn({ delay: 0.4 })}
          className="mt-16 grid lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              先进的生产设备
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              拥有完整的自动化生产线，从绕线、插件到组装测试，每个环节都采用先进设备，确保产品质量和生产效率。
            </p>

            {/* 当前设备信息 */}
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-100"
            >
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {currentImage?.title}
              </h4>
              <p className="text-gray-600">
                {currentImage?.description}
              </p>
            </motion.div>

            {/* 设备统计 */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">8+</div>
                <div className="text-sm text-gray-600">主要设备</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">3200㎡</div>
                <div className="text-sm text-gray-600">生产车间</div>
              </div>
            </div>
          </div>

          {/* 图片轮播区域 */}
          <div className="relative">
            <div className="relative w-full h-80 bg-white rounded-3xl overflow-hidden shadow-xl">
              {/* 主图片 */}
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
                className="absolute inset-0"
              >
                {currentImage && (
                  <Image
                    src={currentImage.src}
                    alt={currentImage.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </motion.div>

              {/* 控制按钮 */}
              <button
                onClick={prevImage}
                disabled={!hasFactoryImages}
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg z-10 ${sliderButtonState}`}
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>

              <button
                onClick={nextImage}
                disabled={!hasFactoryImages}
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg z-10 ${sliderButtonState}`}
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>

              {/* 指示器 */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {data.factoryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-white w-6'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>

              {/* 设备名称标签 */}
              <div className="absolute bottom-4 left-4 right-16 z-10">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.2 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2"
                >
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {currentImage?.title ?? "暂无设备信息"}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
