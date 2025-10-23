import '../globals.css';
import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {siteConfig} from '@/lib/site';
import {Link, Locale} from '@/i18n/routing';  // ✅ 导入 Locale
import LocaleSwitcher from '@/components/LocaleSwitcher';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {default: siteConfig.name, template: `%s · ${siteConfig.name}`},
  description: siteConfig.description
};

export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const currentLocale = locale as Locale;  // ✅ 关键修改
  const messages = (await import(`../../messages/${currentLocale}.json`)).default;

  return (
    <html lang={currentLocale}>
      <body>
        <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" locale={currentLocale} className="flex items-center gap-3">
              <img src="/logo.png" alt={siteConfig.name} className="logo" />
              <span className="font-semibold">{siteConfig.name}</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/#mission" locale={currentLocale} className="navlink">{'nav.mission'}</Link>
              <Link href="/#cases" locale={currentLocale} className="navlink">{'nav.cases'}</Link>
              <Link href="/#equipment" locale={currentLocale} className="navlink">{'nav.equipment'}</Link>
              <Link href="/news" locale={currentLocale} className="navlink">{'nav.news'}</Link>
              <Link href="/careers" locale={currentLocale} className="navlink">{'nav.careers'}</Link>
              <Link href="/#contact" locale={currentLocale} className="navlink">{'nav.contact'}</Link>
              <LocaleSwitcher />
            </nav>
          </div>
        </header>

        <NextIntlClientProvider locale={currentLocale} messages={messages}>
          <main>{children}</main>
        </NextIntlClientProvider>

        <footer className="border-t mt-16">
          <div className="container py-10 text-sm text-gray-600 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p>© {new Date().getFullYear()} {siteConfig.name}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
