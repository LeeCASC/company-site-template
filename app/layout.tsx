// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s · ${siteConfig.name}` },
  description: siteConfig.description
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        {/* 头部：改为首页锚点导航 */}
        <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt={siteConfig.name} className="logo" />
              <span className="font-semibold">{siteConfig.name}</span>
            </Link>

            <nav className="hidden md:flex gap-6">
              {/* 下面这些用锚点直接跳到首页对应版块 */}
              <a href="/#mission" className="navlink">使命</a>
              <a href="/#proof" className="navlink">实践</a>
              <a href="/#focus" className="navlink">项目聚焦</a>
              <a href="/#equipment" className="navlink">装备实力</a>
              <a href="/#onsite" className="navlink">现场执行</a>
              {/* 仍然是独立页面的用 Link */}
              <Link href="/news" className="navlink">新闻</Link>
              <Link href="/careers" className="navlink">加入我们</Link>
              {/* 联系：跳到首页底部联系区块 */}
              <a href="/#contact" className="navlink">联系</a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        {/* 底部保持不变 */}
        <footer className="border-t mt-16">
          <div className="container py-10 text-sm text-gray-600 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p>© {new Date().getFullYear()} {siteConfig.name}</p>
            <nav className="flex gap-6">
              <Link className="navlink" href="/legal">隐私与条款</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
