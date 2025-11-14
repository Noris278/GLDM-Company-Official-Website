"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  Users,
  Factory,
  Settings,
  Package,
  ShoppingCart,
  Award,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RotateCcw,
  FileText,
  Truck,
  Eye,
  ClipboardCheck
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"

// 流程节点数据
const flowSteps = [
  {
    id: 'customer-req',
    title: '客户需求',
    description: '客户提出产品需求和规格要求',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    position: { x: 50, y: 50 },
    type: 'start'
  },
  {
    id: 'sample-making',
    title: '样品制作',
    description: '根据客户需求制作产品样品',
    icon: Factory,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    position: { x: 300, y: 50 },
    type: 'process'
  },
  {
    id: 'sample-check',
    title: '样品检验',
    description: '对样品进行质量检验和测试',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    position: { x: 550, y: 50 },
    type: 'decision',
    details: [
      '客户要求的评估及样板/报价确认'
    ]
  },
  {
    id: 'customer-confirm',
    title: '客户确认',
    description: '客户确认样品质量和规格',
    icon: Eye,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    position: { x: 50, y: 150 },
    type: 'process'
  },
  {
    id: 'contract',
    title: '合同详单',
    description: '签订正式生产合同',
    icon: FileText,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    position: { x: 300, y: 150 },
    type: 'process',
    details: [
      '客户要求的评估与确认'
    ]
  },
  {
    id: 'production-plan',
    title: '生产计划',
    description: '制定详细的生产计划',
    icon: ClipboardCheck,
    color: 'text-teal-600',
    bgColor: 'bg-teal-100',
    position: { x: 50, y: 250 },
    type: 'process'
  },
  {
    id: 'material-purchase',
    title: '物料采购',
    description: '采购生产所需的原材料',
    icon: ShoppingCart,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    position: { x: 300, y: 250 },
    type: 'process',
    details: [
      '供应商评审',
      '1. 来料外观检验',
      '2. 来料包装规格及标识的核对',
      '3. 来料性能测试'
    ]
  },
  {
    id: 'material-check',
    title: '来料检验',
    description: '对采购的原材料进行质量检验',
    icon: AlertTriangle,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    position: { x: 550, y: 250 },
    type: 'decision'
  },
  {
    id: 'batch-production',
    title: '批量生产',
    description: '开始批量生产产品',
    icon: Factory,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    position: { x: 50, y: 350 },
    type: 'process'
  },
  {
    id: 'process-check',
    title: '过程检验',
    description: '生产过程中的质量控制',
    icon: Settings,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    position: { x: 300, y: 350 },
    type: 'decision',
    details: [
      '1. 工艺及钢线工艺确定与控制',
      '2. 操作人员的培训与资格确认',
      '3. 设备维护与保养控制',
      '4. 检验与测试设备的设置与控制',
      '5. 不合格品的标识与控制',
      '6. 仪器校准的控制、生产环境的控制'
    ]
  },
  {
    id: 'finished-product',
    title: '制成品',
    description: '完成产品制造',
    icon: Package,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    position: { x: 50, y: 450 },
    type: 'process'
  },
  {
    id: 'product-check',
    title: '成品检验',
    description: '对成品进行全面质量检验',
    icon: CheckCircle,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    position: { x: 300, y: 450 },
    type: 'decision',
    details: [
      '1. 成品检验：包装规格、成品外观等',
      '2. 测试项目：输出电压、浓度、耐压、阻抗、老化、耐温等'
    ]
  },
  {
    id: 'warehouse',
    title: '入库/出货',
    description: '合格产品入库准备出货',
    icon: Truck,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    position: { x: 50, y: 550 },
    type: 'process'
  },
  {
    id: 'customer-satisfaction',
    title: '客户满意度调查',
    description: '收集客户反馈',
    icon: Award,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
    position: { x: 300, y: 550 },
    type: 'process'
  },
  {
    id: 'internal-audit',
    title: '内部品质审核',
    description: '内部质量体系审核',
    icon: ClipboardCheck,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    position: { x: 550, y: 550 },
    type: 'process'
  },
  {
    id: 'management-review',
    title: '管理评审',
    description: '管理层质量体系评审',
    icon: Users,
    color: 'text-slate-600',
    bgColor: 'bg-slate-100',
    position: { x: 425, y: 650 },
    type: 'process'
  },
  {
    id: 'nonconforming-handling',
    title: '不合格品处理',
    description: '处理不合格产品',
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    position: { x: 425, y: 750 },
    type: 'process'
  }
]

