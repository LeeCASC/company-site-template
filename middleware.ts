// middleware.ts
import './i18n/request'; // ✅ 强制让 Next 收集到该文件

import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/', '/(zh|en)/:path*']
};
