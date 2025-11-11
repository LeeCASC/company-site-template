# 导航链接说明

## 已建立的导航链接

所有导航链接已正确配置，支持中英文双语。

### 导航栏链接映射

| 导航项 | 中文 | 英文 | 目标区域 ID | 说明 |
|--------|------|------|-------------|------|
| 关于我们 | 关于我们 | About Us | `#about` | 跳转到"破界起航"区域 |
| 企业愿景 | 企业愿景 | Mission | `#mission` | 跳转到"25年运营经验"统计区域 |
| 新闻 | 新闻 | News | `#news` | 跳转到新闻卡片区域 |
| 装备实力 | 装备实力 | Equipment | `#equipment` | 跳转到设备清单区域 |
| 联系我们 | 联系我们 | Contact Us | `#contact` | 跳转到 Footer 联系信息区域 |

### 页面区域 ID 配置

所有区域都已添加相应的 `id` 属性和 `scroll-mt-14` 类（用于处理固定头部的高度偏移）：

1. **Hero Section** - 无 ID（首页顶部）
2. **统计区域** - `id="mission"` - 企业愿景
3. **介绍区域** - `id="about"` - 关于我们
4. **新闻区域** - `id="news"` - 新闻
5. **实力见证区域** - `id="strength"` - 实力见证
6. **设备清单区域** - `id="equipment"` - 装备实力
7. **Footer** - `id="contact"` - 联系我们

### 链接格式

所有链接使用以下格式：
- 导航栏：`/${locale}#section-id`
- 页面内链接：`/${currentLocale}#section-id`

例如：
- 中文：`/zh#about`
- 英文：`/en#about`

### 平滑滚动

CSS 中已启用平滑滚动：
```css
scroll-behavior: smooth;
```

### 固定头部处理

所有区域都添加了 `scroll-mt-14` 类（Tailwind CSS），用于在滚动时考虑固定头部的高度（56px = 14 * 4px），确保内容不会被头部遮挡。

## 测试链接

### 中文版本 (http://localhost:3000/zh)
- 关于我们：http://localhost:3000/zh#about
- 企业愿景：http://localhost:3000/zh#mission
- 新闻：http://localhost:3000/zh#news
- 装备实力：http://localhost:3000/zh#equipment
- 联系我们：http://localhost:3000/zh#contact

### 英文版本 (http://localhost:3000/en)
- About Us：http://localhost:3000/en#about
- Mission：http://localhost:3000/en#mission
- News：http://localhost:3000/en#news
- Equipment：http://localhost:3000/en#equipment
- Contact Us：http://localhost:3000/en#contact

## 注意事项

1. 所有链接都支持中英文切换
2. 点击导航链接会平滑滚动到对应区域
3. 固定头部不会遮挡内容（通过 `scroll-mt-14` 处理）
4. 页面内的按钮链接也会正确跳转

