# Sanity Studio 访问指南

## 🌐 访问地址

### 本地开发环境

```
http://localhost:3000/studio
```

### 生产环境（Vercel 部署后）

```
https://your-domain.vercel.app/studio
```

## 📋 访问步骤

### 1. 确保环境变量已配置

在 `.env.local` 文件（本地）或 Vercel 环境变量中配置：

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 2. 启动开发服务器（本地）

```bash
npm run dev
```

### 3. 访问 Studio

在浏览器中打开：
```
http://localhost:3000/studio
```

### 4. 登录 Sanity

- 首次访问会提示登录
- 使用您的 Sanity 账号登录
- 如果没有账号，需要先注册

## ⚠️ 首次访问需要配置 CORS

如果首次访问 Studio 时看到提示需要添加 CORS origin：

1. **点击 "Continue" 按钮**（会打开 Sanity 管理后台）
2. 或手动进入：Sanity 后台 → Settings → API → CORS origins
3. 添加以下 CORS origin：
   - **本地开发**：`http://localhost:3000`
   - **生产环境**：`https://your-domain.vercel.app`
4. 勾选 "Allow credentials"
5. 点击 "Add"
6. 返回 Studio 页面刷新

**详细步骤**：查看 `SANITY_CORS_SETUP.md`

## 🔍 如果无法访问

### 问题 1: 显示 404

**检查**：
1. 确认 `app/studio/[[...index]]/page.tsx` 文件存在
2. 确认 `sanity.config.ts` 文件存在
3. 确认环境变量 `NEXT_PUBLIC_SANITY_PROJECT_ID` 已配置
4. 重启开发服务器

### 问题 2: 显示空白页面

**检查**：
1. 打开浏览器控制台（F12）查看错误
2. 确认环境变量是否正确
3. 确认已安装 `sanity` 包：`npm install sanity`

### 问题 3: 提示需要登录但无法登录

**检查**：
1. 确认 Sanity 项目 ID 正确
2. 确认您有该项目的访问权限
3. 尝试在 [sanity.io](https://www.sanity.io/) 直接登录

## 📝 配置检查清单

- [ ] `sanity.config.ts` 文件存在
- [ ] `app/studio/[[...index]]/page.tsx` 文件存在
- [ ] `schemas/careers.ts` 文件存在
- [ ] `schemas/index.ts` 文件存在
- [ ] 环境变量 `NEXT_PUBLIC_SANITY_PROJECT_ID` 已配置
- [ ] 环境变量 `NEXT_PUBLIC_SANITY_DATASET` 已配置
- [ ] 已安装 `sanity` 包
- [ ] 开发服务器正在运行

## 🎯 首次使用

1. **访问 Studio**
   ```
   http://localhost:3000/studio
   ```

2. **登录 Sanity 账号**
   - 如果没有账号，访问 [sanity.io](https://www.sanity.io/) 注册

3. **创建招聘页面文档**
   - 在左侧菜单找到 **"招聘页面"**（Careers Page）
   - 如果没有文档，点击 **"Create"** 创建
   - 填写初始数据
   - 点击 **"Publish"** 发布

## 📚 相关文档

- **完整配置**：`SANITY_SETUP_COMPLETE.md`
- **客户使用指南**：`SANITY_CLIENT_GUIDE.md`

