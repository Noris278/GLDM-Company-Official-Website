"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "首页", href: "/" },
  { name: "产品中心", href: "/products" },
  { name: "关于我们", href: "/about" },
  { name: "品控系统", href: "/quality-control" },
  { name: "资质认证", href: "/certifications" },
  { name: "联系我们", href: "/contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* 顶部联系栏 */}
      <div className="bg-primary-50 border-b border-primary-100 py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm text-primary-700">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>0086-512-65073190</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>parktrading@126.com</span>
              </div>
            </div>
            <div className="text-primary-600">
              专业负离子发生器制造商 | 10年行业经验
            </div>
          </div>
        </div>
      </div>

      {/* 主导航 */}
      <header
        className={cn(
          "sticky top-0 z-[999] w-full transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-primary-100"
            : "bg-white"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-4">
              <Image
                src="/logo.png"
                alt="歌林蒂姆"
                width={50}
                height={50}
                priority
                className="w-12 h-12 lg:w-14 lg:h-14"
              />
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-bold text-primary-700">歌林蒂姆</span>
                <span className="text-xs lg:text-sm text-primary-500 hidden sm:block">GreenTimes</span>
              </div>
            </Link>

            {/* 桌面导航 */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* 联系按钮 */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" size="sm">
                获取报价
              </Button>
              <Button size="sm">
                立即咨询
              </Button>
            </div>

            {/* 移动端菜单按钮 */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-primary-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-primary-100 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-primary-600 font-medium py-2 border-b border-gray-100 last:border-b-0"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="outline" size="sm">
                    获取报价
                  </Button>
                  <Button size="sm">
                    立即咨询
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
