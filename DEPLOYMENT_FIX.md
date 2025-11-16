# Vercel 部署后编辑页面发布问题解决方案

## 问题描述

在 Vercel 等 Serverless 环境中，文件系统是只读的，无法直接写入文件。这会导致招聘编辑页面发布失败，错误信息：`EROFS: read-only file system`。

## 解决方案：使用 Vercel KV

当前代码已支持自动检测并使用 Vercel KV。只需完成以下配置：

### 步骤 1：在 Vercel 项目中添加 KV 数据库

1. 登录 [Vercel 控制台](https://vercel.com)
2. 进入你的项目
3. 点击 **"Storage"** 标签
4. 点击 **"Create Database"**
5. 选择 **"KV"** (Redis)
6. 创建数据库（可以选择免费套餐）

### 步骤 2：安装依赖（已完成）

`@vercel/kv` 已经在 `package.json` 中，无需额外安装。

### 步骤 3：环境变量自动配置

Vercel 会自动添加以下环境变量到你的项目：
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

**无需手动配置！**

### 步骤 4：重新部署

提交代码并推送到 Git，Vercel 会自动重新部署。代码会自动检测 KV 环境变量并使用 KV 存储。

## 工作原理

代码会按以下顺序尝试存储：

1. **优先**：如果检测到 `KV_REST_API_URL` 和 `KV_REST_API_TOKEN`，使用 Vercel KV
2. **回退**：如果 KV 不可用，尝试使用文件系统（仅开发环境）
3. **错误提示**：如果文件系统只读，提供清晰的配置指南

## 验证

部署后，编辑操作应该能够成功。如果仍然失败，请检查：

1. ✅ Vercel KV 数据库是否已创建
2. ✅ 环境变量是否已自动配置（在 Vercel 项目设置 → Environment Variables 中查看）
3. ✅ 代码是否已重新部署

## 本地开发

在本地开发环境中（`npm run dev`），代码会自动使用文件系统存储，无需配置 KV。

## 其他存储方案

如果不想使用 Vercel KV，也可以使用：
- PostgreSQL（通过 Vercel Postgres）
- MongoDB
- Supabase
- 其他数据库服务

需要修改 `app/api/careers/route.ts` 中的存储逻辑。
