"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Users, Target, Award, Factory, Cog, CheckCircle, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"
import { useFadeInMotion } from "@/hooks/usePrefersReducedMotion"

const companyHistory = [
  {
    year: "2013",
    title: "公司成立",
    description: "苏州歌林蒂姆电子科技有限公司正式成立，专注负离子发生器研发"
  },
  {
    year: "2015",
    title: "技术突破",
    description: "成功研发第一代小型化负离子发生器，获得多项技术专利"
  },
  {
    year: "2017",
    title: "规模扩张",
    description: "建成3200㎡现代化工厂，年产能达到500万台"
  },
  {
    year: "2019",
    title: "国际认证",
    description: "通过UL、TUV、CE等多项国际认证，产品远销海外市场"
  },
  {
    year: "2021",
    title: "产能提升",
    description: "完成生产线升级改造，年产能提升至1500万台"
  },
  {
    year: "2024",
    title: "持续创新",
    description: "持续技术创新，成为行业领先的负离子发生器制造商"
  }
]

const equipmentList = [
  {
    name: "全自动SMT贴片生产线",
    description: "高精度自动化贴片设备，确保产品质量稳定",
    icon: Cog
  },
  {
    name: "自动化组装测试设备",
    description: "全自动组装和测试流水线，提高生产效率",
    icon: Factory
  },
  {
    name: "精密检测仪器设备",
    description: "先进的检测设备，确保每个产品都符合标准",
    icon: CheckCircle
  },
  {
    name: "环境可靠性测试设备",
    description: "模拟各种环境条件，验证产品可靠性",
    icon: Award
  }
]

export default function AboutPage() {
  const fadeIn = useFadeInMotion()
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* 页面标题 */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
              关于我们
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              专业铸就
              <span className="text-primary-600">品质未来</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              苏州歌林蒂姆电子科技有限公司，成立于2013年，专注负离子发生器研发制造10年
            </p>
          </motion.div>
        </div>
      </section>

      {/* 公司介绍 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn({ axis: "x", distance: -30 })}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                关于歌林蒂姆
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  苏州歌林蒂姆电子科技有限公司成立于2013年，是一家专业从事负离子发生器研发、
                  生产和销售的高新技术企业。公司位于苏州市吴中区，拥有3200㎡现代化工厂和80多名专业员工。
                </p>
                <p>
                  经过10年的发展，公司已成为负离子发生器行业的领军企业，年产能达到1500万台，
                  产品广泛应用于吹风机、空调、空气净化器等家电产品中，为国内众多知名企业、家电品牌提供优质服务。
                </p>
                <p>
                  公司始终坚持&ldquo;质量第一、客户至上&rdquo;的经营理念，通过了ISO9001质量管理体系认证，
                  产品获得UL、TUV、CE、CB、CQC等多项国际权威认证。
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">10+</div>
                  <div className="text-gray-600">年行业经验</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">1500万</div>
                  <div className="text-gray-600">年产能（台）</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeIn({ axis: "x", distance: 30, delay: 0.2 })}
              className="relative"
            >
              <div className="w-full h-96 rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/company/building.webp"
                  alt="公司大楼"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <p className="text-lg font-medium">现代化工厂</p>
                    <p className="text-sm opacity-90">3200㎡标准厂房</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 发展历程 */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn()} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">发展历程</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              十年砥砺前行，见证企业成长足迹
            </p>
          </motion.div>

          <div className="relative">
            {/* 时间线 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200 hidden lg:block"></div>
            
            <div className="space-y-12">
              {companyHistory.map((item, index) => (
                <motion.div
                  key={index}
                  {...fadeIn({ delay: index * 0.1 })}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <Card className="shadow-lg border-0 bg-white">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-bold">{item.year}</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* 时间线节点 */}
                  <div className="hidden lg:block w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg relative z-10"></div>
                  
                  <div className="lg:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 厂房车间展示 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn()} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">厂房车间</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              现代化的生产车间和先进的生产设备
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "12轴全自动绕线机", image: "/images/factory/winding-machine.webp" },
              { name: "12轴全自动绕线机-初级", image: "/images/factory/winding-machine-primary.webp" },
              { name: "高速插件机", image: "/images/factory/insertion-machine.webp" },
              { name: "全自动端子压着机", image: "/images/factory/terminal-crimping-machine.webp" },
              { name: "环氧点胶机", image: "/images/factory/epoxy-dispensing-machine.webp" },
              { name: "点胶房", image: "/images/factory/dispensing-room.webp" },
              { name: "流水线", image: "/images/factory/assembly-line.webp" },
              { name: "产品老化区域", image: "/images/factory/aging-area.webp" }
            ].map((equipment, index) => (
              <motion.div key={index} {...fadeIn({ delay: index * 0.1 })}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48">
                    <Image
                      src={equipment.image}
                      alt={equipment.name}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 text-center">{equipment.name}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 生产设备概述 */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn()} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">先进设备</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              配备先进的生产设备和检测仪器，确保产品质量
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {equipmentList.map((equipment, index) => (
              <motion.div key={index} {...fadeIn({ delay: index * 0.1 })}>
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                      <equipment.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{equipment.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{equipment.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 企业文化 */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn()} className="text-center text-white">
            <h2 className="text-4xl font-bold mb-8">企业文化</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <Target className="w-12 h-12 mx-auto mb-4 text-primary-100" />
                <h3 className="text-xl font-bold mb-3">企业使命</h3>
                <p className="text-primary-100">
                  为国内众多知名企业、家电品牌提供高品质的负离子发生器产品和服务
                </p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-primary-100" />
                <h3 className="text-xl font-bold mb-3">核心价值</h3>
                <p className="text-primary-100">
                  诚信、创新、品质、服务，以客户满意为最高目标
                </p>
              </div>
              <div className="text-center">
                <Award className="w-12 h-12 mx-auto mb-4 text-primary-100" />
                <h3 className="text-xl font-bold mb-3">发展愿景</h3>
                <p className="text-primary-100">
                  成为国内领先的负离子发生器制造商和解决方案提供商
                </p>
              </div>
            </div>
            
            <div className="mt-12">
              <Button 
                size="lg"
                variant="outline"
                className="bg-white text-primary-600 border-white hover:bg-primary-50"
              >
                了解更多
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
