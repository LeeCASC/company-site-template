# Sanity CMS + 自动化部署配置指南

## 🎯 系统架构

```
客户在 Sanity Studio 编辑
    ↓
Sanity Webhook 触发
    ↓
GitHub Actions / Vercel Webhook
    ↓
Vercel 自动重新部署
    ↓
前端页面自动更新
```

## 📋 配置步骤

### 步骤 1: 配置 Sanity 项目

1. **创建 Sanity 项目**
   - 访问 [sanity.io](https://www.sanity.io/)
   - 创建新项目
   - 记录 Project ID

2. **配置环境变量**

在 Vercel 项目设置中添加：

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
SANITY_WEBHOOK_SECRET=your-webhook-secret (可选，用于验证)
```

### 步骤 2: 配置 Sanity Webhook

#### 方法 1: 直接触发 Vercel（推荐）

1. **获取 Vercel Deployment Hook URL**
   - 进入 Vercel 项目设置
   - 进入 **Settings** → **Git** → **Deploy Hooks**
   - 点击 **"Create Hook"**
   - 设置名称：`sanity-update`
   - 选择分支：`main` 或 `master`
   - 复制生成的 URL（类似：`https://api.vercel.com/v1/integrations/deploy/...`）

2. **在 Sanity 配置 Webhook**
   - 进入 Sanity 管理后台
   - **Settings** → **API** → **Webhooks**
   - 点击 **"Create webhook"**
   - 配置如下：
     - **Name**: `Vercel Deploy`
     - **URL**: 粘贴 Vercel Deployment Hook URL
     - **Dataset**: `production`
     - **Trigger on**: 选择 `Create`、`Update`、`Delete`
     - **Filter**: `_type == "careersPage"`
     - **HTTP method**: `POST`
     - **API version**: `v2021-03-25`
   - 点击 **"Save"**

#### 方法 2: 通过 GitHub Actions（更灵活）

1. **创建 GitHub Personal Access Token**
   - GitHub → Settings → Developer settings → Personal access tokens
   - 创建新 token，权限：`repo`、`workflow`
   - 复制 token

2. **在 GitHub 配置 Secret**
   - 进入 GitHub 仓库
   - **Settings** → **Secrets and variables** → **Actions**
   - 添加 Secret：`GITHUB_TOKEN` = 您的 Personal Access Token

3. **在 Sanity 配置 Webhook**
   - **URL**: `https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches`
   - **HTTP method**: `POST`
   - **Headers**: 
     ```
     Authorization: token YOUR_GITHUB_TOKEN
     Accept: application/vnd.github.v3+json
     ```
   - **Body** (JSON):
     ```json
     {
       "event_type": "sanity-updated",
       "client_payload": {
         "document": "{{document}}"
       }
     }
     ```

### 步骤 3: 测试 Webhook

1. **在 Sanity Studio 编辑内容**
   - 访问：`https://your-domain.vercel.app/studio`
   - 登录并编辑招聘信息
   - 点击 **"Publish"**

2. **检查是否触发部署**
   - 查看 Vercel Dashboard → Deployments
   - 应该看到新的部署正在运行
   - 或查看 GitHub Actions 运行记录

## 🔄 自动化流程

### 完整流程

1. **客户在 Sanity Studio 编辑**
   - 访问 `/studio`
   - 修改招聘信息
   - 点击 "Publish"

2. **Sanity 触发 Webhook**
   - 发送 POST 请求到配置的 URL
   - 包含更新信息

3. **Vercel 自动部署**
   - 检测到 Webhook 触发
   - 自动重新构建和部署
   - 通常需要 2-5 分钟

4. **前端页面更新**
   - 部署完成后，前端页面自动显示最新内容
   - 无需手动操作

## ⚙️ 配置选项

### 选项 1: Vercel Deployment Hook（最简单）

**优点**：
- ✅ 配置简单
- ✅ 直接触发部署
- ✅ 无需 GitHub Actions

**缺点**：
- ⚠️ 每次都会完整重新部署
- ⚠️ 无法自定义部署流程

### 选项 2: GitHub Actions（推荐）

**优点**：
- ✅ 更灵活
- ✅ 可以添加自定义步骤
- ✅ 可以记录部署历史

**缺点**：
- ⚠️ 需要配置 GitHub token
- ⚠️ 稍微复杂一些

### 选项 3: Next.js Revalidation（最快）

**优点**：
- ✅ 最快（几秒钟）
- ✅ 不需要完整重新部署
- ✅ 只更新缓存

**缺点**：
- ⚠️ 需要 Next.js 13+ App Router
- ⚠️ 某些情况下可能需要完整部署

## 📝 环境变量说明

| 变量名 | 必需 | 说明 |
|--------|------|------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ | Sanity 项目 ID |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ | 数据集名称（通常是 `production`） |
| `SANITY_API_TOKEN` | ✅ | Sanity API Token（Editor 权限） |
| `SANITY_WEBHOOK_SECRET` | ⚪ | Webhook 验证密钥（可选，但推荐） |

## 🔒 安全配置

### Webhook 验证

为了安全，建议配置 Webhook Secret：

1. **生成随机密钥**
   ```bash
   openssl rand -hex 32
   ```

2. **在 Vercel 配置**
   - 环境变量：`SANITY_WEBHOOK_SECRET` = 生成的密钥

3. **在 Sanity 配置**
   - Webhook Headers: `x-sanity-webhook-secret: YOUR_SECRET`

## 🧪 测试

### 测试 Webhook

1. **使用 curl 测试**
   ```bash
   curl -X POST https://your-domain.vercel.app/api/sanity/webhook \
     -H "Content-Type: application/json" \
     -H "x-sanity-webhook-secret: YOUR_SECRET" \
     -d '{"_type": "careersPage"}'
   ```

2. **在 Sanity 测试**
   - 编辑并发布内容
   - 查看 Vercel Dashboard 是否有新部署
   - 查看 GitHub Actions 是否运行

## 📊 监控

### 查看部署状态

1. **Vercel Dashboard**
   - 项目 → Deployments
   - 查看最新部署状态

2. **GitHub Actions**
   - 仓库 → Actions
   - 查看工作流运行记录

3. **Sanity Webhook 日志**
   - Sanity 管理后台 → Settings → API → Webhooks
   - 查看 Webhook 调用历史

## 🆘 故障排除

### Webhook 未触发

1. 检查 Sanity Webhook 配置
2. 检查 URL 是否正确
3. 检查 Filter 是否正确（`_type == "careersPage"`）
4. 查看 Sanity Webhook 日志

### 部署未触发

1. 检查 Vercel Deployment Hook 是否有效
2. 检查 GitHub Actions 是否配置正确
3. 查看 Vercel/GitHub 日志

### 内容未更新

1. 确认 Sanity 内容已发布（不是草稿）
2. 等待部署完成（2-5 分钟）
3. 清除浏览器缓存
4. 检查 API 是否返回最新数据

## 📚 相关文档

- [Sanity Webhooks 文档](https://www.sanity.io/docs/webhooks)
- [Vercel Deployment Hooks](https://vercel.com/docs/concepts/git/deploy-hooks)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

## ✅ 配置检查清单

- [ ] Sanity 项目已创建
- [ ] 环境变量已配置（Vercel）
- [ ] Sanity Studio 可以访问（`/studio`）
- [ ] Webhook 已配置（Sanity）
- [ ] Vercel Deployment Hook 已创建（或 GitHub Actions 已配置）
- [ ] 测试编辑和发布功能
- [ ] 验证自动部署是否工作
- [ ] 验证前端页面是否自动更新

---

**配置完成后，客户只需在 Sanity Studio 编辑内容，系统会自动处理后续所有步骤！**

