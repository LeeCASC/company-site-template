'use client';

import {useTranslations} from 'next-intl';
import Link from 'next/link';
import type {Locale} from '@/i18n/routing';
import {siteConfig} from '@/lib/site';

function Kicker({children}:{children:React.ReactNode}) {
  return <p className="section-kicker">{children}</p>;
}

type CaseItem = { title: string; desc: string };
type EquipItem = { t: string; d: string };

export default function Home({params:{locale}}:{params:{locale:string}}) {
  const currentLocale = (locale as Locale) ?? 'zh';

  const t = useTranslations('home');
  const n = useTranslations('nav');

  return (
    <>
      {/* 固定白底导航 */}
      {/* 占位：避免内容被 fixed 头部遮住 */}
      {/* FULL-BLEED HERO：不受 container 限制，强制全屏宽 */}
      <section
        className="
          relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen
          h-[80vh] md:h-[85vh] lg:h-[90vh] overflow-hidden flex items-center
        "
      >
        <img
          src="/wintex/hero.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        </section>

      {/* 公司简介 */}
      <section id="about" className="container py-16 md:py-20">
        <h2 className="section-title">{t('heroTitle')}</h2>
        <div className="space-y-4 text-lg text-gray-700 mb-8">
          <p className="whitespace-pre-line">{t('heroDesc')}</p>
        </div>
        <Link href="/#mission" className="btn btn-primary">{t('ctaPlan')}</Link>
      </section>

      {/* 我们的使命 */}
      <section id="mission" className="container py-16 md:py-20">
        <h2 className="section-title">{t('missionTitle')}</h2>
        <div className="grid grid-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed">
                {t('missionDesc1')}
              </p>
              <p className="text-lg leading-relaxed">
                {t('missionDesc2')}
              </p>
            </div>
            <Link href="/#cases" className="btn btn-primary">{t('missionButton')}</Link>
          </div>
          <div className="image-container">
            <img
              src="/wintex/case1.jpg"
              alt="Our Mission"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* 案例 */}
      <section id="cases" className="container py-16 md:py-20">
        <h2 className="section-title">{t('casesTitle')}</h2>
        <div className="grid grid-2 gap-8">
          <article className="card overflow-hidden fade-in-up">
            <div className="image-container">
              <img
                src="/wintex/case2.jpg"
                alt="Alabat Wind Power Project"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="card-body">
              <h3 className="font-semibold text-lg mb-2">{t('case1Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('case1Desc')}
              </p>
            </div>
          </article>
          <article className="card overflow-hidden fade-in-up">
            <div className="image-container">
              <img
                src="/wintex/case3.jpg"
                alt="Tanay Wind Power Project"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="card-body">
              <h3 className="font-semibold text-lg mb-2">{t('case2Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('case2Desc')}
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* 装备 */}
      <section id="equipment" className="container py-16 md:py-20">
        <h2 className="section-title">{t('equipmentTitle')}</h2>
        <div className="grid grid-2 gap-8">
          <article className="card overflow-hidden fade-in-up">
            <div className="image-container">
              <img
                src="/wintex/equip1.jpg"
                alt="Stacking"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="card-body">
              <h3 className="font-semibold text-lg mb-2">{t('equip1Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('equip1Desc')}
              </p>
            </div>
          </article>
          <article className="card overflow-hidden fade-in-up">
            <div className="image-container">
              <img
                src="/wintex/equip2.jpg"
                alt="Transportation"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="card-body">
              <h3 className="font-semibold text-lg mb-2">{t('equip2Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('equip2Desc')}
              </p>
            </div>
          </article>
        </div>
        <div className="mt-8">
          <Link href="/#equipment" className="btn btn-primary">{t('equipmentButton')}</Link>
        </div>
      </section>

      {/* 新闻 */}
      <section id="news" className="container py-16 md:py-20">
        <h2 className="section-title">{t('newsTitle')}</h2>
        <div className="grid grid-3 gap-6">
          <div className="testimonial-card">
            <p className="text-gray-700 mb-4">{t('testimonial1')}</p>
            <div className="flex items-center gap-3">
              <div className="avatar bg-red-500">N</div>
              <div>
                <div className="font-semibold">Name</div>
                <div className="text-sm text-gray-600">Description</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="text-gray-700 mb-4">{t('testimonial2')}</p>
            <div className="flex items-center gap-3">
              <div className="avatar bg-green-500">N</div>
              <div>
                <div className="font-semibold">Name</div>
                <div className="text-sm text-gray-600">Description</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="text-gray-700 mb-4">{t('testimonial3')}</p>
            <div className="flex items-center gap-3">
              <div className="avatar bg-blue-500">N</div>
              <div>
                <div className="font-semibold">Name</div>
                <div className="text-sm text-gray-600">Description</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 加入我们 */}
      <section id="join" className="container py-16 md:py-20">
        <div className="flex justify-between items-center">
          <h2 className="section-title mb-0">{t('joinTitle')}</h2>
          <a href={`/careers.html?lang=${currentLocale}`} className="btn btn-primary">{t('joinButton')}</a>
        </div>
      </section>

      {/* 联系我们 */}
      <section id="contact" className="container py-16 md:py-20">
        <div className="grid grid-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t('contactTitle')}</h3>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
                <span className="text-xs">f</span>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
                <span className="text-xs">in</span>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
                <span className="text-xs">yt</span>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
                <span className="text-xs">@</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t('contactUsTitle')}</h3>
            <div className="space-y-2 text-gray-700">
              <div>{t('contactTel')}</div>
              <div>{t('contactEmail')}</div>
              <div>{t('contactAddress')}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}