"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Settings, CheckCircle, ClipboardCheck, Factory, RotateCcw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"

export default function QualityControlPage() {

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
              品控系统
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              苏州歌林蒂姆电子科技有限公司
              <br />
              <span className="text-primary-600">生产品质控制管理体系</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              建立完善的质量管理体系，从客户需求到产品交付的全流程质量控制
            </p>
          </motion.div>
        </div>
      </section>

      

      {/* 质量控制要点 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">质量控制要点</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              每个环节的关键控制点，确保产品质量的稳定性和可靠性
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: '来料检验',
                points: ['外观检验', '包装规格核对', '性能测试'],
                icon: AlertTriangle,
                color: 'text-yellow-600',
                bgColor: 'bg-yellow-50'
              },
              {
                title: '过程控制',
                points: ['工艺确定与控制', '人员培训与资格确认', '设备维护与保养'],
                icon: Settings,
                color: 'text-blue-600',
                bgColor: 'bg-blue-50'
              },
              {
                title: '成品检验',
                points: ['包装规格检验', '外观质量检验', '性能参数测试'],
                icon: CheckCircle,
                color: 'text-green-600',
                bgColor: 'bg-green-50'
              },
              {
                title: '测试项目',
                points: ['输出电压测试', '浓度检测', '耐压测试'],
                icon: ClipboardCheck,
                color: 'text-purple-600',
                bgColor: 'bg-purple-50'
              },
              {
                title: '环境控制',
                points: ['生产环境控制', '仪器校准控制', '不合格品标识'],
                icon: Factory,
                color: 'text-indigo-600',
                bgColor: 'bg-indigo-50'
              },
              {
                title: '持续改进',
                points: ['客户满意度调查', '内部品质审核', '管理评审'],
                icon: RotateCcw,
                color: 'text-teal-600',
                bgColor: 'bg-teal-50'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${item.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <ul className="space-y-2">
                      {item.points.map((point, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 质量保证承诺 */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-8">我们的质量承诺</h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold mb-4">99.99%</div>
                <h3 className="text-xl font-bold mb-3">产品合格率</h3>
                <p className="text-primary-100">
                  严格的质量控制确保每个产品都符合标准
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-4">18道</div>
                <h3 className="text-xl font-bold mb-3">质检工序</h3>
                <p className="text-primary-100">
                  从客户需求到产品交付的全流程质量控制
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-4">ISO9001</div>
                <h3 className="text-xl font-bold mb-3">质量认证</h3>
                <p className="text-primary-100">
                  通过国际质量管理体系认证
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-4">24/7</div>
                <h3 className="text-xl font-bold mb-3">质量监控</h3>
                <p className="text-primary-100">
                  全天候质量监控和快速响应机制
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
