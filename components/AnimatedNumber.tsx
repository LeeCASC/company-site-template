'use client';

import { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  target: number;
  duration?: number;
  className?: string;
  trigger?: string | number; // 用于触发重新动画
}

export default function AnimatedNumber({ 
  target, 
  duration = 2000,
  className = '',
  trigger 
}: AnimatedNumberProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // 重置为0以重新开始动画
    setCurrent(0);
    
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // 使用缓动函数，让动画更自然
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const value = Math.floor(easeOutQuart * target);
      
      setCurrent(value);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // 确保最终值精确为目标值
        setCurrent(target);
      }
    };

    // 延迟一小段时间再开始动画，确保重置完成
    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration, trigger]); // 添加 trigger 到依赖数组

  return (
    <span className={`${className} number-glow`}>
      {current}
    </span>
  );
}

