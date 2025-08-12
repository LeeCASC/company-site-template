
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
        <header className="border-b bg-white/70 backdrop-blur">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt={siteConfig.name} className="logo" />
              <span className="font-semibold">{siteConfig.name}</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/about" className="navlink">关于</Link>
              <Link href="/solutions" className="navlink">解决方案</Link>
              <Link href="/products" className="navlink">产品与服务</Link>
              <Link href="/cases" className="navlink">客户案例</Link>
              <Link href="/pricing" className="navlink">价格</Link>
              <Link href="/news" className="navlink">新闻</Link>
              <Link href="/careers" className="navlink">加入我们</Link>
              <Link href="/contact" className="navlink">联系</Link>
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
