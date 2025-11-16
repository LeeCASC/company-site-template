# 生产环境部署修复指南

## 问题描述

在生产环境（如 Vercel）中，文件系统是只读的，无法直接写入文件。这会导致招聘编辑页面发布失败，错误信息：`EROFS: read-only file system`。

## 解决方案

### 方案 1：使用 Vercel KV（推荐，如果部署在 Vercel）

1. **在 Vercel 项目中添加 KV 数据库**：
   - 登录 Vercel 控制台
   - 进入项目设置
   - 在 "Storage" 部分添加 "KV" 数据库

2. **安装依赖**：
   ```bash
   npm install @vercel/kv
   ```

3. **配置环境变量**：
   - Vercel 会自动添加 `KV_REST_API_URL` 和 `KV_REST_API_TOKEN` 环境变量

4. **替换 API 路由**：
   - 将 `app/api/careers/route-kv.ts.example` 重命名为 `route.ts`
   - 备份原有的 `route.ts` 文件

### 方案 2：使用其他数据库

可以使用 PostgreSQL、MongoDB、Supabase 等数据库服务。

### 方案 3：使用外部 API

将数据存储到外部 API 服务（如 Firebase、Supabase 等）。

## 当前状态

当前代码已经：
- ✅ 添加了 POST 方法作为 PUT 的备选
- ✅ 改进了错误处理，提供更清晰的错误信息
- ✅ 自动检测只读文件系统错误

## 临时解决方案

在配置数据库之前，可以使用：
- 本地开发环境：文件系统存储正常工作
- 生产环境：需要配置数据库或使用 Vercel KV

## 下一步

1. 如果部署在 Vercel：使用方案 1（Vercel KV）
2. 如果部署在其他平台：使用方案 2 或 3

