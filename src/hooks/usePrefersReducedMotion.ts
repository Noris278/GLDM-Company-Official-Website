"use client"

import { useEffect, useState } from "react"
import type { MotionProps } from "framer-motion"

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return prefersReducedMotion
}

type FadeOptions = {
  delay?: number
  axis?: "x" | "y"
  distance?: number
  duration?: number
}

export function useFadeInMotion() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return ({ delay = 0, axis = "y", distance = 30, duration = 0.6 }: FadeOptions = {}): MotionProps => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 1, x: 0, y: 0 },
        animate: { opacity: 1, x: 0, y: 0 },
        transition: { duration: 0 },
      }
    }

    const initialOffset = axis === "x" ? { x: distance } : { y: distance }

    return {
      initial: { opacity: 0, ...initialOffset },
      animate: { opacity: 1, x: 0, y: 0 },
      transition: { duration, delay },
    }
  }
}
