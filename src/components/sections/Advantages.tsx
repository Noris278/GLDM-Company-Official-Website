"use client"

import { motion } from "framer-motion"
import { Shield, Award, Users, Zap, Factory, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useFadeInMotion } from "@/hooks/usePrefersReducedMotion"

const advantages = [
  {
    icon: Shield,
    title: "品质保证",
    description: "严格的质量控制体系，确保每一台产品都符合国际标准",
    color: "text-primary-500"
  },
  {
    icon: Award,
    title: "权威认证",
    description: "通过UL、TUV、CE、CB、CQC、ISO9001等多项国际认证",
    color: "text-primary-600"
  },
  {
    icon: Users,
    title: "专业团队",
    description: "80+专业技术人员，10年行业经验积累",
    color: "text-primary-500"
  },
  {
    icon: Zap,
    title: "技术创新",
    description: "持续的技术研发投入，引领负离子技术发展",
    color: "text-primary-600"
  },
  {
    icon: Factory,
    title: "规模生产",
    description: "3200㎡现代化工厂，年产能1500万台",
    color: "text-primary-500"
  },
  {
    icon: Globe,
    title: "专业服务",
    description: "为国内众多知名企业、家电品牌提供专业的负离子解决方案",
    color: "text-primary-600"
  }
]

export default function Advantages() {
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
          {advantages.map((advantage, index) => (
            <motion.div key={index} {...fadeIn({ delay: index * 0.1 })}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 group border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    {/* 图标 */}
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                      <advantage.icon className={`w-8 h-8 ${advantage.color}`} />
                    </div>
                    
                    {/* 标题 */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {advantage.title}
                    </h3>
                    
                    {/* 描述 */}
                    <p className="text-gray-600 leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 数据统计 */}
        <motion.div
          {...fadeIn({ delay: 0.3 })}
          className="mt-20 bg-white rounded-3xl shadow-xl p-8 lg:p-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">10+</div>
              <div className="text-gray-600 font-medium">年行业经验</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">1500万</div>
              <div className="text-gray-600 font-medium">年产能（台）</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">3200</div>
              <div className="text-gray-600 font-medium">工厂面积（㎡）</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">80+</div>
              <div className="text-gray-600 font-medium">专业员工</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
