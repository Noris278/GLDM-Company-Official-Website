"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Award, Shield, CheckCircle, Globe, FileText, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"
import { useFadeInMotion } from "@/hooks/usePrefersReducedMotion"

const certifications = [
  {
    name: "UL认证",
    code: "UL2089",
    description: "美国保险商实验室认证，确保产品安全性符合北美标准",
    region: "北美",
    icon: Shield,
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "TUV认证",
    code: "TUV SUD",
    description: "德国技术监督协会认证，欧洲权威安全认证机构",
    region: "欧洲",
    icon: Award,
    color: "from-green-500 to-green-600"
  },
  {
    name: "CE认证",
    code: "CE-EMC",
    description: "欧盟强制性认证标志，确保产品符合欧盟安全标准",
    region: "欧盟",
    icon: CheckCircle,
    color: "from-purple-500 to-purple-600"
  },
  {
    name: "CB认证",
    code: "CB-IEC",
    description: "国际电工委员会互认证书，国内外通用的安全认证",
    region: "国内外",
    icon: Globe,
    color: "from-orange-500 to-orange-600"
  },
  {
    name: "CQC认证",
    code: "CQC-CCC",
    description: "中国质量认证中心认证，中国强制性产品认证",
    region: "中国",
    icon: Star,
    color: "from-red-500 to-red-600"
  },
  {
    name: "ISO9001",
    code: "质量管理",
    description: "国际标准化组织质量管理体系认证",
    region: "国际",
    icon: FileText,
    color: "from-teal-500 to-teal-600"
  }
]

const qualityStandards = [
  {
    title: "产品安全标准",
    items: [
      "电气安全测试",
      "EMC电磁兼容测试",
      "环境适应性测试",
      "可靠性测试"
    ]
  },
  {
    title: "质量管理体系",
    items: [
      "ISO9001质量管理",
      "全面质量控制",
      "持续改进机制",
      "客户满意度管理"
    ]
  },
  {
    title: "环保标准",
    items: [
      "RoHS环保指令",
      "REACH法规",
      "绿色制造",
      "可持续发展"
    ]
  }
]

export default function CertificationsPage() {
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
              资质认证
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              权威认证
              <span className="text-primary-600">品质保证</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              通过多项国际权威认证，产品质量和安全性得到国内外客户认可
            </p>
          </motion.div>
        </div>
      </section>

      {/* 认证展示 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn()} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">国际权威认证</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              获得国内外主要市场的权威认证，确保产品质量和安全性
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div key={index} {...fadeIn({ delay: index * 0.1 })}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group overflow-hidden">
                  {/* 认证图标区域 */}
                  <div className={`relative h-32 bg-gradient-to-r ${cert.color} overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <cert.icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                      {cert.region}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{cert.name}</h3>
                      <span className="text-sm text-gray-500 font-mono">{cert.code}</span>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                      {cert.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 证书资质水平滚动展示 */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn()} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">证书资质展示</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              我们获得的各项权威认证证书
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              className="flex space-x-8 pb-8"
              animate={{
                x: [0, -2400, 0],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...Array(11)].map((_, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-80 h-96"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full overflow-hidden shadow-xl">
                    <div className="relative h-full">
                      <Image
                        src={`/images/certifications/cert-${String(index + 1).padStart(2, '0')}.webp`}
                        alt={`认证证书 ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 80vw, 320px"
                        className="object-cover"
                      />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* 渐变遮罩 */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-primary-50 to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-primary-50 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* 质量标准 */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn()} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">质量标准</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              严格遵循国际质量标准，建立完善的质量管理体系
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {qualityStandards.map((standard, index) => (
              <motion.div key={index} {...fadeIn({ delay: index * 0.2 })}>
                <Card className="h-full bg-white shadow-lg border-0">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{standard.title}</h3>
                    <div className="space-y-4">
                      {standard.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 质量承诺 */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn()} className="text-center text-white">
            <h2 className="text-4xl font-bold mb-8">我们的质量承诺</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold mb-4">99.99%</div>
                <h3 className="text-xl font-bold mb-3">产品合格率</h3>
                <p className="text-primary-100">
                  严格的质量控制确保每个产品都符合标准
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-4">24小时</div>
                <h3 className="text-xl font-bold mb-3">快速响应</h3>
                <p className="text-primary-100">
                  专业客服团队提供及时的技术支持
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-4">12年</div>
                <h3 className="text-xl font-bold mb-3">行业经验</h3>
                <p className="text-primary-100">
                  丰富的行业经验保证产品质量稳定
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 认证流程 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn()} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">认证流程</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              严格的认证流程确保产品质量和安全性
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "产品设计", desc: "严格按照国际标准设计产品" },
              { step: "02", title: "样品测试", desc: "送检权威机构进行全面测试" },
              { step: "03", title: "工厂审核", desc: "生产工厂接受严格质量审核" },
              { step: "04", title: "获得认证", desc: "通过认证获得相关证书" }
            ].map((process, index) => (
              <motion.div key={index} {...fadeIn({ delay: index * 0.1 })} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold text-lg">{process.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
