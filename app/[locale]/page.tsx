'use client';

import {useTranslations} from 'next-intl';
import Link from 'next/link';
import type {Locale} from '@/i18n/routing';

export default function Home({params:{locale}}:{params:{locale:string}}) {
  const currentLocale = (locale as Locale) ?? 'zh';
  const t = useTranslations('home');

  return (
    <>
      {/* Hero Section - 全屏大图 */}
      <section className="relative w-full h-[90vh] overflow-hidden flex items-center justify-center">
        <img
          src="/images/hero.png"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-hero text-white mb-4">{t('heroTitle')}</h1>
          <p className="text-hero-sub text-brand-accent">{t('heroSubtitle')}</p>
        </div>
      </section>

      {/* 深蓝色统计区域 - 企业愿景 */}
      <section id="mission" className="bg-brand-primary text-white py-20 scroll-mt-14">
        <div className="container max-w-[1287px] mx-auto px-[80px] pr-[73px]">
          <div className="flex items-center justify-between mb-12">
            {/* 左侧：25年运营经验 */}
            <div className="flex items-baseline gap-2">
              <span className="text-display-lg text-gray-100">{t('statsYears')}</span>
              <span className="text-display-md text-gray-100">{t('statsYearsText')}</span>
              <span className="text-[30px] leading-[35px] font-light text-gray-100">{t('statsExperience')}</span>
            </div>

            {/* 右侧：三个图标 */}
            <div className="flex gap-[28px]">
              <div className="flex flex-col items-center text-center">
                <div className="w-[198px] h-[190px] mb-4 flex items-center justify-center">
                  <img src="/icons/Anchor.svg" alt="Anchor" className="w-full h-full object-contain" />
                </div>
                <p className="text-[30px] leading-[35px] font-light text-gray-100">{t('icon1Title')}</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-[217px] h-[188px] mb-4 flex items-center justify-center">
                  <img src="/icons/Feather.svg" alt="Feather" className="w-full h-full object-contain" />
                </div>
                <p className="text-[30px] leading-[35px] font-light text-gray-100">{t('icon2Title')}</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-[198px] h-[190px] mb-4 flex items-center justify-center">
                  <img src="/icons/Box.svg" alt="Box" className="w-full h-full object-contain" />
                </div>
                <p className="text-[30px] leading-[35px] font-light text-gray-100">{t('icon3Title')}</p>
              </div>
            </div>
          </div>

          {/* 世界地图 */}
          <div className="w-full h-[342px] flex items-center justify-center">
            <img
              src="/images/image_1.png"
              alt="World Map"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* 白色介绍区域 - 关于我们 */}
      <section id="about" className="bg-white py-20 scroll-mt-14">
        <div className="container max-w-[1287px] mx-auto px-[80px] pr-[73px]">
          <div className="flex gap-[60px] items-center">
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
      </section>

      {/* 新闻区域 */}
      <section id="news" className="bg-white py-20 scroll-mt-14">
        <div className="container max-w-[1440px] mx-auto px-[80px] pr-[73px]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-section-title text-brand-primary">{t('newsTitle')}</h2>
            <Link href={`/${currentLocale}#news`} className="text-small text-brand-primary">{t('allNews')}</Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
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
      <section id="strength" className="bg-white py-20 scroll-mt-14">
        <div className="container max-w-[1440px] mx-auto px-[80px] pr-[73px]">
          <div className="flex gap-[60px] items-center">
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
      </section>

      {/* 设备清单区域 - 橙色背景 - 装备实力 */}
      <section id="equipment" className="bg-brand-accent py-20 scroll-mt-14">
        <div className="container max-w-[1440px] mx-auto px-[80px] pr-[73px]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-section-title text-white">{t('equipmentListTitle')}</h2>
            <Link href={`/${currentLocale}#equipment`} className="inline-flex items-center justify-center bg-white text-brand-primary hover:bg-gray-100 rounded-button px-6 py-3 text-button font-medium transition-colors">{t('readMore')}</Link>
          </div>
          <div className="grid grid-cols-4 gap-6">
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
      </section>

      {/* Footer - 联系信息 */}
      <footer id="contact" className="bg-gray-50 py-20 scroll-mt-14">
        <div className="container max-w-[1440px] mx-auto px-[80px] pr-[73px]">
          <div className="grid grid-cols-2 gap-12 mb-8">
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
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-small text-gray-500">{t('copyright')}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
