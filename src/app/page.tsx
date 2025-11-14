import Header from "@/components/sections/Header"
import Hero from "@/components/sections/Hero"
import Advantages from "@/components/sections/Advantages"
import ProductApplications from "@/components/sections/ProductApplications"
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
      <Advantages />
      <ProductApplications applications={siteContent.productApplications} />
      <Products />
      <CompanyStrength data={siteContent.companyStrength} />
      <QualityStandards items={siteContent.qualityStandards} />
      <Contact />
      <Footer />
    </div>
  )
}
