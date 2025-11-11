
import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      container: { 
        center: true, 
        padding: "1rem", 
        screens: { "2xl": "1440px" } // 更新为设计稿宽度
      },
      colors: {
        // 品牌色 - 基于 Figma 设计规范
        brand: {
          primary: "#0E2745", // 深蓝色
          "primary-39": "rgba(14, 39, 69, 0.39)", // 39% 透明度
          "primary-50": "rgba(14, 39, 69, 0.5)", // 50% 透明度
          accent: "#F7B959", // 橙色
          "accent-50": "rgba(247, 185, 89, 0.5)", // 50% 透明度
        },
        // 功能色
        error: "#FF1515",
        warning: "#FF4A1C",
        // 灰色系统
        gray: {
          50: "#F2F2F7",
          100: "#E6E6E6",
          200: "#E6E6E6",
          300: "#D1D5DB",
          400: "#828282",
          500: "#454545",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // 基于设计规范的字体大小
        'hero': ['80px', { lineHeight: 'normal', letterSpacing: '-1.6px', fontWeight: '700' }],
        'hero-sub': ['48px', { lineHeight: 'normal', letterSpacing: '-0.96px', fontWeight: '700' }],
        'display-lg': ['90px', { lineHeight: 'normal', fontWeight: '400' }],
        'display-md': ['45px', { lineHeight: '35px', fontWeight: '200' }],
        'section-title': ['48px', { lineHeight: 'normal', letterSpacing: '-0.96px', fontWeight: '600' }],
        'subtitle': ['24px', { lineHeight: '150%', fontWeight: '400' }],
        'body': ['24px', { lineHeight: '150%', fontWeight: '400' }],
        'body-sm': ['24px', { lineHeight: '116%', fontWeight: '400' }],
        'button': ['24px', { lineHeight: '150%', fontWeight: '500' }],
        'small': ['16px', { lineHeight: '150%', fontWeight: '500' }],
      },
      spacing: {
        // 基于设计规范的间距
        'section-padding-x': '80px', // 左侧 padding
        'section-padding-x-r': '73px', // 右侧 padding
        'icon-gap': '28px', // 图标之间的间距
        'intro-gap': '60px', // 介绍区域文字和图片之间的间距
      },
      borderRadius: {
        'button': '8px',
        'card': '13px',
      },
      boxShadow: {
        'button': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
    }
  },
  plugins: []
} satisfies Config;
