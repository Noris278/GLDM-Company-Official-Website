"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMemo, useRef } from "react"
import type { SiteContent } from "@/lib/content"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

type ApplicationCarouselProps = {
  intro: SiteContent["applicationIntro"]
  cards: SiteContent["applicationCards"]
}

export default function ApplicationCarousel({ intro, cards }: ApplicationCarouselProps) {
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const nextRef = useRef<HTMLButtonElement | null>(null)
  const fadeMaskStyle = useMemo(
    () => ({
      maskImage: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)",
      WebkitMaskImage:
        "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)",
    }),
    [],
  )

  if (!cards.length) return null

  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
            {intro.badge}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {intro.title}
            <span className="text-primary-600">{intro.highlight}</span>
          </h2>
          <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">{intro.description}</p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <button
            ref={prevRef}
            className="absolute left-0 lg:-left-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary-50 transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            ref={nextRef}
            className="absolute right-0 lg:-right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary-50 transition"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          <div className="relative" style={fadeMaskStyle}>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              loop
              centeredSlides
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                const navigationParams = swiper.params.navigation
                if (navigationParams && typeof navigationParams !== "boolean") {
                  navigationParams.prevEl = prevRef.current
                  navigationParams.nextEl = nextRef.current
                }
              }}
              slidesPerView={1}
              spaceBetween={24}
              breakpoints={{
                640: { slidesPerView: 1.1 },
                1024: { slidesPerView: 1.3 },
                1280: { slidesPerView: 1.5 },
              }}
              className="!pb-12"
            >
              {cards.map((card, index) => (
                <SwiperSlide key={`${card.title}-${index}`} className="px-2 sm:px-4">
                  <div className="relative h-[380px] sm:h-[420px] lg:h-[460px] rounded-[32px] overflow-hidden border border-white/30 bg-white shadow-2xl">
                    {card.image ? (
                      <Image src={card.image} alt={card.title} width={960} height={540} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                        {card.title}
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                      <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}