// 连接线数据
const connections = [
  { from: 'customer-req', to: 'sample-making' },
  { from: 'sample-making', to: 'sample-check' },
  { from: 'sample-check', to: 'customer-confirm', type: 'qualified' },
  { from: 'customer-confirm', to: 'contract' },
  { from: 'contract', to: 'production-plan' },
  { from: 'production-plan', to: 'material-purchase' },
  { from: 'material-purchase', to: 'material-check' },
  { from: 'material-check', to: 'batch-production', type: 'qualified' },
  { from: 'batch-production', to: 'process-check' },
  { from: 'process-check', to: 'finished-product', type: 'qualified' },
  { from: 'finished-product', to: 'product-check' },
  { from: 'product-check', to: 'warehouse', type: 'qualified' },
  { from: 'warehouse', to: 'customer-satisfaction' },
  { from: 'customer-satisfaction', to: 'internal-audit' },
  { from: 'internal-audit', to: 'management-review' },
  { from: 'management-review', to: 'nonconforming-handling' },
  // 不合格品返回路径
  { from: 'sample-check', to: 'sample-making', type: 'unqualified' },
  { from: 'material-check', to: 'material-purchase', type: 'unqualified' },
  { from: 'process-check', to: 'batch-production', type: 'unqualified' },
  { from: 'product-check', to: 'finished-product', type: 'unqualified' }
]

export default function QualityControlPage() {
  const [selectedStep, setSelectedStep] = useState<string | null>(null)
  const [animationPhase, setAnimationPhase] = useState(0)

  // 自动播放动画
  useState(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % flowSteps.length)
    }, 2000)
    return () => clearInterval(interval)
  })

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

      {/* 部门标题栏 */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-6 gap-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-blue-50 p-4 rounded-lg"
            >
              <h3 className="font-bold text-blue-800">客户</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-purple-50 p-4 rounded-lg"
            >
              <h3 className="font-bold text-purple-800">生产</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-green-50 p-4 rounded-lg"
            >
              <h3 className="font-bold text-green-800">市场/技术部</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-orange-50 p-4 rounded-lg"
            >
              <h3 className="font-bold text-orange-800">品管部</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-red-50 p-4 rounded-lg"
            >
              <h3 className="font-bold text-red-800">采购部</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-indigo-50 p-4 rounded-lg"
            >
              <h3 className="font-bold text-indigo-800">品质技术与相关部门</h3>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 交互式流程图 */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">生产品质控制管理体系流程</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              完整的质量控制流程，从客户需求到产品交付的全流程管理
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">合格流程</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">不合格返回</span>
              </div>
            </div>
          </motion.div>

          <div className="relative bg-white rounded-3xl shadow-xl p-8 overflow-auto" style={{ minHeight: '900px' }}>
            {/* 连接线 */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {connections.map((conn, index) => {
                const fromStep = flowSteps.find(s => s.id === conn.from)
                const toStep = flowSteps.find(s => s.id === conn.to)
                if (!fromStep || !toStep) return null

                const isUnqualified = conn.type === 'unqualified'
                const strokeColor = isUnqualified ? '#ef4444' : '#10b981'
                const strokeDasharray = isUnqualified ? '10,5' : '5,5'

                return (
                  <motion.line
                    key={`${conn.from}-${conn.to}-${index}`}
                    x1={fromStep.position.x + 100}
                    y1={fromStep.position.y + 50}
                    x2={toStep.position.x + 100}
                    y2={toStep.position.y + 50}
                    stroke={strokeColor}
                    strokeWidth="2"
                    strokeDasharray={strokeDasharray}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                )
              })}
            </svg>

            {/* 流程节点 */}
            {flowSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="absolute cursor-pointer"
                style={{
                  left: step.position.x,
                  top: step.position.y,
                  zIndex: 2
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
              >
                <Card className={`w-48 transition-all duration-300 group ${
                  selectedStep === step.id ? 'ring-2 ring-primary-500 shadow-xl' : 'hover:shadow-lg'
                } ${
                  animationPhase === index ? 'ring-2 ring-blue-400 shadow-lg' : ''
                }`}>
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <step.icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">{step.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{step.description}</p>

                    {/* 详细信息展开 */}
                    {selectedStep === step.id && step.details && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-gray-200"
                      >
                        <ul className="text-xs text-left space-y-1">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="text-gray-700">
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* 流程说明卡片 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="absolute top-8 right-8 w-80 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 shadow-lg"
              style={{ zIndex: 3 }}
            >
              <h4 className="font-bold text-primary-800 mb-4">流程说明</h4>
              <div className="space-y-3 text-sm text-primary-700">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>每个环节都有严格的质量控制标准</span>
                </div>
                <div className="flex items-start space-x-2">
                  <RotateCcw className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>不合格产品会返回相应环节重新处理</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Award className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>通过ISO9001质量管理体系认证</span>
                </div>
              </div>
            </motion.div>
          </div>
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
                <div className="text-4xl font-bold mb-4">99.9%</div>
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
