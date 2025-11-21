"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Users, Target, Award, Factory, Cog, CheckCircle, ArrowRight } from "lucide-react"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useFadeInMotion } from "@/hooks/usePrefersReducedMotion"
import type { SiteContent } from "@/lib/content"

const iconMap = {
  Users,
  Target,
  Award,
  Factory,
  Cog,
  CheckCircle,
}

type AboutContentProps = {
  data: SiteContent["about"]
}

export default function AboutContent({ data }: AboutContentProps) {
  const fadeIn = useFadeInMotion()
  const hero = data.hero
  const companyIntro = data.companyIntro
  const history = data.history
  const workshop = data.workshop
  const equipment = data.equipment
  const culture = data.culture

  return (
    <div className="min-h-screen">
      <Header />

      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {hero.badge && (
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                {hero.badge}
              </div>
            )}
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {hero.title}
              {hero.highlight && <span className="text-primary-600">{hero.highlight}</span>}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{hero.description}</p>
          </motion.div>
        </div>
      </section>

      <section id="about-company" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn({ axis: "x", distance: -30 })}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{companyIntro.title}</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                {companyIntro.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {companyIntro.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-6 mt-8">
                  {companyIntro.stats.map((stat, index) => (
                    <div key={`${stat.label}-${index}`} className="text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</div>
                      <div className="text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div {...fadeIn({ axis: "x", distance: 30, delay: 0.2 })} className="relative">
              <div className="w-full h-96 rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={companyIntro.image.src}
                  alt={companyIntro.image.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <p className="text-lg font-medium">{companyIntro.image.title}</p>
                    <p className="text-sm opacity-90">{companyIntro.image.subtitle}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="about-history" className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn()} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{history.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{history.description}</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200 hidden lg:block"></div>

            <div className="space-y-6 lg:space-y-8">
              {history.timeline.map((item, index) => (
                <motion.div
                  key={`${item.year}-${index}`}
                  {...fadeIn({ delay: index * 0.1 })}
                  className={`flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"}`}>
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
                  <div className="hidden lg:block w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg relative z-10"></div>
                  <div className="lg:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about-facilities" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn()} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{workshop.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{workshop.description}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshop.gallery.map((equipmentItem, index) => (
              <motion.div key={`${equipmentItem.name}-${index}`} {...fadeIn({ delay: index * 0.1 })}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48">
                    <Image
                      src={equipmentItem.image}
                      alt={equipmentItem.name}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 text-center">{equipmentItem.name}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn()} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{equipment.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{equipment.description}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {equipment.items.map((item, index) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Award
              return (
                <motion.div key={`${item.name}-${index}`} {...fadeIn({ delay: index * 0.1 })}>
                  <Card className="h-full text-center hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                        <Icon className="w-8 h-8 text-primary-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{item.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn()} className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">{culture.title}</h2>
            {culture.ctaText && <p className="text-primary-100 max-w-3xl mx-auto mb-8">{culture.ctaText}</p>}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {culture.cards.map((card, index) => {
                const Icon = iconMap[card.icon as keyof typeof iconMap] ?? Award
                return (
                  <div key={`${card.title}-${index}`} className="text-center">
                    <Icon className="w-12 h-12 mx-auto mb-4 text-primary-100" />
                    <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                    <p className="text-primary-100">{card.description}</p>
                  </div>
                )
              })}
            </div>

            {culture.buttonText && (
              <div className="mt-12">
                <Button asChild size="lg" variant="outline" className="bg-white text-primary-600 border-white hover:bg-primary-50">
                  <Link href={culture.buttonLink || "/contact"}>
                    {culture.buttonText}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
