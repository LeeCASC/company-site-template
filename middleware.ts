
import createMiddleware from 'next-intl/middleware';
import {locales, localePrefix} from './i18n/routing';
export default createMiddleware({ locales, defaultLocale: 'zh', localePrefix });
export const config = { matcher: ['/', '/(zh|en)/:path*'] };
