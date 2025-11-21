# Vercel 部署指南

## ✅ 可以部署

管理页面完全可以通过 Vercel 部署，包括：
- ✅ 登录页面
- ✅ 管理编辑页面
- ✅ API 路由
- ✅ 身份验证功能

## 🚀 部署步骤

### 方法 1: 通过 Vercel Dashboard（推荐）

#### 步骤 1: 准备代码

1. 确保代码已提交到 Git 仓库（GitHub、GitLab 或 Bitbucket）
2. 确保所有依赖已安装（`package.json` 完整）

#### 步骤 2: 在 Vercel 创建项目

1. 访问 [vercel.com](https://vercel.com)
2. 登录账号（如果没有，使用 GitHub 账号注册）
3. 点击 **"Add New Project"** 或 **"Import Project"**
4. 选择您的 Git 仓库
5. 点击 **"Import"**

#### 步骤 3: 配置项目

Vercel 会自动检测 Next.js 项目，通常无需额外配置：

- **Framework Preset**: Next.js（自动检测）
- **Root Directory**: `./`（默认）
- **Build Command**: `npm run build`（自动）
- **Output Directory**: `.next`（自动）

#### 步骤 4: 配置环境变量

**重要**：在部署前必须配置环境变量！

1. 在项目设置页面，找到 **"Environment Variables"** 部分
2. 添加以下环境变量：

##### 必需的环境变量

```bash
# 管理员密码（必需）
ADMIN_PASSWORD=your-strong-password-here

# KV 存储（如果使用）
KV_REST_API_URL=your-kv-url
KV_REST_API_TOKEN=your-kv-token

# 或者 Upstash Redis（如果使用）
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

##### 配置说明

对于每个环境变量：
- **Name**: 变量名（如 `ADMIN_PASSWORD`）
- **Value**: 变量值（您的密码或配置）
- **Environment**: 选择应用环境
  - ✅ **Production** - 生产环境（必须）
  - ✅ **Preview** - 预览环境（建议）
  - ✅ **Development** - 开发环境（可选）

#### 步骤 5: 部署

1. 点击 **"Deploy"** 按钮
2. 等待构建完成（通常 2-5 分钟）
3. 部署成功后，Vercel 会提供一个 URL（如：`your-project.vercel.app`）

### 方法 2: 通过 Vercel CLI

#### 步骤 1: 安装 Vercel CLI

```bash
npm i -g vercel
```

#### 步骤 2: 登录

```bash
vercel login
```

#### 步骤 3: 部署

```bash
# 在项目根目录执行
vercel
```

#### 步骤 4: 配置环境变量

```bash
# 设置环境变量
vercel env add ADMIN_PASSWORD production
# 输入密码后按回车

# 设置其他环境变量
vercel env add KV_REST_API_URL production
vercel env add KV_REST_API_TOKEN production
```

#### 步骤 5: 重新部署

```bash
vercel --prod
```

## 🔒 安全配置

### 1. 环境变量安全

✅ **正确做法**：
- 密码存储在 Vercel 环境变量中
- 不在代码中硬编码密码
- 使用强密码（至少 12 位）

❌ **错误做法**：
- 在代码中写死密码
- 将 `.env.local` 提交到 Git
- 使用弱密码

### 2. HTTPS

Vercel 自动提供 HTTPS，无需额外配置。

### 3. 访问控制（可选）

如果需要更严格的访问控制，可以考虑：

1. **IP 白名单**（需要 Vercel Pro）
2. **Vercel 访问控制**（Vercel 企业版功能）
3. **自定义中间件**（在代码中实现）

## 📋 部署后访问

### 管理页面地址

部署成功后，管理页面可以通过以下地址访问：

```
https://your-project.vercel.app/zh/admin/careers
https://your-project.vercel.app/en/admin/careers
```

### 登录页面

```
https://your-project.vercel.app/zh/admin/login
https://your-project.vercel.app/en/admin/login
```

## 🔍 验证部署

### 1. 检查环境变量

部署后，在 Vercel Dashboard 中：
1. 进入项目 → **Settings** → **Environment Variables**
2. 确认所有环境变量都已配置
3. 确认环境变量已应用到正确的环境（Production/Preview）

### 2. 测试功能

1. 访问管理页面 → 应该重定向到登录页
2. 输入密码登录 → 应该成功进入编辑界面
3. 编辑内容并保存 → 应该成功保存
4. 检查数据是否保存到 KV/Redis

### 3. 查看日志

如果遇到问题：
1. 进入 Vercel Dashboard → **Deployments**
2. 点击最新的部署
3. 查看 **"Functions"** 标签页的日志
4. 查看 **"Runtime Logs"** 了解运行时错误

## ⚠️ 常见问题

### 问题 1: 登录失败

**原因**：环境变量未配置或配置错误

**解决**：
1. 检查 Vercel 环境变量中是否有 `ADMIN_PASSWORD`
2. 确认密码值正确
3. 确认环境变量已应用到 Production 环境
4. 重新部署项目

### 问题 2: API 返回 401 错误

**原因**：API 路由无法读取环境变量

**解决**：
1. 确认环境变量已配置
2. 确认环境变量名称正确（`ADMIN_PASSWORD`）
3. 检查 Vercel 函数日志
4. 重新部署

### 问题 3: 数据无法保存

**原因**：KV/Redis 配置错误

**解决**：
1. 检查 KV 环境变量是否正确配置
2. 确认 KV 服务是否正常运行
3. 查看 API 日志了解具体错误

### 问题 4: 构建失败

**原因**：依赖问题或代码错误

**解决**：
1. 本地运行 `npm run build` 检查是否有错误
2. 查看 Vercel 构建日志
3. 确认所有依赖都已正确安装

## 📝 部署清单

部署前请确认：

- [ ] 代码已提交到 Git 仓库
- [ ] 本地测试通过（`npm run build` 成功）
- [ ] 环境变量 `ADMIN_PASSWORD` 已配置
- [ ] KV/Redis 环境变量已配置（如果使用）
- [ ] 密码足够强（至少 12 位）
- [ ] `.env.local` 已添加到 `.gitignore`（不会提交到 Git）

## 🔄 更新部署

### 自动部署

如果连接了 Git 仓库，每次推送代码到主分支，Vercel 会自动部署。

### 手动部署

1. 在 Vercel Dashboard 中点击 **"Redeploy"**
2. 或使用 CLI：`vercel --prod`

## 🎯 最佳实践

1. **使用环境变量** - 不要硬编码敏感信息
2. **定期更新密码** - 建议每 3-6 个月更换一次
3. **监控访问** - 定期检查 Vercel 日志
4. **备份数据** - 定期备份 KV/Redis 中的数据
5. **使用强密码** - 至少 12 位，包含大小写、数字、符号

## 📞 需要帮助？

如果遇到部署问题：

1. 查看 Vercel 文档：https://vercel.com/docs
2. 检查 Vercel 社区：https://github.com/vercel/vercel/discussions
3. 查看项目日志：Vercel Dashboard → Deployments → Logs


