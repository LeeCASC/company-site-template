import "./globals.css";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import Link from "next/link";
import LanguageSwitch from "@/components/LanguageSwitch";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s · ${siteConfig.name}` },
  description: siteConfig.description
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt={siteConfig.name} className="logo" />
              <span className="font-semibold">{siteConfig.name}</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/#mission" className="navlink">企业愿景</a>
              <a href="/#cases" className="navlink">成功案例</a>
              <a href="/#equipment" className="navlink">装备实力</a>
              <Link href="/news" className="navlink">新闻</Link>
              <Link href="/careers" className="navlink">招贤纳士</Link>
              <a href="/#contact" className="navlink">联系我们</a>
              <LanguageSwitch />
            </nav>
          </div>
        </header>
        <main>{children}</main>
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