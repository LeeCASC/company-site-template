import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 若本地使用 --turbo，保留空对象可避免某些解析问题
  turbopack: {}
};

export default withNextIntl(nextConfig);