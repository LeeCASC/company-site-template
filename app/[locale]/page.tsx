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
      <section className="relative overflow-hidden h-[50vh] md:h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img src="/wintex/hero.jpg" alt="Hero" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>
        <div className="relative container py-16 md:py-20 text-white">
          <div className="max-w-3xl">
            <Kicker>{t('kicker')}</Kicker>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">{t('heroTitle')}</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90 leading-relaxed">{t('heroDesc')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/#contact" className="btn btn-primary">{t('ctaPlan')}</Link>
              <Link href="/#cases" className="btn border-white/30 text-white hover:bg-white/10">{t('ctaCases')}</Link>
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
        <div className="grid grid-3 mt-8">
          {cases.map((c,i)=>(
            <article key={i} className="card overflow-hidden fade-in-up">
              <div className="image-container h-48">
                <img
                  src={`/wintex/case${i+1}.jpg`}
                  alt={c.title}
                  className="h-full w-full object-cover object-center"
                  onError={(e)=>((e.target as HTMLImageElement).style.display='none')}
                />
              </div>
              <div className="card-body">
                <h3 className="font-semibold text-lg mb-3">{c.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 装备实力 */}
      <section id="equipment" className="container py-16 md:py-20">
        <Kicker>{t('equipTitle')}</Kicker>
        <div className="grid grid-3 mt-8">
          {equip.map((e,i)=>(
            <article key={i} className="card overflow-hidden fade-in-up">
              <div className="image-container h-48">
                <img
                  src={`/wintex/equip${i+1}.jpg`}
                  alt={e.t}
                  className="h-full w-full object-cover object-center"
                  onError={(img)=>((img.target as HTMLImageElement).style.display='none')}
                />
              </div>
              <div className="card-body">
                <h3 className="font-semibold text-lg mb-3">{e.t}</h3>
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
