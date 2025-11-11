# 设计规范整理（基于 Figma 截图）

## 颜色系统 (Colors)

### 品牌色
- **主品牌色（深蓝）**: `#0E2745` (--the-blue)
- **主品牌色 39% 透明度**: `rgba(14, 39, 69, 0.39)`
- **强调色（橙色）**: `#F7B959`
- **强调色 50% 透明度**: `rgba(247, 185, 89, 0.5)`

### 基础色
- **白色**: `#FFFFFF`
- **黑色**: `#000000`
- **黑色 20% 透明度**: `rgba(0, 0, 0, 0.2)`

### 灰色系统
- **浅灰**: `#E6E6E6`
- **中灰**: `#828282`
- **深灰**: `#454545`
- **极浅灰**: `#F2F2F7`

### 功能色
- **错误色**: `#FF1515`
- **警告色**: `#FF4A1C`

## 字体系统 (Typography)

### 字体族
- **主字体**: `Inter` (所有文字)

### 字体样式层级

#### 1. Hero 大标题
- **元素**: "Wintex Logistic"
- **Font Family**: Inter
- **Font Size**: 80px
- **Font Weight**: 700 (Bold)
- **Line Height**: normal
- **Letter Spacing**: -1.6px
- **Color**: #FFFFFF (白色)

#### 2. Hero 副标题
- **元素**: "助您「贏」在路上" / "Win the Way"
- **Font Family**: Inter
- **Font Size**: 48px
- **Font Weight**: 700 (Bold)
- **Line Height**: normal
- **Letter Spacing**: -0.96px
- **Color**: #F7B959 (橙色)

#### 3. 大数字（统计）
- **元素**: "25"
- **Font Family**: Inter
- **Font Size**: 90px
- **Font Weight**: 400 (Regular)
- **Line Height**: var(--Static-Display-Medium-Line-Height)
- **Color**: #E6E6E6 (浅灰)

#### 4. 统计文字
- **元素**: "年" / "运营经验"
- **Font Family**: Inter
- **Font Size**: 30px / 45px
- **Font Weight**: 200-300 (Light)
- **Line Height**: 35px (116.667%)
- **Color**: #E6E6E6 (浅灰)

#### 5. 图标标签文字
- **元素**: "重型工程物流" / "可再生能源项目" / "菲律宾深耕"
- **Font Family**: Inter
- **Font Size**: 30px
- **Font Weight**: 300 (Light)
- **Line Height**: 35px (116.667%)
- **Color**: #E6E6E6 (浅灰)
- **Text Align**: center

#### 6. 主标题（Section Title）
- **元素**: "破界起航" / "Sailing Beyond Boundaries" / "实力见证" / "新闻"
- **Font Family**: Inter
- **Font Size**: 48px
- **Font Weight**: 600 (Semi-Bold)
- **Line Height**: normal
- **Letter Spacing**: -0.96px
- **Color**: #0E2745 (深蓝)

#### 7. 副标题（Subtitle）
- **元素**: "无界定义物流 | 创新由此启幕"
- **Font Family**: Inter
- **Font Size**: 24px
- **Font Weight**: 400 (Regular)
- **Line Height**: 150% (36px)
- **Color**: #F7B959 (橙色)

#### 8. 正文段落
- **元素**: 段落文字
- **Font Family**: Inter
- **Font Size**: 24px
- **Font Weight**: 400 (Regular)
- **Line Height**: 150% (36px) / 116% (27.84px)
- **Color**: #828282 (中灰)

#### 9. 按钮文字
- **元素**: "关于我们" / "阅读更多"
- **Font Family**: Inter
- **Font Size**: 24px
- **Font Weight**: 500 (Medium)
- **Line Height**: 150% (36px)
- **Color**: #FFFFFF (白色按钮) / #000000 (黑色按钮)

#### 10. 小文字
- **元素**: "全部新闻" / "联系我们" / 设备名称
- **Font Family**: Inter
- **Font Size**: 16px / 24px
- **Font Weight**: 500 (Medium)
- **Line Height**: 150% (24px / 36px)
- **Color**: #000000 / #0E2745 / #FFFFFF (根据上下文)

#### 11. 超小文字
- **元素**: 联系信息等
- **Font Family**: Inter
- **Font Size**: 16px
- **Font Weight**: 500 (Medium)
- **Line Height**: 150% (24px)
- **Color**: #454545 (深灰)

