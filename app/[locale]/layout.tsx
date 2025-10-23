
import '../globals.css';
import type {Metadata} from 'next';
import getRequestConfig from '@/i18n/request';
import {siteConfig} from '@/lib/site';
import {Link} from '@/i18n/routing';
import LocaleSwitcher from '@/components/LocaleSwitcher';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {default: siteConfig.name, template: `%s · ${siteConfig.name}`},
  description: siteConfig.description
};

export default async function RootLayout({ children, params: {locale} }:{ children: React.ReactNode; params: {locale: string} }) {
  await getRequestConfig({locale});
  return (
    <html lang={locale}>
      <body>
        <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" locale={locale} className="flex items-center gap-3">
              <img src="/logo.png" alt={siteConfig.name} className="logo" />
              <span className="font-semibold">{siteConfig.name}</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/#mission" locale={locale} className="navlink">{'nav.mission'}</Link>
              <Link href="/#cases" locale={locale} className="navlink">{'nav.cases'}</Link>
              <Link href="/#equipment" locale={locale} className="navlink">{'nav.equipment'}</Link>
              <Link href="/news" locale={locale} className="navlink">{'nav.news'}</Link>
              <Link href="/careers" locale={locale} className="navlink">{'nav.careers'}</Link>
              <Link href="/#contact" locale={locale} className="navlink">{'nav.contact'}</Link>
              <LocaleSwitcher />
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
