"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"
import type { SiteContent } from "@/lib/content"

type ProductShowcaseProps = {
  intro: SiteContent["productIntro"]
  products: SiteContent["products"]
}

export default function ProductShowcase({ intro, products }: ProductShowcaseProps) {
  return (
    <>
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
              {intro.badge}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {intro.title}
              <span className="text-primary-600">{intro.highlight}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {intro.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {products.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-lg">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                        {product.title}
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{product.title}</h2>
                    <p className="text-gray-500 font-medium">{product.subtitle}</p>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {product.description}
                  </p>

                  <div>
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

                  <div>
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
                </div>

                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <Card className="shadow-xl border-0 bg-white">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">技术规格</h3>
                      <div className="space-y-4">
                        {product.specs.map((spec, specIndex) => (
                          <div
                            key={specIndex}
                            className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                          >
                            <span className="text-gray-600 font-medium">{spec.label}</span>
                            <span className="text-gray-900 font-bold">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-white/10 backdrop-blur-lg p-10 text-center text-white space-y-6">
            <h3 className="text-3xl font-bold">更多产品与定制方案</h3>
            <p className="text-white/80 max-w-3xl mx-auto">
              我们拥有大量型号、规格的负离子发生器和全面的定制化能力，如需更多解决方案或专属设计
              欢迎联系我们的技术团队。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 rounded-full bg-white text-primary-600 font-semibold hover:bg-primary-50 transition-colors"
            >
              联系我们，获取更多方案
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
