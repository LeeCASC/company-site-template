
'use client';
import {usePathname} from '@/i18n/routing';
import {Link} from '@/i18n/routing';
export default function LocaleSwitcher() {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-2">
      <Link href={pathname} locale="zh" className="btn">CN</Link>
      <Link href={pathname} locale="en" className="btn">EN</Link>
    </div>
  );
}
