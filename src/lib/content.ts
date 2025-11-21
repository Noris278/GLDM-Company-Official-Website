import { promises as fs } from "fs"
import path from "path"

const CONTENT_PATH = path.join(process.cwd(), "content", "site.json")

export type SiteContent = {
  hero: {
    badge: string
    title: {
      prefix: string
      highlight: string
      suffix: string
    }
    descriptions: string[]
    features: string[]
    gallery: Array<{ src: string; alt?: string }>
  }
  heroStats: Array<{ label: string; value: string }>
  advantages: Array<{
    title: string
    description: string
    image: string
  }>
  advantagesStats: Array<{ value: string; label: string }>
  productApplications: Array<{
    name: string
    icon: string
    description: string
    image: string
    color: string
  }>
  productIntro: {
    badge: string
    title: string
    highlight: string
    description: string
  }
  products: Array<{
    title: string
    subtitle: string
    description: string
    image: string
    features: string[]
    specs: Array<{ label: string; value: string }>
    applications: string[]
  }>
  applicationIntro: {
    badge: string
    title: string
    highlight: string
    description: string
  }
  applicationCards: Array<{ title: string; image: string }>
  qualityStandards: Array<{ title: string; description: string; image: string }>
  companyStrength: {
    strengths: Array<{
      icon: string
      title: string
      value: string
      description: string
    }>
    certifications: Array<{ name: string; code: string }>
    factoryImages: Array<{ src: string; title: string; description: string }>
  }
  about: {
    hero: {
      badge: string
      title: string
      highlight: string
      description: string
    }
    companyIntro: {
      title: string
      paragraphs: string[]
      stats: Array<{ value: string; label: string }>
      image: {
        src: string
        title: string
        subtitle: string
      }
    }
    history: {
      title: string
      description: string
      timeline: Array<{ year: string; title: string; description: string }>
    }
    workshop: {
      title: string
      description: string
      gallery: Array<{ name: string; image: string }>
    }
    equipment: {
      title: string
      description: string
      items: Array<{ name: string; description: string; icon: string }>
    }
    culture: {
      title: string
      cards: Array<{ title: string; description: string; icon: string }>
      ctaText: string
      buttonText: string
      buttonLink: string
    }
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  const data = await fs.readFile(CONTENT_PATH, "utf-8")
  return JSON.parse(data)
}

export async function updateSiteContent(content: SiteContent) {
  await fs.writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), "utf-8")
}