## 图标资源

- **Anchor** (锚): 100.51 × 100.51px
- **Feather** (羽毛): 100.51 × 100.51px
- **Box** (立方体): 100.51 × 100.51px
- **Map pin**: 30 × 30px
- **Phone**: 30 × 30px
- **Mail**: 30 × 30px

## 图片资源

- **hero**: 4,096 × 3,069px (货船图)
- **introduction**: 4,096 × 3,069px (港口图)
- **image_1**: 4,096 × 2,367px (世界地图)
- **equipment_1**: 2,960 × 1,065px
- **equipment_2**: 2,723 × 946px
- **equipment_3**: 1,407 × 660px
- **equipment_4**: 1,440 × 1,080px
- **news_1**: 4,032 × 3,024px
- **news_2**: 4,096 × 3,072px
- **news_3**: 2,275 × 1,279px
- **strength**: 1,702 × 1,276px
- **wintex-logo**: 2,383 × 2,604px

## 页面尺寸

- **设计稿宽度**: 1440px
- **设计稿高度**: 4527px

## 组件样式 (Components)

### 按钮 (Button)
- **背景色**: `#0E2745` (深蓝)
- **Padding**: `12px 24px` (垂直 12px, 水平 24px)
- **Border Radius**: `8px`
- **Box Shadow**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **Display**: `flex`
- **Align Items**: `center`
- **Gap**: `8px` (内部元素间距)

### 区域背景色
- **深蓝色统计区域**: `#0E2745`
- **橙色设备清单区域**: `#F7B959`
- **浅灰色区域**: `#F2F2F7`

### 新闻卡片 (News Card)
- **Corner Radius**: `13px`
- **Background**: `rgba(247, 185, 89, 0.5)` (#F7B959 - 50% 透明度)
- **Padding**: `13px` (图片周围)
- **尺寸**: `405px × 195px`
- **Aspect Ratio**: `27/13`
- **Effects**: 无阴影

## 间距系统 (Spacing)

### 页面容器
- **宽度**: 1440px
- **高度**: 4527px
- **背景色**: #FFF

### 深蓝色统计区域
- **Padding**: 
  - Top: 80px
  - Left: 73px
  - Right: 73px（推断，需确认）
  - Bottom: 待确认
- **三个图标之间的 Gap**: **28px** ✅（已确认）

### 世界地图区域
- **宽度**: 1287px
- **高度**: 342.341px
- **Padding**: 
  - Left: 80px
  - Right: 73px

### 白色介绍区域 (Group 1)
- **宽度**: 1287px
- **高度**: 342.341px
- **Padding**: 
  - Left: 80px
  - Right: 73px
- **Gap**: 60px（估算值，文字和图片之间的间距）

### 图标容器尺寸
- **单个图标容器**: 198px × 190px（Box）或 217px × 188px（Feather）

## 待补充信息

### 1. 间距系统 (Spacing) - ✅ 已完成
- [x] 深蓝色统计区域的 Padding（已获取：80px top, 73px left）
- [x] **三个图标之间的 Gap**（✅ 已获取：28px）
- [x] **白色介绍区域的 Padding**（✅ 已获取：Left 80px, Right 73px）
- [x] **白色介绍区域的 Gap**（✅ 已估算：60px）
- [x] 页面容器的宽度（已获取：1440px）
- [x] **页面容器的左右 Padding**（从设计稿看，内容区域是 1287px，左右各有约 76.5px 的 padding，但实际可能是居中布局）

### 2. 按钮组件样式 - ✅ 已完成
- [x] "关于我们" 按钮的背景色
- [x] 按钮的 Corner Radius (圆角)
- [x] 按钮的 Padding (内边距)
- [x] 按钮的阴影效果

### 3. 卡片组件样式 - ✅ 已完成
- [x] **新闻卡片的 Corner Radius**（✅ 已获取：13px）
- [x] **卡片的内边距**（✅ 已获取：13px，图片周围）
- [x] **卡片的阴影效果**（✅ 已确认：无阴影）
- [x] **卡片背景色**（✅ 已获取：#F7B959 - 50% 透明度）
- [x] **卡片尺寸**（✅ 已获取：405px × 195px，aspect-ratio: 27/13）

