"use client"

import { motion } from "framer-motion"
import { Wind, Droplets, Leaf, Zap, ArrowRight, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"

const productCategories = [
  {
    id: "hair-dryer",
    icon: Wind,
    title: "吹风机负离子发生器",
    subtitle: "Hair Dryer Ion Generator",
    description: "专为吹风机设计的负离子发生器，有效减少静电，让头发更加柔顺亮泽",
    features: [
      "高浓度负离子输出",
      "低功耗设计",
      "长寿命运行",
      "静音工作",
      "小型化设计",
      "易于集成"
    ],
    specs: {
      "负离子浓度": "≥3×10⁶个/cm³",
      "工作电压": "DC 12V",
      "功耗": "≤2W",
      "工作温度": "-10℃~+60℃",
      "使用寿命": "≥8000小时",
      "外形尺寸": "45×25×15mm"
    },
    applications: ["家用吹风机", "专业美发设备", "便携式吹风机"],
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "air-conditioner",
    icon: Droplets,
    title: "空调负离子发生器",
    subtitle: "Air Conditioner Ion Generator",
    description: "集成于空调系统的负离子发生器，净化空气，提升室内空气质量",
    features: [
      "大风量适配",
      "智能控制",
      "节能环保",
      "维护简便",
      "抗腐蚀设计",
      "长期稳定"
    ],
    specs: {
      "负离子浓度": "≥5×10⁶个/cm³",
      "工作电压": "AC 220V",
      "功耗": "≤5W",
      "工作温度": "-20℃~+70℃",
      "使用寿命": "≥10000小时",
      "外形尺寸": "80×50×30mm"
    },
    applications: ["家用空调", "商用空调", "中央空调系统"],
    color: "from-green-500 to-green-600"
  },
  {
    id: "air-purifier",
    icon: Leaf,
    title: "空气净化器负离子发生器",
    subtitle: "Air Purifier Ion Generator",
    description: "高效的空气净化负离子发生器，去除PM2.5、细菌病毒，营造健康环境",
    features: [
      "超高净化效率",
      "多重过滤",
      "智能监测",
      "静音设计",
      "自动调节",
      "远程控制"
    ],
    specs: {
      "负离子浓度": "≥8×10⁶个/cm³",
      "工作电压": "DC 24V",
      "功耗": "≤8W",
      "工作温度": "0℃~+50℃",
      "使用寿命": "≥12000小时",
      "外形尺寸": "100×60×40mm"
    },
    applications: ["家用空气净化器", "车载空气净化器", "商用净化设备"],
    color: "from-emerald-500 to-emerald-600"
  }
]

export default function ProductsPage() {
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
              产品中心
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              专业的
              <span className="text-primary-600">负离子解决方案</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              为不同应用场景提供定制化的负离子发生器产品，满足各类家电制造商的需求
            </p>
          </motion.div>
        </div>
      </section>

      {/* 产品分类展示 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {productCategories.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* 产品信息 */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${product.color} rounded-2xl flex items-center justify-center`}>
                      <product.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{product.title}</h2>
                      <p className="text-gray-500 font-medium">{product.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {product.description}
                  </p>

                  {/* 产品特性 */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">产品特性</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {product.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 应用领域 */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">应用领域</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.applications.map((app, appIndex) => (
                        <span
                          key={appIndex}
                          className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button size="lg" className="group">
                    获取详细资料
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* 产品规格 */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <Card className="shadow-xl border-0 bg-white">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">技术规格</h3>
                      <div className="space-y-4">
                        {Object.entries(product.specs).map(([key, value], specIndex) => (
                          <div key={specIndex} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                            <span className="text-gray-600 font-medium">{key}</span>
                            <span className="text-gray-900 font-bold">{value}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl">
                        <div className="flex items-center space-x-3 mb-3">
                          <Zap className="w-6 h-6 text-primary-600" />
                          <span className="font-bold text-primary-800">性能优势</span>
                        </div>
                        <p className="text-primary-700 text-sm leading-relaxed">
                          采用先进的负离子发生技术，确保产品性能稳定可靠，
                          通过多项国际认证，品质值得信赖。
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 联系咨询 */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-6">需要定制化解决方案？</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              我们的专业团队可以根据您的具体需求，提供定制化的负离子发生器解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white text-primary-600 border-white hover:bg-primary-50"
              >
                立即咨询
              </Button>
              <Button 
                size="lg"
                className="bg-primary-700 hover:bg-primary-800 border-primary-700"
              >
                下载产品手册
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
