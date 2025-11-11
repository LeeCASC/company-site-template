import '../globals.css';
import type {Metadata} from 'next';
import {NextIntlClientProvider, useTranslations, useLocale} from 'next-intl';
import {siteConfig} from '@/lib/site';
import Link from 'next/link';
import type {Locale} from '@/i18n/routing';
import LocaleSwitcher from '@/components/LocaleSwitcher';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {default: siteConfig.name, template: `%s · ${siteConfig.name}`},
  description: siteConfig.description
};

function Navigation() {
  const n = useTranslations('nav');
  const locale = useLocale();
  
  return (
    <nav className="hidden md:flex items-center gap-5 text-[13px] font-medium text-gray-800">
      <Link href={`/${locale}#about`} className="hover:text-gray-600">{n('About Us')}</Link>
      <Link href={`/${locale}#mission`} className="hover:text-gray-600">{n('mission')}</Link>
      <Link href={`/${locale}#news`} className="hover:text-gray-600">{n('news')}</Link>
      <Link href={`/${locale}#equipment`} className="hover:text-gray-600">{n('equipment')}</Link>
      <a href={`/careers.html?lang=${locale}`} className="hover:text-gray-600">{n('careers')}</a>
      <Link href={`/${locale}#contact`} className="hover:text-gray-600">{n('contact')}</Link>
      <div className="ml-2">
        <LocaleSwitcher />
      </div>
    </nav>
  );
}

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
        {/* Top white header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
          <div className="mx-auto max-w-[1200px] px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img src="/images/wintex-logo.png" alt={siteConfig.name} className="h-8 w-auto" />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
            <Navigation />
          </div>
        </header>
        {/* spacer to avoid cover by fixed header */}
        <div className="h-14"></div>
<NextIntlClientProvider locale={currentLocale} messages={messages}>
          <main className="min-h-dvh">{children}</main>
        </NextIntlClientProvider>

        <footer className="border-t mt-16 bg-gray-50">
          <div className="container py-10 text-sm text-gray-600 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-gray-700">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Terms of Service</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
