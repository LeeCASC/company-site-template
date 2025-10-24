
'use client';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
export default function LocaleSwitcher() {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-2">
      <Link href={`/zh${pathname}`} className="btn">CN</Link>
      <Link href={`/en${pathname}`} className="btn">EN</Link>
    </div>
  );
}
