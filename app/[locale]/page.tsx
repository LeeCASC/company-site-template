
import {useTranslations} from 'next-intl';
import {siteConfig} from '@/lib/site';
import {Link} from '@/i18n/routing';

function Kicker({children}:{children:React.ReactNode}) { return <p className="section-kicker">{children}</p>; }

export default function Home({params:{locale}}:{params:{locale:string}}) {
  const t = useTranslations('home');
  const n = useTranslations('nav');
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/wintex/hero.jpg" alt="Hero" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>
        <div className="relative container pt-28 pb-16 md:pt-40 md:pb-28 text-white">
          <Kicker>{t('kicker')}</Kicker>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">{t('heroTitle')}</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/90">{t('heroDesc')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#contact" locale={locale} className="btn btn-primary">{t('ctaPlan')}</Link>
            <Link href="/#cases" locale={locale} className="btn border-white/30 text-white hover:shadow">{t('ctaCases')}</Link>
          </div>
        </div>
      </section>

      <section id="mission" className="container py-16 md:py-20">
        <Kicker>{t('missionTitle')}</Kicker>
        <div className="grid grid-2 mt-4">
          <div className="block block-brand">
            <h2 className="text-2xl font-semibold mb-2">{n('mission')}</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {t<string[]>('missionBullets').map((s,i)=>(<li key={i}>{s}</li>))}
            </ul>
          </div>
          <div className="block block-neutral">
            <h3 className="font-semibold mb-1">{n('contact')}</h3>
            <ul className="text-gray-700">
              <li>📞 {siteConfig.contact.phone}</li>
              <li>✉️ {siteConfig.contact.email}</li>
              <li>📍 {siteConfig.contact.address}</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="cases" className="container py-16 md:py-20">
        <Kicker>{t('casesTitle')}</Kicker>
        <div className="grid grid-3 mt-4">
          {t<any[]>('cases').map((c,i)=>(
            <article key={i} className="card overflow-hidden">
              <img src={`/wintex/case${i+1}.jpg`} alt={c.title} className="h-48 w-full object-cover hidden sm:block" onError={(e)=>((e.target as HTMLImageElement).style.display='none')} />
              <div className="card-body">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-gray-600">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="equipment" className="container py-16 md:py-20">
        <Kicker>{t('equipTitle')}</Kicker>
        <div className="grid grid-3 mt-4">
          {t<any[]>('equip').map((e,i)=>(
            <article key={i} className="card overflow-hidden">
              <img src={`/wintex/equip${i+1}.jpg`} alt={e.t} className="h-44 w-full object-cover hidden sm:block" onError={(e)=>((e.target as HTMLImageElement).style.display='none')} />
              <div className="card-body">
                <h3 className="font-semibold">{e.t}</h3>
                <p className="text-gray-600">{e.d}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="container pb-20">
        <div className="card">
          <div className="card-body flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <Kicker>{t('ctaTitle')}</Kicker>
              <p className="text-gray-600 mt-2">{t('ctaDesc')}</p>
              <ul className="mt-3 text-gray-700">
                <li>📞 {siteConfig.contact.phone}</li>
                <li>✉️ {siteConfig.contact.email}</li>
                <li>📍 {siteConfig.contact.address}</li>
              </ul>
            </div>
            <Link href="/careers" locale={locale} className="btn btn-primary">{n('careers')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
