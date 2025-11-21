# Vercel Deployment Hook 替代方案

如果找不到 Vercel Deployment Hooks，可以使用以下替代方案：

## 🔄 方案 1: 使用 GitHub Actions（推荐）

### 工作原理

```
Sanity 更新 → GitHub API → GitHub Actions → Git Push → Vercel 自动部署
```

### 配置步骤

#### 1. 创建 GitHub Personal Access Token

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 点击 **"Generate new token"**
3. 设置名称：`Sanity Webhook`
4. 选择权限：
   - ✅ `repo`（完整仓库访问）
   - ✅ `workflow`（工作流权限）
5. 点击 **"Generate token"**
6. **立即复制 token**（只显示一次）

#### 2. 在 GitHub 配置 Secret

1. 进入您的 GitHub 仓库
2. **Settings** → **Secrets and variables** → **Actions**
3. 点击 **"New repository secret"**
4. 配置：
   - **Name**: `GITHUB_TOKEN`
   - **Secret**: 粘贴刚才复制的 Personal Access Token
5. 点击 **"Add secret"**

#### 3. 在 Sanity 配置 Webhook

1. Sanity 后台 → Settings → API → Webhooks
2. Create webhook
3. 配置：

   **URL**：
   ```
   https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches
   ```
   替换 `YOUR_USERNAME` 和 `YOUR_REPO` 为您的 GitHub 用户名和仓库名

   **HTTP method**: `POST`

   **Headers**：
   ```
   Authorization: token YOUR_GITHUB_TOKEN
   Accept: application/vnd.github.v3+json
   Content-Type: application/json
   ```
   将 `YOUR_GITHUB_TOKEN` 替换为您的 Personal Access Token

   **Body** (JSON)：
   ```json
   {
     "event_type": "sanity-updated",
     "client_payload": {
       "document": "{{document}}"
     }
   }
   ```

   **Dataset**: `production`
   **Filter**: `_type == "careersPage"`
   **Trigger on**: ✅ Create, ✅ Update, ✅ Delete

4. 保存

### 工作原理

1. Sanity 更新时，发送请求到 GitHub API
2. GitHub 触发 `repository_dispatch` 事件
3. GitHub Actions 工作流（`.github/workflows/sanity-webhook.yml`）运行
4. 工作流创建一个空的 commit 并推送到 Git
5. Vercel 检测到 Git push，自动部署

## 🔄 方案 2: 使用 Vercel API（需要 Vercel Token）

### 配置步骤

#### 1. 获取 Vercel Token

1. Vercel → Settings → Tokens
2. Create Token
3. 设置名称和过期时间
4. 复制 token

#### 2. 在 Sanity 配置 Webhook

使用自定义 Webhook 端点，调用 Vercel API 触发部署。

**注意**：此方案需要创建自定义 API 端点，较复杂。

## 🔄 方案 3: 手动触发（最简单，但不自动）

如果以上方案都不可行，可以：

1. 客户在 Sanity 编辑并发布
2. 您手动在 Vercel Dashboard 点击 **"Redeploy"**
3. 或推送一个空的 commit 到 Git

## 💡 推荐方案

**首选**：方案 1（GitHub Actions）
- ✅ 完全自动化
- ✅ 不需要 Vercel Deployment Hook
- ✅ 可以记录部署历史

**备选**：如果项目没有连接 Git，使用方案 3（手动触发）

## 📝 配置检查

使用 GitHub Actions 方案时，确保：

- [ ] GitHub Personal Access Token 已创建
- [ ] Token 已添加到 GitHub Secrets
- [ ] `.github/workflows/sanity-webhook.yml` 文件存在
- [ ] Sanity Webhook 已配置 GitHub API URL
- [ ] Webhook Headers 已正确设置
- [ ] 已测试 Webhook 是否工作

## 🧪 测试

1. 在 Sanity 中编辑并发布内容
2. 查看 GitHub Actions 是否运行：
   - GitHub 仓库 → Actions 标签页
3. 查看 Vercel 是否有新部署：
   - Vercel Dashboard → Deployments

---

**详细说明请查看**：`VERCEL_HOOK_GUIDE.md` 和 `SANITY_AUTOMATION_SETUP.md`

