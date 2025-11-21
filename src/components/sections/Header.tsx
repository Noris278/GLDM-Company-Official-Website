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
  {
    name: "关于我们",
    href: "/about",
    children: [
      { name: "公司简介", href: "/about#about-company" },
      { name: "发展历程", href: "/about#about-history" },
      { name: "厂房设备", href: "/about#about-facilities" },
    ],
  },
  { name: "品控系统", href: "/quality-control" },
  { name: "资质认证", href: "/certifications" },
  { name: "联系我们", href: "/contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)

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
                <span>admin@szgldm.cn</span>
              </div>
            </div>
            <div className="text-primary-600">
              专业负离子发生器研发制造商 | 12年行业经验
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
              {navigation.map((item) => {
                if (item.children) {
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => {
                        if (dropdownTimeout) {
                          clearTimeout(dropdownTimeout)
                          setDropdownTimeout(null)
                        }
                        setActiveDropdown(item.name)
                      }}
                      onMouseLeave={() => {
                        const timeout = setTimeout(() => setActiveDropdown(null), 200)
                        setDropdownTimeout(timeout)
                      }}
                    >
                      <Link
                        href={item.href}
                        className="group text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative inline-flex items-center"
                      >
                        {item.name}
                        <span className="absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all duration-300 w-0 group-hover:w-full group-focus-visible:w-full"></span>
                      </Link>
                      <div
                        className={`absolute left-0 top-full mt-2 rounded-2xl bg-white shadow-xl transition duration-200 ${
                          activeDropdown === item.name ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                        }`}
                        style={{
                          minWidth: "180px",
                          border: "1px solid rgba(16, 185, 129, 0.2)",
                          pointerEvents: activeDropdown === item.name ? "auto" : "none",
                        }}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block pr-4 py-3 text-base text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-2xl transition whitespace-nowrap"
                            style={{ paddingLeft: "32px" }}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                }
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative inline-flex items-center"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all duration-300 w-0 group-hover:w-full group-focus-visible:w-full"></span>
                  </Link>
                )
              })}
            </nav>

            {/* 联系按钮 */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button size="sm" asChild>
                <Link href="/contact">立即咨询</Link>
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
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-primary-600 font-medium py-2 border-b border-gray-100 flex items-center justify-between"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="pl-4 border-b border-gray-100">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block text-gray-500 hover:text-primary-600 py-1 text-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex flex-col space-y-2 pt-4">
                  <Button size="sm" asChild>
                    <Link href="/contact">立即咨询</Link>
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
