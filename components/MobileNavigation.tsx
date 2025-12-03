'use client';

import {useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import Link from 'next/link';
import LocaleSwitcher from '@/components/LocaleSwitcher';

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const n = useTranslations('nav');
  const locale = useLocale();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* 汉堡菜单按钮 - 只在移动端显示 */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* 遮罩层 - 点击关闭菜单 */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-20 z-30"
          onClick={closeMenu}
          style={{ top: '80px' }}
        />
      )}

      {/* 移动端导航菜单 */}
      <div
        className={`md:hidden fixed top-20 left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out z-40 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col py-4 px-4 space-y-4">
          <Link
            href={`/${locale}/about`}
            onClick={closeMenu}
            className="text-[13px] font-medium text-gray-800 hover:text-gray-600 py-2 border-b border-gray-100"
          >
            {n('About Us')}
          </Link>
          <Link
            href={`/${locale}/mission`}
            onClick={closeMenu}
            className="text-[13px] font-medium text-gray-800 hover:text-gray-600 py-2 border-b border-gray-100"
          >
            {n('mission')}
          </Link>
          <Link
            href={`/${locale}/news`}
            onClick={closeMenu}
            className="text-[13px] font-medium text-gray-800 hover:text-gray-600 py-2 border-b border-gray-100"
          >
            {n('news')}
          </Link>
          <Link
            href={`/${locale}/equipment`}
            onClick={closeMenu}
            className="text-[13px] font-medium text-gray-800 hover:text-gray-600 py-2 border-b border-gray-100"
          >
            {n('equipment')}
          </Link>
          <a
            href={`/careers.html?lang=${locale}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="text-[13px] font-medium text-gray-800 hover:text-gray-600 py-2 border-b border-gray-100"
          >
            {n('careers')}
          </a>
          <Link
            href={`/${locale}#contact`}
            onClick={closeMenu}
            className="text-[13px] font-medium text-gray-800 hover:text-gray-600 py-2 border-b border-gray-100"
          >
            {n('contact')}
          </Link>
          <div className="pt-2 border-t border-gray-200">
            <LocaleSwitcher />
          </div>
        </nav>
      </div>
    </>
  );
}

