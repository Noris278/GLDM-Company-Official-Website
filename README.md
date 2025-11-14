# 苏州歌林蒂姆电子科技有限公司官网

专业负离子发生器制造商的企业官网，基于 Next.js 14 开发。

## 项目概述

苏州歌林蒂姆电子科技有限公司成立于2013年，专注负离子发生器研发制造10年，年产能1500万台，通过UL、TUV、CE等多项国际认证，为全球家电制造商提供高品质的负离子解决方案。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS v4
- **UI组件**: shadcn/ui
- **动画**: Framer Motion
- **图标**: Lucide React
- **语言**: TypeScript
- **部署**: 支持 Vercel、阿里云等平台

## 功能特性

### 🏠 首页
- 英雄区域展示
- 核心优势介绍
- 产品展示
- 企业实力展示
- 联系我们区域

### 📦 产品中心
- 吹风机负离子发生器
- 空调负离子发生器
- 空气净化器负离子发生器
- 详细技术规格
- 应用领域介绍

### 🏢 关于我们
- 公司介绍
- 发展历程
- 生产设备
- 企业文化

### 🏆 资质认证
- 国际权威认证展示
- 质量标准介绍
- 认证流程说明

### 📞 联系我们
- 多种联系方式
- 在线留言表单
- 公司位置信息

## 设计特色

- **绿色主题**: 采用与公司logo一致的绿色主题色彩
- **响应式设计**: 完美适配桌面端和移动端
- **动画效果**: 丰富的滚动动画和交互效果
- **现代化UI**: 采用玻璃拟态和渐变设计
- **SEO优化**: 完整的SEO配置和结构化数据

## 开发指南

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本
```bash
npm run build
```

### 启动生产服务器
```bash
npm start
```

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── about/             # 关于我们页面
│   ├── certifications/    # 资质认证页面
│   ├── contact/           # 联系我们页面
│   ├── products/          # 产品中心页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── robots.ts          # robots.txt
│   └── sitemap.ts         # sitemap.xml
├── components/            # 组件目录
│   ├── sections/          # 页面区块组件
│   └── ui/                # 基础UI组件
└── lib/                   # 工具函数
```

## 部署说明

### Vercel 部署
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### 阿里云部署
1. 构建生产版本: `npm run build`
2. 上传 `.next` 文件夹和相关文件到服务器
3. 安装 PM2: `npm install -g pm2`
4. 启动应用: `pm2 start npm --name "gelin-tim-website" -- start`

## 维护说明

- 定期更新依赖包
- 监控网站性能
- 备份重要数据
- 更新公司信息和产品资料

## 联系信息

- **公司**: 苏州歌林蒂姆电子科技有限公司
- **电话**: +86-512-66539481
- **邮箱**: info@gelintime.com
- **地址**: 苏州市吴中区

---

© 2024 苏州歌林蒂姆电子科技有限公司. 保留所有权利.
