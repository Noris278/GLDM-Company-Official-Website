"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, FileText, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"

const contactMethods = [
  {
    icon: Phone,
    title: "电话咨询",
    content: "+86-512-66539481",
    description: "工作日 9:00-18:00 专业客服为您服务",
    action: "立即拨打",
    color: "text-blue-600"
  },
  {
    icon: Mail,
    title: "邮件咨询",
    content: "info@gelintime.com",
    description: "24小时内专业回复，详细解答您的问题",
    action: "发送邮件",
    color: "text-green-600"
  },
  {
    icon: MessageCircle,
    title: "在线客服",
    content: "即时沟通",
    description: "工作时间在线，快速响应您的需求",
    action: "开始对话",
    color: "text-purple-600"
  },
  {
    icon: FileText,
    title: "技术支持",
    content: "专业团队",
    description: "技术专家提供专业的产品咨询和支持",
    action: "获取支持",
    color: "text-orange-600"
  }
]

const officeInfo = [
  {
    title: "总部地址",
    content: "苏州市吴中区科技园",
    icon: MapPin
  },
  {
    title: "工作时间",
    content: "周一至周五 9:00-18:00",
    icon: Clock
  },
  {
    title: "服务团队",
    content: "80+ 专业员工",
    icon: Users
  }
]

export default function ContactPage() {
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
              联系我们
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              开启
              <span className="text-primary-600">合作之旅</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              专业的技术团队随时为您提供咨询服务，期待与您携手共创美好未来
            </p>
          </motion.div>
        </div>
      </section>

      {/* 联系方式 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">多种联系方式</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              选择最适合您的联系方式，我们将竭诚为您服务
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 group border-0 bg-white">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-colors`}>
                      <method.icon className={`w-8 h-8 ${method.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                    <p className="text-lg font-medium text-gray-800 mb-3">{method.content}</p>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">{method.description}</p>
                    <Button variant="outline" className="w-full group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 联系表单和公司信息 */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* 联系表单 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-xl border-0 bg-white">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">在线留言</h3>
                  <p className="text-gray-600 mb-8">填写以下信息，我们将尽快与您联系</p>
                  
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          姓名 *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          placeholder="请输入您的姓名"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          公司名称
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          placeholder="请输入公司名称"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          联系电话 *
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          placeholder="请输入联系电话"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          邮箱地址
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          placeholder="请输入邮箱地址"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        产品需求
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200">
                        <option value="">请选择产品类型</option>
                        <option value="hair-dryer">吹风机负离子发生器</option>
                        <option value="air-conditioner">空调负离子发生器</option>
                        <option value="air-purifier">空气净化器负离子发生器</option>
                        <option value="custom">定制化产品</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        详细需求 *
                      </label>
                      <textarea
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="请详细描述您的需求，包括：&#10;• 产品数量和规格要求&#10;• 预期交期&#10;• 特殊技术要求&#10;• 其他相关信息"
                      ></textarea>
                    </div>

                    <Button size="lg" className="w-full group">
                      <Send className="mr-2 w-5 h-5" />
                      提交留言
                      <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* 公司信息 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">公司信息</h3>
                <div className="space-y-6">
                  {officeInfo.map((info, index) => (
                    <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                            <info.icon className="w-6 h-6 text-primary-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">{info.title}</h4>
                            <p className="text-gray-600">{info.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 地图区域 */}
              <Card className="border-0 bg-white">
                <CardContent className="p-0">
                  <div className="w-full h-64 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-primary-700">
                        <MapPin className="w-16 h-16 mx-auto mb-4" />
                        <p className="text-lg font-medium">公司位置</p>
                        <p className="text-sm opacity-75">苏州市吴中区</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 快速联系 */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-gray-900">快速联系</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Button size="lg" className="group">
                    <Phone className="mr-2 w-5 h-5" />
                    立即致电
                  </Button>
                  <Button variant="outline" size="lg" className="group">
                    <Mail className="mr-2 w-5 h-5" />
                    发送邮件
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
