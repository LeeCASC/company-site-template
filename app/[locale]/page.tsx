'use client';

import {useTranslations} from 'next-intl';
import Link from 'next/link';
import type {Locale} from '@/i18n/routing';

export default function Home({params:{locale}}:{params:{locale:string}}) {
  const currentLocale = (locale as Locale) ?? 'zh';
  const t = useTranslations('home');

  return (
    <>
      {/* Hero Section - 响应式大图 */}
      <section className="relative w-full overflow-hidden flex items-center justify-center py-4 sm:py-8 md:py-12 lg:py-16">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[80px] relative w-full">
          {/* 使用与深蓝色区域相同的宽度，保持比例 - 移动端使用 100% 宽度 */}
          <div className="w-full max-w-[1287px] mx-auto relative" style={{ aspectRatio: '1287/648' }}>
            <img
              src="/images/hero.png"
              alt="Hero"
              className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
            />
            <div className="relative z-10 text-center h-full flex flex-col items-center justify-center px-4">
              <h1 className="text-hero text-white mb-2 sm:mb-4">{t('heroTitle')}</h1>
              <p className="text-hero-sub text-brand-accent">{t('heroSubtitle')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 深蓝色统计区域 - 企业愿景 */}
      <section id="mission" className="bg-brand-primary text-white py-8 sm:py-12 md:py-20 scroll-mt-20">
        {/* 使用与 Hero 相同的容器和间距，确保左右边界距离一致 */}
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[80px] relative w-full">
          {/* 使用与 Hero 相同的宽度，保持比例 1287/939 - 移动端使用 100% 宽度 */}
          <div className="w-full max-w-[1287px] mx-auto relative" style={{ aspectRatio: '1287/939' }}>
            <div className="absolute inset-0 bg-brand-primary rounded-lg"></div>
            <div className="relative z-10 h-full flex flex-col px-4 sm:px-6 md:px-12 lg:px-[80px] pr-4 sm:pr-6 md:pr-12 lg:pr-[73px] py-6 sm:py-8 md:py-12 lg:py-[80px]">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 sm:mb-8 md:mb-12 gap-6 sm:gap-8 flex-1">
                {/* 左侧：25年运营经验 - 换行显示 */}
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="text-display-lg text-gray-100">{t('statsYears')}</span>
                    <span className="text-display-md text-gray-100">{t('statsYearsText')}</span>
                  </div>
                  <span className="text-[clamp(16px,2.5vw,30px)] leading-[clamp(20px,2.8vw,35px)] font-light text-gray-100 mt-2">{t('statsExperience')}</span>
                </div>

                {/* 右侧：三个图标 - 等比例缩放 */}
                <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-[28px] justify-center lg:justify-end w-full lg:w-auto">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-[clamp(80px,20vw,198px)] h-[clamp(76px,19vw,190px)] mb-2 sm:mb-4 flex items-center justify-center">
                      <img src="/icons/Anchor.svg" alt="Anchor" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-[clamp(14px,2.5vw,30px)] leading-[clamp(18px,2.8vw,35px)] font-light text-gray-100">{t('icon1Title')}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-[clamp(80px,22vw,217px)] h-[clamp(76px,19vw,188px)] mb-2 sm:mb-4 flex items-center justify-center">
                    <img src="/icons/Feather.svg" alt="Feather" className="w-full h-full object-contain" />
                  </div>
                    <p className="text-[clamp(14px,2.5vw,30px)] leading-[clamp(18px,2.8vw,35px)] font-light text-gray-100">{t('icon2Title')}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-[clamp(80px,20vw,198px)] h-[clamp(76px,19vw,190px)] mb-2 sm:mb-4 flex items-center justify-center">
                    <img src="/icons/Box.svg" alt="Box" className="w-full h-full object-contain" />
                  </div>
                    <p className="text-[clamp(14px,2.5vw,30px)] leading-[clamp(18px,2.8vw,35px)] font-light text-gray-100">{t('icon3Title')}</p>
                  </div>
                </div>
              </div>

              {/* 世界地图 - 相对于容器等比例缩放，保持 1077/673 比例 */}
              <div className="relative mt-auto mx-auto w-full" style={{ aspectRatio: '1077/673', maxWidth: '1077px' }}>
                <img
                  src="/images/image_1.png"
                  alt="World Map"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 白色介绍区域 - 关于我们 */}
      <section id="about" className="bg-white py-8 sm:py-12 md:py-20 scroll-mt-20">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[80px]">
          <div className="max-w-[1287px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[80px] pr-4 sm:pr-6 md:pr-12 lg:pr-[73px]">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-[60px] items-center">
            {/* 左侧：文字内容 */}
            <div className="flex-1">
              <h2 className="text-section-title text-brand-primary mb-4">{t('introTitle')}</h2>
              <p className="text-subtitle text-brand-accent mb-6">{t('introSubtitle')}</p>
              <p className="text-body text-gray-400 mb-8">{t('introDesc')}</p>
              <Link href={`/${currentLocale}#about`} className="btn btn-primary">{t('ctaPlan')}</Link>
            </div>

            {/* 右侧：图片 */}
            <div className="flex-1">
              <img
                src="/images/introduction.png"
                alt="Introduction"
                className="w-full h-auto rounded-lg"
              />
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* 新闻区域 */}
      <section id="news" className="bg-white py-8 sm:py-12 md:py-20 scroll-mt-20">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[80px] pr-4 sm:pr-6 md:pr-8 lg:pr-[73px]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-section-title text-brand-primary">{t('newsTitle')}</h2>
            <Link 
              href={`/${currentLocale}#news`} 
              className="inline-flex items-center justify-center bg-gray-50 text-brand-primary hover:bg-gray-100 rounded-button px-6 py-3 text-button font-medium transition-colors shadow-button"
            >
              {t('allNews')}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { img: '/images/news_1.png', title: 'News 1' },
              { img: '/images/news_2.png', title: 'News 2' },
              { img: '/images/news_3.png', title: 'News 3' },
            ].map((news, i) => (
              <div
                key={i}
                className="rounded-card bg-brand-accent-50 p-[13px]"
                style={{ aspectRatio: '27/13' }}
              >
                <img
                  src={news.img}
                  alt={news.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <p className="text-body-sm text-gray-500 mt-4 line-clamp-2">{t('newsCardText')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 实力见证区域 */}
      <section id="strength" className="bg-white py-8 sm:py-12 md:py-20 scroll-mt-20">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[80px] pr-4 sm:pr-6 md:pr-8 lg:pr-[73px]">
          <div className="max-w-[1287px] mx-auto">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-[60px] items-center">
            {/* 左侧：图片 */}
            <div className="flex-1">
              <img
                src="/images/strength.png"
                alt="Proof of Strength"
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* 右侧：文字内容 */}
            <div className="flex-1">
              <h2 className="text-section-title text-brand-primary mb-4">{t('strengthTitle')}</h2>
              <p className="text-subtitle text-brand-accent mb-6">{t('strengthSubtitle')}</p>
              <p className="text-body text-gray-400 mb-8">{t('strengthDesc')}</p>
              <Link href={`/${currentLocale}#strength`} className="btn btn-primary">{t('readMore')}</Link>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* 设备清单区域 - 橙色背景 - 装备实力 */}
      <section id="equipment" className="bg-brand-accent py-8 sm:py-12 md:py-20 scroll-mt-20">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[80px] pr-4 sm:pr-6 md:pr-8 lg:pr-[73px]">
          <div className="max-w-[1287px] mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
              <h2 className="text-section-title text-white">{t('equipmentListTitle')}</h2>
              <Link href={`/${currentLocale}#equipment`} className="inline-flex items-center justify-center bg-white text-brand-primary hover:bg-gray-100 rounded-button px-4 sm:px-6 py-2 sm:py-3 text-button font-medium transition-colors">{t('readMore')}</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { img: '/images/equipment_1.png', name: t('equip1Name') },
              { img: '/images/equipment_2.png', name: t('equip2Name') },
              { img: '/images/equipment_3.png', name: t('equip3Name') },
              { img: '/images/equipment_4.png', name: t('equip4Name') },
            ].map((equip, i) => (
              <div
                key={i}
                className="bg-white rounded-lg overflow-hidden"
              >
                <div className="aspect-square">
                  <img
                    src={equip.img}
                    alt={equip.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-button text-brand-primary text-center py-4">{equip.name}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer - 联系信息 */}
      <footer id="contact" className="bg-gray-50 py-8 sm:py-12 md:py-20 scroll-mt-20">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[80px] pr-4 sm:pr-6 md:pr-8 lg:pr-[73px]">
          <div className="max-w-[1287px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-6 sm:mb-8">
            {/* 左侧：联系我们 */}
            <div>
              <h3 className="text-section-title text-brand-primary mb-6">{t('contactUsTitle')}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img src="/icons/Phone.svg" alt="Phone" className="w-[30px] h-[30px]" />
                  <span className="text-body text-gray-500">{t('contactTel')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src="/icons/Mail.svg" alt="Mail" className="w-[30px] h-[30px]" />
                  <span className="text-body text-gray-500">{t('contactEmail')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src="/icons/Map pin.svg" alt="Map pin" className="w-[30px] h-[30px]" />
                  <span className="text-body text-gray-500">{t('contactAddress')}</span>
                </div>
              </div>
            </div>
            </div>
            <div className="text-center pt-6 sm:pt-8 border-t border-gray-200">
              <p className="text-small text-gray-500">{t('copyright')}</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
