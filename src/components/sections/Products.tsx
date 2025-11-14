"use client"

import { motion } from "framer-motion"
import { ArrowRight, Wind, Droplets, Leaf } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const products = [
  {
    icon: Wind,
    title: "吹风机负离子发生器",
    description: "专为吹风机设计的负离子发生器，有效减少静电，让头发更加柔顺亮泽",
    features: ["高浓度负离子", "低功耗设计", "长寿命", "静音运行"],
    image: "/api/placeholder/300/200"
  },
  {
    icon: Droplets,
    title: "空调负离子发生器",
    description: "集成于空调系统的负离子发生器，净化空气，提升室内空气质量",
    features: ["大风量适配", "智能控制", "节能环保", "维护简便"],
    image: "/api/placeholder/300/200"
  },
  {
    icon: Leaf,
    title: "空气净化器负离子发生器",
    description: "高效的空气净化负离子发生器，去除PM2.5、细菌病毒，营造健康环境",
    features: ["超高净化效率", "多重过滤", "智能监测", "静音设计"],
    image: "/api/placeholder/300/200"
  }
]

export default function Products() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
            产品中心
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            专业的
            <span className="text-primary-600">负离子解决方案</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            为不同应用场景提供定制化的负离子发生器产品，满足各类家电制造商的需求
          </p>
        </motion.div>

        {/* 产品网格 */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                {/* 产品图片区域 */}
                <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <product.icon className="w-16 h-16 text-primary-600" />
                  </div>
                  {/* 装饰性元素 */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/30 rounded-full"></div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {product.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  {/* 特性标签 */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all duration-300"
                  >
                    了解详情
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 技术优势展示 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-8 lg:p-12 text-white"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">技术领先，品质卓越</h3>
              <p className="text-primary-100 mb-6 leading-relaxed">
                采用先进的负离子发生技术，确保产品性能稳定可靠。
                严格的质量控制流程，让每一台产品都达到国际标准。
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold mb-1">99.9%</div>
                  <div className="text-primary-200 text-sm">产品合格率</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">24小时</div>
                  <div className="text-primary-200 text-sm">快速响应</div>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white text-primary-600 border-white hover:bg-primary-50"
              >
                查看全部产品
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
