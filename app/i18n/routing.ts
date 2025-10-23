
import {createSharedPathnamesNavigation} from 'next-intl/navigation';
export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];
export const localePrefix = 'always';
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales, localePrefix});
