'use client';

import {useTranslations} from 'next-intl';
import type {Locale} from '@/i18n/routing';
import { useEffect, useRef, useState } from 'react';

// 自定义 hook：检测元素是否进入视口
function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, isInView] as const;
}

export default function NewsPage({params:{locale}}:{params:{locale:string}}) {
  const currentLocale = (locale as Locale) ?? 'zh';
  const t = useTranslations('home');

  // 页面标题在页面加载时立即显示动画
  const [titleInView, setTitleInView] = useState(false);
  
  // 页面加载时立即触发标题的动画
  useEffect(() => {
    setTitleInView(true);
  }, []);

  // 新闻卡片网格的滚动检测
  const [newsGridRef, newsGridInView] = useInView();

  // 新闻数据 - 使用 news_1.png 到 news_3.png，重复两遍再加两张（共8张）
  const newsItems = [
    { img: '/news_1.png', title: 'News 1' },
    { img: '/news_2.png', title: 'News 2' },
    { img: '/news_3.png', title: 'News 3' },
    { img: '/news_1.png', title: 'News 4' },
    { img: '/news_2.png', title: 'News 5' },
    { img: '/news_3.png', title: 'News 6' },
    { img: '/news_1.png', title: 'News 7' },
    { img: '/news_2.png', title: 'News 8' },
  ];

  return (
    <div className="relative min-h-screen bg-white">
      {/* 内容区域 */}
      <div className="relative z-10 pt-32 pb-32" style={{ fontSize: '0.9em' }}>
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[80px]">
          {/* 页面标题 - 左上方 */}
          <div 
            className="text-left mb-16"
            style={{
              opacity: titleInView ? 1 : 0,
              transform: titleInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }}
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-brand-primary mb-4">
              {t('allNews')}
            </h1>
          </div>

          {/* 新闻卡片网格 - 3列布局 */}
          <div 
            ref={newsGridRef as any}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            style={{
              opacity: newsGridInView ? 1 : 0,
              transform: newsGridInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
            }}
          >
            {newsItems.map((news, i) => (
              <div
                key={i}
                className="rounded-card flex flex-col overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="w-full rounded-lg mb-3 bg-brand-accent-50 p-[13px] flex items-center justify-center" style={{ minHeight: '200px' }}>
                  <img
                    src={news.img}
                    alt={news.title}
                    className="w-full h-auto rounded-lg transition-transform hover:scale-105 object-contain"
                    style={{ 
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                  />
                </div>
                <div className="text-body leading-[150%] min-h-[5rem] text-center" style={{ fontSize: '1.25em' }}>
                  <p className="mb-2 font-bold" style={{ color: '#156082' }}>
                    {t('newsCardText')}
                  </p>
                  <p className="text-gray-400">
                    {t('newsCardText')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

