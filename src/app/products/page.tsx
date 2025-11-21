import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"
import ProductShowcase from "@/components/sections/ProductShowcase"
import { getSiteContent } from "@/lib/content"

export default async function ProductsPage() {
  const siteContent = await getSiteContent()

  return (
    <div className="min-h-screen">
      <Header />
      <ProductShowcase intro={siteContent.productIntro} products={siteContent.products} />
      <Footer />
    </div>
  )
}
