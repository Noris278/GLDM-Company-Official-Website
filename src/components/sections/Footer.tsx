import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin, Globe } from "lucide-react"

const footerLinks = {
  products: [
    { name: "吹风机负离子发生器", href: "/products/hair-dryer" },
    { name: "空调负离子发生器", href: "/products/air-conditioner" },
    { name: "空气净化器负离子发生器", href: "/products/air-purifier" },
    { name: "定制化解决方案", href: "/products/custom" }
  ],
  company: [
    { name: "关于我们", href: "/about" },
    { name: "企业文化", href: "/about/culture" },
    { name: "发展历程", href: "/about/history" },
    { name: "荣誉资质", href: "/certifications" }
  ],
  support: [
    { name: "技术支持", href: "/support" },
    { name: "下载中心", href: "/downloads" },
    { name: "常见问题", href: "/faq" },
    { name: "联系我们", href: "/contact" }
  ]
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* 主要内容区域 */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* 公司信息 */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <Image
                src="/logo.png"
                alt="歌林蒂姆"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">歌林蒂姆</span>
                <span className="text-xs text-gray-400">GELIN TIME</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              苏州歌林蒂姆电子科技有限公司，专注负离子发生器研发制造10年，
              为国内众多知名企业、家电品牌提供高品质的负离子解决方案。
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-4 h-4 text-primary-400" />
                <span>0086-512-65073190</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4 text-primary-400" />
                <span>parktrading@126.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span>江苏省苏州市吴中区甪直镇长虹北路248-2号</span>
              </div>
            </div>
          </div>

          {/* 产品中心 */}
          <div>
            <h3 className="text-lg font-bold mb-6">产品中心</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 关于我们 */}
          <div>
            <h3 className="text-lg font-bold mb-6">关于我们</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 客户服务 */}
          <div>
            <h3 className="text-lg font-bold mb-6">客户服务</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* 认证标识 */}
            <div className="mt-8">
              <h4 className="text-sm font-medium mb-4 text-gray-400">权威认证</h4>
              <div className="flex flex-wrap gap-2">
                {["UL", "TUV", "CE", "CB", "CQC", "ISO9001"].map((cert, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded border border-gray-700"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部版权信息 */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 苏州歌林蒂姆电子科技有限公司. 保留所有权利.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-primary-400 transition-colors">
                隐私政策
              </Link>
              <Link href="/terms" className="hover:text-primary-400 transition-colors">
                使用条款
              </Link>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>苏ICP备xxxxxxxx号</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
