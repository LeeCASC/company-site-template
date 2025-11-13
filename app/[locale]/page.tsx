'use client';

import {useTranslations} from 'next-intl';
import Link from 'next/link';
import type {Locale} from '@/i18n/routing';
import AnimatedNumber from '@/components/AnimatedNumber';
import StarMap from '@/components/StarMap';
import { useEffect, useRef, useState } from 'react';

// 自定义 hook：检测元素是否进入视口，支持手动触发动画
function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const [triggerKey, setTriggerKey] = useState(0); // 用于强制重新触发动画
  const ref = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 手动触发动画的函数
  const triggerAnimation = () => {
    setIsInView(false);
    setTriggerKey(prev => prev + 1);
    // 短暂延迟后重新设置为 true，触发动画
    setTimeout(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInViewport) {
          setIsInView(true);
        }
      }
    }, 50);
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // 清理旧的 observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
          observerRef.current = null;
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(element);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [triggerKey]);

  return [ref, isInView, triggerAnimation] as const;
}

export default function Home({params:{locale}}:{params:{locale:string}}) {
  const currentLocale = (locale as Locale) ?? 'zh';
  const t = useTranslations('home');
  
  // 为各个区域创建 ref 和 inView 状态
  // Hero 区域在页面加载时立即显示动画
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const [heroImgInView, setHeroImgInView] = useState(false);
  const [heroTitleInView, setHeroTitleInView] = useState(false);
  const [heroSubtitleInView, setHeroSubtitleInView] = useState(false);
  
  // Hero 区域在页面加载时立即触发动画
  useEffect(() => {
    setHeroImgInView(true);
    setHeroTitleInView(true);
    const timer = setTimeout(() => {
      setHeroSubtitleInView(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);
  const [image1Ref, image1InView, triggerImage1Animation] = useInView();
  const [buttonSectionRef, buttonSectionInView, triggerButtonAnimation] = useInView();
  const [missionSectionRef, missionSectionInView, triggerMissionAnimation] = useInView();
  const [animatedNumberTrigger, setAnimatedNumberTrigger] = useState(0);
  
  // 当 mission 区域进入视口时，触发数字动画
  useEffect(() => {
    if (missionSectionInView) {
      setAnimatedNumberTrigger(prev => prev + 1);
    }
  }, [missionSectionInView]);
  const [introSectionRef, introSectionInView, triggerIntroAnimation] = useInView();
  const [strengthSectionRef, strengthSectionInView, triggerStrengthAnimation] = useInView();
  const [newsSectionRef, newsSectionInView, triggerNewsAnimation] = useInView();
  const [equipmentSectionRef, equipmentSectionInView, triggerEquipmentAnimation] = useInView();
  
  // 为动态生成的元素创建 refs 数组
  const newsRefs = [useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null)];
  const equipmentRefs = [useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null)];
  const [newsInViews, setNewsInViews] = useState([false, false, false]);
  const [equipmentInViews, setEquipmentInViews] = useState([false, false, false, false]);
  
  // 存储 observers 的引用，以便后续可以断开
  const newsObserversRef = useRef<IntersectionObserver[]>([]);
  const equipmentObserversRef = useRef<IntersectionObserver[]>([]);
  
  // 为 news 图片设置 Intersection Observer
  useEffect(() => {
    // 重置状态，避免从其他页面返回时状态不一致
    setNewsInViews([false, false, false]);
    
    const setupObservers = () => {
      // 先断开所有旧的 observers
      newsObserversRef.current.forEach(observer => observer.disconnect());
      newsObserversRef.current = [];
      
      // 先检查哪些元素已经在视口中，立即设置状态
      newsRefs.forEach((ref, i) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport) {
          // 如果已经在视口中，延迟设置状态，避免闪烁
          setTimeout(() => {
            setNewsInViews(prev => {
              if (prev[i]) return prev;
              const newState = [...prev];
              newState[i] = true;
              return newState;
            });
          }, 50 + i * 50); // 错开时间，避免同时触发
        } else {
          // 如果不在视口中，创建 Observer 等待进入视口
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setNewsInViews(prev => {
                  // 如果已经是 true，就不需要更新，避免重复触发
                  if (prev[i]) return prev;
                  const newState = [...prev];
                  newState[i] = true;
                  return newState;
                });
                observer.disconnect();
                // 从数组中移除已断开的 observer
                newsObserversRef.current = newsObserversRef.current.filter(obs => obs !== observer);
              }
            },
            { threshold: 0.1 }
          );
          observer.observe(ref.current);
          newsObserversRef.current.push(observer);
        }
      });
    };
    
    // 延迟执行以确保元素已渲染
    const timer = setTimeout(setupObservers, 150);
    return () => {
      clearTimeout(timer);
      newsObserversRef.current.forEach(observer => observer.disconnect());
      newsObserversRef.current = [];
    };
  }, []);
  
  // 为 equipment 图片设置 Intersection Observer
  useEffect(() => {
    // 重置状态，避免从其他页面返回时状态不一致
    setEquipmentInViews([false, false, false, false]);
    
    const setupObservers = () => {
      // 先断开所有旧的 observers
      equipmentObserversRef.current.forEach(observer => observer.disconnect());
      equipmentObserversRef.current = [];
      
      // 先检查哪些元素已经在视口中，立即设置状态
      equipmentRefs.forEach((ref, i) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport) {
          // 如果已经在视口中，延迟设置状态，避免闪烁
          setTimeout(() => {
            setEquipmentInViews(prev => {
              if (prev[i]) return prev;
              const newState = [...prev];
              newState[i] = true;
              return newState;
            });
          }, 50 + i * 50); // 错开时间，避免同时触发
        } else {
          // 如果不在视口中，创建 Observer 等待进入视口
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setEquipmentInViews(prev => {
                  // 如果已经是 true，就不需要更新，避免重复触发
                  if (prev[i]) return prev;
                  const newState = [...prev];
                  newState[i] = true;
                  return newState;
                });
                observer.disconnect();
                // 从数组中移除已断开的 observer
                equipmentObserversRef.current = equipmentObserversRef.current.filter(obs => obs !== observer);
              }
            },
            { threshold: 0.1 }
          );
          observer.observe(ref.current);
          equipmentObserversRef.current.push(observer);
        }
      });
    };
    
    // 延迟执行以确保元素已渲染
    const timer = setTimeout(setupObservers, 150);
    return () => {
      clearTimeout(timer);
      equipmentObserversRef.current.forEach(observer => observer.disconnect());
      equipmentObserversRef.current = [];
    };
  }, []);
  

  return (
    <>
      {/* Hero Section - 响应式大图 */}
      <section className="relative w-full overflow-hidden" style={{ maxWidth: '100%' }}>
        <div className="w-full relative" style={{ maxWidth: '100%' }}>
          {/* 使用与深蓝色区域相同的宽度，保持比例 - 移动端使用 100% 宽度 */}
          <div className="w-full mx-auto relative" style={{ aspectRatio: '1287/432', maxWidth: '100%', width: '100%' }}>
            <img
              ref={heroImgRef as any}
              src="/images/hero.png"
              alt="Hero"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ 
                maxWidth: '100%', 
                height: 'auto', 
                width: '100%',
                objectPosition: 'center bottom',
                opacity: heroImgInView ? 1 : 0,
                transform: heroImgInView ? 'translateY(0)' : 'translateY(30px)',
                transition: heroImgInView ? 'opacity 0.8s ease-out, transform 0.8s ease-out' : 'none'
              }}
            />
            <div className="relative z-10 text-center h-full flex flex-col items-center justify-center px-4">
              <h1 
                ref={heroTitleRef as any}
                className="text-hero text-white mb-2 sm:mb-4"
                style={{
                  opacity: heroTitleInView ? 1 : 0,
                  transform: heroTitleInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: heroTitleInView ? 'opacity 0.8s ease-out, transform 0.8s ease-out 0.2s' : 'none'
                }}
              >
                {t('heroTitle')}
              </h1>
              <p 
                ref={heroSubtitleRef as any}
                className="text-hero-sub text-brand-accent"
                style={{
                  opacity: heroSubtitleInView ? 1 : 0,
                  transform: heroSubtitleInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: heroSubtitleInView ? 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s' : 'none'
                }}
              >
                {t('heroSubtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 三个图标按钮区域 - 位于hero和image_1之间，居中显示 */}
      <section className="bg-white flex items-center justify-center" style={{ minHeight: 'clamp(120px, 15vw, 200px)', maxWidth: '100%' }} ref={buttonSectionRef as any}>
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[80px] relative w-full" style={{ maxWidth: '100%' }}>
          <div className="w-full max-w-[1287px] mx-auto" style={{ maxWidth: '100%' }}>
            <div className="flex flex-nowrap gap-16 sm:gap-24 md:gap-32 lg:gap-40 xl:gap-48 justify-center items-center">
              <button 
                onClick={() => {
                  // 可以添加点击事件处理逻辑
                  console.log('重型工程物流 clicked');
                }}
                className="flex flex-col items-center text-center cursor-pointer hover:opacity-80 transition-opacity relative"
                style={{ 
                  border: 'none', 
                  borderWidth: '0',
                  outline: 'none', 
                  outlineWidth: '0',
                  background: 'transparent',
                  boxShadow: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  fontFamily: 'Inter, ui-sans-serif, system-ui, Segoe UI, Helvetica, Arial, sans-serif',
                  width: 'clamp(120px, 16vw, 220px)',
                  paddingTop: '2px',
                  paddingLeft: '2px',
                  paddingRight: '2px',
                  paddingBottom: '0',
                  flexShrink: 0,
                  opacity: buttonSectionInView ? 1 : 0,
                  transform: buttonSectionInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: buttonSectionInView ? 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s' : 'none'
                }}
                onFocus={(e) => e.target.style.outline = 'none'}
                onBlur={(e) => e.target.style.outline = 'none'}
              >
                <div className="w-[clamp(80px, 11vw, 140px)] h-[clamp(75px, 10.5vw, 130px)] flex items-center justify-center" style={{ border: 'none', outline: 'none', flexShrink: 0, marginTop: 0, marginBottom: 'clamp(8px, 1.2vw, 12px)' }}>
                  <img src="/icons/Anchor.svg" alt="Anchor" className="w-full h-full object-contain" style={{ border: 'none', outline: 'none', maxWidth: '100%', height: 'auto' }} />
                </div>
                <p className="text-[clamp(20px, 3.5vw, 40px)] font-bold text-brand-primary text-center w-full whitespace-nowrap" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, Segoe UI, Helvetica, Arial, sans-serif', lineHeight: 'normal', letterSpacing: '-0.28px', marginTop: 0 }}>{t('icon1Title')}</p>
              </button>
              <button 
                onClick={() => {
                  // 可以添加点击事件处理逻辑
                  console.log('可再生能源项目 clicked');
                }}
                className="flex flex-col items-center text-center cursor-pointer hover:opacity-80 transition-opacity relative"
                style={{ 
                  border: 'none', 
                  borderWidth: '0',
                  outline: 'none', 
                  outlineWidth: '0',
                  background: 'transparent',
                  boxShadow: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  fontFamily: 'Inter, ui-sans-serif, system-ui, Segoe UI, Helvetica, Arial, sans-serif',
                  width: 'clamp(120px, 16vw, 220px)',
                  paddingTop: '2px',
                  paddingLeft: '2px',
                  paddingRight: '2px',
                  paddingBottom: '0',
                  flexShrink: 0,
                  opacity: buttonSectionInView ? 1 : 0,
                  transform: buttonSectionInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: buttonSectionInView ? 'opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s' : 'none'
                }}
                onFocus={(e) => e.target.style.outline = 'none'}
                onBlur={(e) => e.target.style.outline = 'none'}
              >
                <div className="w-[clamp(80px, 11vw, 140px)] h-[clamp(75px, 10.5vw, 130px)] flex items-center justify-center" style={{ border: 'none', outline: 'none', flexShrink: 0, marginTop: 0, marginBottom: 'clamp(8px, 1.2vw, 12px)' }}>
                  <img src="/icons/Feather.svg" alt="Feather" className="w-full h-full object-contain" style={{ border: 'none', outline: 'none', maxWidth: '100%', height: 'auto' }} />
                </div>
                <p className="text-[clamp(20px, 3.5vw, 40px)] font-bold text-brand-primary text-center w-full whitespace-nowrap" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, Segoe UI, Helvetica, Arial, sans-serif', lineHeight: 'normal', letterSpacing: '-0.28px', marginTop: 0 }}>{t('icon2Title')}</p>
              </button>
              <button 
                onClick={() => {
                  // 可以添加点击事件处理逻辑
                  console.log('菲律宾深耕 clicked');
                }}
                className="flex flex-col items-center text-center cursor-pointer hover:opacity-80 transition-opacity relative"
                style={{ 
                  border: 'none', 
                  borderWidth: '0',
                  outline: 'none', 
                  outlineWidth: '0',
                  background: 'transparent',
                  boxShadow: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  fontFamily: 'Inter, ui-sans-serif, system-ui, Segoe UI, Helvetica, Arial, sans-serif',
                  width: 'clamp(120px, 16vw, 220px)',
                  paddingTop: '2px',
                  paddingLeft: '2px',
                  paddingRight: '2px',
                  paddingBottom: '0',
                  flexShrink: 0,
                  opacity: buttonSectionInView ? 1 : 0,
                  transform: buttonSectionInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: buttonSectionInView ? 'opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s' : 'none'
                }}
                onFocus={(e) => e.target.style.outline = 'none'}
                onBlur={(e) => e.target.style.outline = 'none'}
              >
                <div className="w-[clamp(80px, 11vw, 140px)] h-[clamp(75px, 10.5vw, 130px)] flex items-center justify-center" style={{ border: 'none', outline: 'none', flexShrink: 0, marginTop: 0, marginBottom: 'clamp(8px, 1.2vw, 12px)' }}>
                  <img src="/icons/Box.svg" alt="Box" className="w-full h-full object-contain" style={{ border: 'none', outline: 'none', maxWidth: '100%', height: 'auto' }} />
                </div>
                <p className="text-[clamp(20px, 3.5vw, 40px)] font-bold text-brand-primary text-center w-full whitespace-nowrap" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, Segoe UI, Helvetica, Arial, sans-serif', lineHeight: 'normal', letterSpacing: '-0.28px', marginTop: 0 }}>{t('icon3Title')}</p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 深蓝色统计区域 - 企业愿景 */}
      <section id="mission" className="text-white py-4 sm:py-6 md:py-8 lg:py-12 xl:py-20 scroll-mt-20" style={{ maxWidth: '100%' }} ref={missionSectionRef as any}>
        <div className="w-full relative" style={{ maxWidth: '100%' }}>
          {/* 使用与Hero相同的宽度和高度比例，保持完全一致 */}
          <div className="w-full mx-auto relative overflow-visible bg-brand-primary" style={{ aspectRatio: '1287/648', maxWidth: '100%', width: '100%' }}>
            <div className="relative z-10 flex flex-col px-4 sm:px-6 md:px-12 lg:px-[80px] pr-4 sm:pr-6 md:pr-12 lg:pr-[73px] h-full pt-0 sm:pt-0 md:pt-0 lg:pt-0 xl:pt-0 pb-3 sm:pb-4 md:pb-6 lg:pb-8 xl:pb-10">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-3 sm:mb-4 md:mb-6 lg:mb-8 gap-4 sm:gap-6 lg:gap-8 flex-shrink-0" style={{ position: 'relative', top: 'clamp(-15px, -2.5vw, -50px)' }}>
                {/* 左侧：25年运营经验 - 换行显示 */}
                <div className="flex flex-col flex-shrink-0" style={{ marginTop: 'clamp(10px, 2vw, 40px)' }}>
                  <div className="flex items-baseline gap-2">
                    <div
                      style={{
                        opacity: missionSectionInView ? 1 : 0,
                        transform: missionSectionInView ? 'translateY(0)' : 'translateY(30px)',
                        transition: missionSectionInView ? 'opacity 0.8s ease-out, transform 0.8s ease-out' : 'none'
                      }}
                    >
                      <AnimatedNumber 
                        key={`${currentLocale}-${animatedNumberTrigger}`}
                        target={25} 
                        duration={2000}
                        className="text-display-lg text-gray-100"
                        trigger={animatedNumberTrigger}
                      />
                    </div>
                    <span 
                      className="text-[clamp(16px,2.5vw,30px)] font-bold text-gray-100" 
                      style={{ 
                        lineHeight: 'normal', 
                        letterSpacing: '-0.6px',
                        opacity: missionSectionInView ? 1 : 0,
                        transform: missionSectionInView ? 'translateY(0)' : 'translateY(30px)',
                        transition: missionSectionInView ? 'opacity 0.8s ease-out 0.1s, transform 0.8s ease-out 0.1s' : 'none'
                      }}
                    >
                      {t('statsYearsText')}
                    </span>
                  </div>
                  <span 
                    className="text-[clamp(16px,2.5vw,30px)] font-bold text-gray-100 mt-2" 
                    style={{ 
                      lineHeight: 'normal', 
                      letterSpacing: '-0.6px',
                      opacity: missionSectionInView ? 1 : 0,
                      transform: missionSectionInView ? 'translateY(0)' : 'translateY(30px)',
                      transition: missionSectionInView ? 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s' : 'none'
                    }}
                  >
                    {t('statsExperience')}
                  </span>
                </div>
              </div>

              {/* 世界地图 - 在蓝色区域内，几乎充满整个区域，明显靠右显示 */}
              <div className="absolute inset-0 flex items-center justify-end" style={{ paddingTop: 'clamp(80px, 12vw, 150px)', paddingLeft: '0', paddingRight: 'clamp(20px, 3vw, 60px)', paddingBottom: '0', left: 'clamp(200px, 25vw, 400px)', maxWidth: '100%' }}>
                <div style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%' }}>
                  <StarMap>
                    <img
                      ref={image1Ref as any}
                      src="/images/image_1.png"
                      alt="World Map"
                      className="w-full h-full object-contain"
                      style={{ 
                        display: 'block', 
                        width: '100%',
                        height: '100%',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        opacity: image1InView ? 1 : 0,
                        transform: image1InView ? 'translateY(0)' : 'translateY(30px)',
                        transition: image1InView ? 'opacity 0.8s ease-out, transform 0.8s ease-out' : 'none'
                      }}
                    />
                  </StarMap>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 白色介绍区域 - 关于我们 */}
      <section id="about" className="bg-white py-8 sm:py-12 md:py-20 scroll-mt-20" style={{ maxWidth: '100%' }}>
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[80px]" style={{ maxWidth: '100%' }}>
          <div className="max-w-[1287px] mx-auto" style={{ maxWidth: '100%' }}>
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-[60px] items-center">
            {/* 左侧：文字内容 */}
            <div className="flex-1" ref={introSectionRef as any}>
              <h2 
                className="text-section-title text-brand-primary mb-4"
                style={{
                  opacity: introSectionInView ? 1 : 0,
                  transform: introSectionInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: introSectionInView ? 'opacity 0.8s ease-out, transform 0.8s ease-out' : 'none'
                }}
              >
                {t('introTitle')}
              </h2>
              <p 
                className="text-subtitle text-brand-accent mb-6"
                style={{
                  opacity: introSectionInView ? 1 : 0,
                  transform: introSectionInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: introSectionInView ? 'opacity 0.8s ease-out 0.1s, transform 0.8s ease-out 0.1s' : 'none'
                }}
              >
                {t('introSubtitle')}
              </p>
              <p 
                className="text-body text-gray-400 mb-8"
                style={{
                  opacity: introSectionInView ? 1 : 0,
                  transform: introSectionInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: introSectionInView ? 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s' : 'none'
                }}
              >
                {t('introDesc')}
              </p>
              <Link 
                href={`/${currentLocale}#about`} 
                className="btn btn-primary"
                style={{
                  opacity: introSectionInView ? 1 : 0,
                  transform: introSectionInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: introSectionInView ? 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s' : 'none'
                }}
              >
                {t('ctaPlan')}
              </Link>
            </div>

            {/* 右侧：图片 */}
            <div className="flex-1" style={{ maxWidth: '100%' }}>
              <img
                src="/images/introduction.png"
                alt="Introduction"
                className="w-full h-auto rounded-lg"
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto', 
                  width: '100%',
                  opacity: introSectionInView ? 1 : 0,
                  transform: introSectionInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: introSectionInView ? 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s' : 'none'
                }}
              />
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* 新闻区域 */}
      <section id="news" className="bg-white py-8 sm:py-12 md:py-20 scroll-mt-20" style={{ maxWidth: '100%' }} ref={newsSectionRef as any}>
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[80px] pr-4 sm:pr-6 md:pr-8 lg:pr-[73px]" style={{ maxWidth: '100%' }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 
              className="text-section-title text-brand-primary"
              style={{
                opacity: newsSectionInView ? 1 : 0,
                transform: newsSectionInView ? 'translateY(0)' : 'translateY(30px)',
                transition: newsSectionInView ? 'opacity 0.8s ease-out, transform 0.8s ease-out' : 'none'
              }}
            >
              {t('newsTitle')}
            </h2>
            <Link 
              href={`/${currentLocale}#news`} 
              className="inline-flex items-center justify-center bg-gray-50 text-brand-primary hover:bg-gray-100 rounded-button px-6 py-3 text-button font-medium transition-colors shadow-button whitespace-nowrap"
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
                className="rounded-card flex flex-col overflow-hidden transition-all hover:shadow-lg"
                style={{ aspectRatio: '27/13' }}
              >
                <div className="flex-1 overflow-hidden rounded-lg mb-3 bg-brand-accent-50 p-[13px]" style={{ maxWidth: '100%' }}>
                  <img
                    ref={newsRefs[i]}
                    src={news.img}
                    alt={news.title}
                    className="w-full h-full object-cover rounded-lg transition-transform hover:scale-105"
                    style={{ 
                      maxWidth: '100%', 
                      height: 'auto', 
                      width: '100%',
                      opacity: newsInViews[i] ? 1 : 0,
                      transform: newsInViews[i] ? 'translateY(0)' : 'translateY(30px)',
                      transition: newsInViews[i] ? `opacity 0.8s ease-out ${i * 0.1}s, transform 0.8s ease-out ${i * 0.1}s` : 'none'
                    }}
                  />
                </div>
                <p 
                  className="text-body text-gray-650 leading-[150%] line-clamp-4 min-h-[5rem]"
                  style={{
                    opacity: newsInViews[i] ? 1 : 0,
                    transform: newsInViews[i] ? 'translateY(0)' : 'translateY(30px)',
                    transition: newsInViews[i] ? `opacity 0.8s ease-out ${(i * 0.1 + 0.2)}s, transform 0.8s ease-out ${(i * 0.1 + 0.2)}s` : 'none'
                  }}
                >
                  {t('newsCardText')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 实力见证区域 */}
      <section id="strength" className="bg-white py-8 sm:py-12 md:py-20 scroll-mt-20" style={{ maxWidth: '100%' }}>
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[80px] pr-4 sm:pr-6 md:pr-8 lg:pr-[73px]" style={{ maxWidth: '100%' }}>
          <div className="max-w-[1287px] mx-auto" style={{ maxWidth: '100%' }}>
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-[60px] items-center">
            {/* 左侧：图片 */}
            <div className="flex-1" style={{ maxWidth: '100%' }}>
              <img
                src="/images/strength.png"
                alt="Proof of Strength"
                className="w-full h-auto rounded-lg"
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto', 
                  width: '100%',
                  opacity: strengthSectionInView ? 1 : 0,
                  transform: strengthSectionInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: strengthSectionInView ? 'opacity 0.8s ease-out, transform 0.8s ease-out' : 'none'
                }}
              />
            </div>

            {/* 右侧：文字内容 */}
            <div className="flex-1" ref={strengthSectionRef as any}>
              <h2 
                className="text-section-title text-brand-primary mb-4"
                style={{
                  opacity: strengthSectionInView ? 1 : 0,
                  transform: strengthSectionInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: strengthSectionInView ? 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s' : 'none'
                }}
              >
                {t('strengthTitle')}
              </h2>
              <p 
                className="text-subtitle text-brand-accent mb-6"
                style={{
                  opacity: strengthSectionInView ? 1 : 0,
                  transform: strengthSectionInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: strengthSectionInView ? 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s' : 'none'
                }}
              >
                {t('strengthSubtitle')}
              </p>
              <p 
                className="text-body text-gray-400 mb-8"
                style={{
                  opacity: strengthSectionInView ? 1 : 0,
                  transform: strengthSectionInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: strengthSectionInView ? 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s' : 'none'
                }}
              >
                {t('strengthDesc')}
              </p>
              <Link 
                href={`/${currentLocale}#strength`} 
                className="btn btn-primary"
                style={{
                  opacity: strengthSectionInView ? 1 : 0,
                  transform: strengthSectionInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: strengthSectionInView ? 'opacity 0.8s ease-out 0.5s, transform 0.8s ease-out 0.5s' : 'none'
                }}
              >
                {t('readMore')}
              </Link>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* 设备清单区域 - 橙色背景 - 装备实力 */}
      <section id="equipment" className="bg-brand-accent py-8 sm:py-12 md:py-20 scroll-mt-20" style={{ maxWidth: '100%' }} ref={equipmentSectionRef as any}>
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[80px] pr-4 sm:pr-6 md:pr-8 lg:pr-[73px]" style={{ maxWidth: '100%' }}>
          <div className="max-w-[1287px] mx-auto" style={{ maxWidth: '100%' }}>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
              <h2 
                className="text-section-title text-white"
                style={{
                  opacity: equipmentSectionInView ? 1 : 0,
                  transform: equipmentSectionInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: equipmentSectionInView ? 'opacity 0.8s ease-out, transform 0.8s ease-out' : 'none'
                }}
              >
                {t('equipmentListTitle')}
              </h2>
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
                <div className="aspect-square" style={{ maxWidth: '100%' }}>
                  <img
                    ref={equipmentRefs[i]}
                    src={equip.img}
                    alt={equip.name}
                    className="w-full h-full object-cover"
                    style={{ 
                      maxWidth: '100%', 
                      height: 'auto', 
                      width: '100%',
                      opacity: equipmentInViews[i] ? 1 : 0,
                      transform: equipmentInViews[i] ? 'translateY(0)' : 'translateY(30px)',
                      transition: equipmentInViews[i] ? `opacity 0.8s ease-out ${i * 0.1}s, transform 0.8s ease-out ${i * 0.1}s` : 'none'
                    }}
                  />
                </div>
                <p 
                  className="text-button text-brand-primary text-center py-4"
                  style={{
                    opacity: equipmentInViews[i] ? 1 : 0,
                    transform: equipmentInViews[i] ? 'translateY(0)' : 'translateY(30px)',
                    transition: equipmentInViews[i] ? `opacity 0.8s ease-out ${(i * 0.1 + 0.2)}s, transform 0.8s ease-out ${(i * 0.1 + 0.2)}s` : 'none'
                  }}
                >
                  {equip.name}
                </p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer - 联系信息 */}
      <footer id="contact" className="bg-gray-50 py-8 sm:py-12 md:py-20 scroll-mt-20" style={{ maxWidth: '100%' }}>
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[80px] pr-4 sm:pr-6 md:pr-8 lg:pr-[73px]" style={{ maxWidth: '100%' }}>
          <div className="max-w-[1287px] mx-auto" style={{ maxWidth: '100%' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-6 sm:mb-8">
            {/* 左侧：联系我们 */}
            <div>
              <h3 className="text-section-title text-brand-primary mb-6">{t('contactUsTitle')}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img src="/icons/Phone.svg" alt="Phone" className="w-[30px] h-[30px]" style={{ maxWidth: '100%', height: 'auto' }} />
                  <span className="text-body text-gray-500">{t('contactTel')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src="/icons/Mail.svg" alt="Mail" className="w-[30px] h-[30px]" style={{ maxWidth: '100%', height: 'auto' }} />
                  <span className="text-body text-gray-500">{t('contactEmail')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src="/icons/Map pin.svg" alt="Map pin" className="w-[30px] h-[30px]" style={{ maxWidth: '100%', height: 'auto' }} />
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