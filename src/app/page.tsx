import Header from "@/components/sections/Header"
import Hero from "@/components/sections/Hero"
import Advantages from "@/components/sections/Advantages"
import ApplicationCarousel from "@/components/sections/ApplicationCarousel"
import Products from "@/components/sections/Products"
import CompanyStrength from "@/components/sections/CompanyStrength"
import QualityStandards from "@/components/sections/QualityStandards"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/sections/Footer"
import { getSiteContent } from "@/lib/content"

export default async function Home() {
  const siteContent = await getSiteContent()
  return (
    <div className="min-h-screen">
      <Header />
      <Hero data={siteContent.hero} stats={siteContent.heroStats} />
      <Advantages items={siteContent.advantages} stats={siteContent.advantagesStats} />
      <ApplicationCarousel intro={siteContent.applicationIntro} cards={siteContent.applicationCards} />
      <Products />
      <CompanyStrength data={siteContent.companyStrength} />
      <QualityStandards items={siteContent.qualityStandards} />
      <Contact />
      <Footer />
    </div>
  )
}
