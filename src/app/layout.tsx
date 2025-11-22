import type { Metadata } from "next";
import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10b981",
}

export const metadata: Metadata = {
  title: "苏州歌林蒂姆电子科技有限公司 - 专业负离子发生器制造商",
  description: "苏州歌林蒂姆电子科技有限公司，专注负离子发生器研发制造10年，年产能1500万台，通过UL、TUV、CE等多项国际认证，为国内众多知名企业、家电品牌提供高品质的负离子解决方案。",
  keywords: "负离子发生器,吹风机负离子,空调负离子,空气净化器,苏州歌林蒂姆,负离子技术,家电配件",
  authors: [{ name: "苏州歌林蒂姆电子科技有限公司" }],
  creator: "苏州歌林蒂姆电子科技有限公司",
  publisher: "苏州歌林蒂姆电子科技有限公司",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://www.gelintime.com",
    title: "苏州歌林蒂姆电子科技有限公司 - 专业负离子发生器制造商",
    description: "专注负离子发生器研发制造10年，年产能1500万台，通过多项国际认证，为国内众多知名企业、家电品牌提供高品质的负离子解决方案。",
    siteName: "苏州歌林蒂姆电子科技有限公司",
  },
  twitter: {
    card: "summary_large_image",
    title: "苏州歌林蒂姆电子科技有限公司 - 专业负离子发生器制造商",
    description: "专注负离子发生器研发制造10年，年产能1500万台，通过多项国际认证。",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="canonical" href="https://www.gelintime.com" />
      </head>
      <body className="antialiased content-root">
        {children}
      </body>
    </html>
  );
}
