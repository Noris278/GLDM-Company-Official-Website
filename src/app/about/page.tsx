import AboutContent from "./AboutContent"
import { getSiteContent } from "@/lib/content"

export default async function AboutPage() {
  const siteContent = await getSiteContent()
  return <AboutContent data={siteContent.about} />
}
