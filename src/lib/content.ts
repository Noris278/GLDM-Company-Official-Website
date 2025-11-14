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
  }
  heroStats: Array<{ label: string; value: string }>
  productApplications: Array<{
    name: string
    icon: string
    description: string
    image: string
    color: string
  }>
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
}

export async function getSiteContent(): Promise<SiteContent> {
  const data = await fs.readFile(CONTENT_PATH, "utf-8")
  return JSON.parse(data)
}

export async function updateSiteContent(content: SiteContent) {
  await fs.writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), "utf-8")
}
