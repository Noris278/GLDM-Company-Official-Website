"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useFadeInMotion } from "@/hooks/usePrefersReducedMotion"
import type { SiteContent } from "@/lib/content"

type AdvantagesProps = {
  items: SiteContent["advantages"]
  stats: SiteContent["advantagesStats"]
}

export default function Advantages({ items, stats }: AdvantagesProps) {
  const fadeIn = useFadeInMotion()
  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4">
        {/* 标题区域 */}
        <motion.div {...fadeIn()} className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
            核心优势
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            为什么选择
            <span className="text-primary-600">歌林蒂姆</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            十年专注负离子发生器研发制造，以卓越品质和专业服务赢得国内众多知名企业、家电品牌信赖
          </p>
        </motion.div>

        {/* 优势网格 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((advantage, index) => (
            <motion.div key={index} {...fadeIn({ delay: index * 0.1 })}>
              <div className="group relative h-64 overflow-hidden rounded-2xl shadow-lg transition-all duration-700 hover:shadow-2xl">
                {advantage.image ? (
                  <Image
                    src={advantage.image}
                    alt={advantage.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                    {advantage.title}
                  </div>
                )}
                <div
                  className="pointer-events-none absolute inset-0 z-10 opacity-95 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.0) 45%, rgba(0,0,0,0) 100%)",
                  }}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-4 pb-4 pt-12 text-white text-center transition-transform duration-500 group-hover:-translate-y-3">
                  <p className="text-sm text-white/80 mb-2">{advantage.description}</p>
                  <h3 className="text-2xl font-bold">{advantage.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 数据统计 */}
        {stats?.length > 0 && (
          <motion.div
            {...fadeIn({ delay: 0.3 })}
            className="mt-20 bg-white rounded-3xl shadow-xl p-8 lg:p-12"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={`${stat.label}-${index}`} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
