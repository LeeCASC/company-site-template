// middleware.ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 排除 studio、api、静态文件等路径
  matcher: ['/', '/(zh|en)/:path*', '/((?!api|_next|_vercel|studio|.*\\..*).*)']
};
