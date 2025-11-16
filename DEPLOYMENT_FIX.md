# Vercel 部署后编辑页面发布问题解决方案

## 问题描述

在 Vercel 等 Serverless 环境中，文件系统是只读的，无法直接写入文件。这会导致招聘编辑页面发布失败，错误信息：`EROFS: read-only file system`。

## 解决方案：使用 Vercel KV

当前代码已支持自动检测并使用 Vercel KV。只需完成以下配置：

### 步骤 1：在 Vercel 项目中添加 Upstash Redis 数据库

根据你提供的链接，通过 Vercel 的 Upstash 集成来配置：

#### 通过 Vercel Upstash 集成（推荐）

1. **访问集成页面**：
   - 在 Vercel 项目中，进入 **"Storage"** 标签
   - 或直接访问类似这样的链接：`https://vercel.com/[你的项目名]/~/integrations/upstash/...`
   - 点击 **"Browse Storage"** 或 **"Create Database"**

2. **选择 Upstash**：
   - 在 Marketplace 中找到 **"Upstash"**
   - 点击选择，然后点击 **"Continue"**

3. **创建或连接数据库**：
   - 如果首次使用，选择创建新的 Upstash 数据库
   - 设置数据库名称、区域和计划（可以选择免费套餐）
   - 如果已有 Upstash 账号，可以选择连接现有数据库

4. **完成集成**：
   - 按照提示完成配置
   - Vercel 会自动将环境变量添加到你的项目中

#### 环境变量说明

完成集成后，Vercel 会自动添加以下环境变量：
- `UPSTASH_REDIS_REST_URL` - Upstash Redis REST API URL
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis REST API Token

这些变量会自动配置，无需手动设置。

### 步骤 2：安装依赖

运行以下命令安装必要的依赖：

```bash
npm install
```

这会安装：
- `@upstash/redis` - Upstash Redis 客户端（已添加到 package.json）
- `@vercel/kv` - Vercel KV 客户端（已添加到 package.json，作为备选）

### 步骤 3：验证环境变量

完成 Upstash 集成后，验证环境变量是否已自动配置：

1. 进入 Vercel 项目设置 → **"Environment Variables"**
2. 确认以下变量已存在：
   - `UPSTASH_REDIS_REST_URL` - Upstash Redis REST API URL
   - `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis REST API Token

**通常无需手动配置！** Vercel 集成会自动添加这些变量。

如果变量不存在，可能需要：
- 重新完成集成流程
- 或检查集成是否成功连接

### 步骤 4：重新部署

提交代码并推送到 Git，Vercel 会自动重新部署。代码会自动检测 KV 环境变量并使用 KV 存储。

## 工作原理

代码会按以下顺序尝试存储：

1. **优先使用 Upstash Redis**：
   - 如果检测到 `UPSTASH_REDIS_REST_URL` 和 `UPSTASH_REDIS_REST_TOKEN`
   - 使用 `@upstash/redis` 客户端
   - 这是通过 Vercel Upstash 集成后的标准配置

2. **备选：Vercel KV**：
   - 如果检测到 `KV_REST_API_URL` 和 `KV_REST_API_TOKEN`
   - 使用 `@vercel/kv` 客户端

3. **回退：文件系统**：
   - 如果 KV/Redis 不可用，尝试使用文件系统（仅开发环境）

4. **错误提示**：
   - 如果文件系统只读，提供清晰的配置指南

## 兼容性说明

当前代码支持：
- ✅ **Upstash Redis**（通过 Vercel 集成，推荐）
  - 环境变量：`UPSTASH_REDIS_REST_URL` 和 `UPSTASH_REDIS_REST_TOKEN`
  - 使用 `@upstash/redis` 客户端
- ✅ **Vercel KV**（备选方案）
  - 环境变量：`KV_REST_API_URL` 和 `KV_REST_API_TOKEN`
  - 使用 `@vercel/kv` 客户端

代码会自动检测环境变量并使用相应的客户端。

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
