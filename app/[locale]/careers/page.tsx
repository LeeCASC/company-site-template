
import {useTranslations} from 'next-intl';

export default function Careers() {
  const t = useTranslations('careers');
  const openings = t<any[]>('openings');
  return (
    <div className="container py-16 md:py-20">
      <h1 className="text-3xl md:text-4xl font-semibold">{t('title')}</h1>
      <p className="mt-3 text-gray-700">{t('intro')}</p>
      <div className="grid grid-3 mt-8">
        {openings.map((job, i) => (
          <article key={i} className="card">
            <div className="card-body">
              <h3 className="font-semibold">{job.t}</h3>
              <p className="text-gray-600">{job.l}</p>
              <p className="text-gray-700 mt-2">{job.r}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="card mt-10">
        <div className="card-body">
          <p>{t('howto')} <a href={`mailto:${t('email')}`} className="text-[var(--brand)]">{t('email')}</a></p>
        </div>
      </div>
    </div>
  );
}
