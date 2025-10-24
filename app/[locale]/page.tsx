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
  const currentLocale = (locale as Locale) ?? 'zh';   // ✅ 收窄

  const t = useTranslations('home');
  const n = useTranslations('nav');

  const missionBullets = t.raw('missionBullets') as string[];
  const cases = t.raw('cases') as CaseItem[];
  const equip = t.raw('equip') as EquipItem[];

  return (
    <>
      {/* HERO：封面大图 */}
      <section className="relative overflow-hidden h-[60vh] md:h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img src="/wintex/hero.jpg" alt="Hero" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        </div>
        
        {/* 企业图标和名称 - 左上角 */}
        <div className="absolute top-6 left-6 z-10">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt={siteConfig.name} className="h-10 w-auto" />
            <span className="text-white text-xl font-bold">{siteConfig.name}</span>
          </div>
        </div>

        {/* 导航菜单 - 右上角 */}
        <div className="absolute top-6 right-6 z-10">
          <nav className="hero-nav flex items-center gap-4 text-white">
            <Link href="/#mission" className="navlink text-sm font-medium hover:text-brand">关于我们</Link>
            <Link href="/#mission" className="navlink text-sm font-medium hover:text-brand">企业愿景</Link>
            <Link href="/#cases" className="navlink text-sm font-medium hover:text-brand">成功案例</Link>
            <Link href="/#equipment" className="navlink text-sm font-medium hover:text-brand">装备实力</Link>
            <Link href="/news" className="navlink text-sm font-medium hover:text-brand">新闻</Link>
            <Link href="/careers" className="navlink text-sm font-medium hover:text-brand">招贤纳士</Link>
            <Link href="/#contact" className="navlink text-sm font-medium hover:text-brand">联系我们</Link>
            <div className="flex items-center gap-2 ml-4">
              <button className="text-white text-sm font-medium hover:text-brand">CN</button>
              <span className="text-white/50">|</span>
              <button className="text-white text-sm font-medium hover:text-brand">EN</button>
            </div>
          </nav>
        </div>

        {/* 企业愿景内容 - 左侧 */}
        <div className="relative container py-20 md:py-32 text-white">
          <div className="max-w-2xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <Kicker>{t('kicker')}</Kicker>
              <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">{t('heroTitle')}</h1>
              <p className="mt-4 max-w-xl text-lg text-white/90 leading-relaxed">{t('heroDesc')}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/#contact" className="btn btn-primary">{t('ctaPlan')}</Link>
                <Link href="/#cases" className="btn border-white/30 text-white hover:bg-white/10">{t('ctaCases')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 企业愿景 */}
      <section id="mission" className="container py-20 md:py-24">
        <Kicker>{t('missionTitle')}</Kicker>
        <div className="grid grid-2 mt-8">
          <div className="block block-brand">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{n('mission')}</h2>
            <ul className="space-y-3 text-gray-700">
              {missionBullets.map((s,i)=>(
                <li key={i} className="flex items-start gap-3">
                  <span className="text-brand text-xl mt-1">•</span>
                  <span className="text-lg leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="block block-neutral">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">{n('contact')}</h3>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <span className="text-lg">{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✉️</span>
                <span className="text-lg">{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-1">📍</span>
                <span className="text-lg leading-relaxed">{siteConfig.contact.address}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 成功案例 */}
      <section id="cases" className="container py-16 md:py-20">
        <Kicker>{t('casesTitle')}</Kicker>
        <div className="grid grid-cols-3 gap-6 mt-8">
          {cases.map((c,i)=>(
            <article key={i} className="card overflow-hidden fade-in-up">
              <div className="image-container h-40">
                <img
                  src={`/wintex/case${i+1}.jpg`}
                  alt={c.title}
                  className="h-full w-full object-cover object-center"
                  onError={(e)=>((e.target as HTMLImageElement).style.display='none')}
                />
              </div>
              <div className="card-body">
                <h3 className="font-semibold text-base mb-2">{c.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 装备实力 */}
      <section id="equipment" className="container py-16 md:py-20">
        <Kicker>{t('equipTitle')}</Kicker>
        <div className="grid grid-cols-3 gap-6 mt-8">
          {equip.map((e,i)=>(
            <article key={i} className="card overflow-hidden fade-in-up">
              <div className="image-container h-40">
                <img
                  src={`/wintex/equip${i+1}.jpg`}
                  alt={e.t}
                  className="h-full w-full object-cover object-center"
                  onError={(img)=>((img.target as HTMLImageElement).style.display='none')}
                />
              </div>
              <div className="card-body">
                <h3 className="font-semibold text-base mb-2">{e.t}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{e.d}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 联系我们 */}
      <section id="contact" className="container py-20 md:py-24">
        <div className="card max-w-6xl mx-auto">
          <div className="card-body flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1">
              <Kicker>{t('ctaTitle')}</Kicker>
              <h2 className="text-3xl font-bold mt-2 mb-4 text-gray-800">{t('ctaTitle')}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{t('ctaDesc')}</p>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📞</span>
                  <span className="text-lg font-medium">{siteConfig.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✉️</span>
                  <span className="text-lg font-medium">{siteConfig.contact.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-1">📍</span>
                  <span className="text-lg leading-relaxed">{siteConfig.contact.address}</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link href="/careers" className="btn btn-primary text-lg px-8 py-4">{n('careers')}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
