# Vercel Deployment Hook 详细配置指南

## 📖 什么是 Vercel Deployment Hook？

Deployment Hook 是一个特殊的 URL，当您向这个 URL 发送 HTTP 请求时，Vercel 会自动触发一次新的部署。

**用途**：当 Sanity 内容更新时，自动触发 Vercel 重新部署，无需手动操作。

## 🎯 为什么需要 Deployment Hook？

虽然您的项目已经关联了 Git，但：
- Sanity 更新内容时，**不会自动推送到 Git**
- 需要手动触发部署，或使用 Deployment Hook 自动触发

## 📋 创建 Deployment Hook 步骤

### 步骤 1: 进入 Vercel 项目设置

1. 登录 [vercel.com](https://vercel.com)
2. 进入您的项目
3. 点击顶部菜单的 **"Settings"**（设置）

### 步骤 2: 找到 Deploy Hooks

1. 在左侧菜单中找到 **"Git"** 选项
2. 点击 **"Git"**
3. 向下滚动，找到 **"Deploy Hooks"**（部署钩子）部分

**如果找不到**：
- 可能在不同位置，尝试查找：
  - **Settings** → **Git** → **Deploy Hooks**
  - 或 **Settings** → **Deploy Hooks**
  - 或直接在设置页面搜索 "Deploy Hooks"

### 步骤 3: 创建新的 Hook

1. 在 **"Deploy Hooks"** 部分，点击 **"Create Hook"**（创建钩子）按钮

2. 填写信息：
   - **Name**（名称）：输入一个名称，例如：`sanity-update` 或 `sanity-webhook`
   - **Branch**（分支）：选择要部署的分支
     - 通常是 `main` 或 `master`
     - 选择您的主分支

3. 点击 **"Create Hook"** 或 **"Add Hook"**

### 步骤 4: 复制 Hook URL

创建成功后，您会看到一个 URL，类似：

```
https://api.vercel.com/v1/integrations/deploy/xxxxx/yyyyy
```

**重要**：立即复制这个 URL，稍后需要在 Sanity 中配置。

## 🔗 在 Sanity 中配置 Webhook

### 步骤 1: 进入 Sanity Webhook 设置

1. 登录 [sanity.io](https://www.sanity.io/)
2. 选择您的项目
3. 进入 **Settings**（设置）
4. 点击 **API**（API 设置）
5. 找到 **Webhooks**（Webhook）部分
6. 点击 **"Create webhook"**（创建 Webhook）

### 步骤 2: 配置 Webhook

填写以下信息：

#### 基本信息

- **Name**（名称）：`Vercel Auto Deploy` 或任意名称
- **URL**：粘贴刚才复制的 Vercel Deployment Hook URL
- **Dataset**：选择 `production`（或您使用的数据集）
- **HTTP method**：选择 `POST`

#### 触发条件

勾选以下选项：
- ✅ **Create** - 创建新文档时触发
- ✅ **Update** - 更新文档时触发
- ✅ **Delete** - 删除文档时触发

#### 过滤器（重要）

在 **Filter**（过滤器）字段中输入：

```
_type == "careersPage"
```

这确保只有招聘页面更新时才触发部署。

#### 其他设置

- **API version**：选择最新版本（通常是 `v2021-03-25` 或更新）
- **Secret**（可选）：如果需要验证，可以设置一个密钥

### 步骤 3: 保存

点击 **"Save"**（保存）按钮完成配置。

## 🧪 测试配置

### 测试方法 1: 在 Sanity 中测试

1. 访问 Sanity Studio：`https://your-domain.vercel.app/studio`
2. 编辑招聘信息
3. 点击 **"Publish"**（发布）
4. 进入 Vercel Dashboard → **Deployments**（部署）
5. 应该看到新的部署正在运行

### 测试方法 2: 使用 curl 测试

```bash
curl -X POST "YOUR_VERCEL_DEPLOYMENT_HOOK_URL"
```

如果成功，Vercel 会开始新的部署。

## 📸 界面说明

### Vercel 界面位置

```
Vercel Dashboard
  └── Your Project
      └── Settings（设置）
          └── Git（Git 设置）
              └── Deploy Hooks（部署钩子）← 在这里
                  └── Create Hook（创建钩子）
```

### 如果找不到 Deploy Hooks

可能的原因：
1. **项目类型**：某些项目类型可能不支持
2. **权限**：需要项目管理员权限
3. **位置不同**：可能在 **Settings** → **Integrations** 或其他位置

**解决方法**：
- 尝试在 Vercel 设置页面搜索 "deploy hook"
- 或查看 Vercel 文档：https://vercel.com/docs/concepts/git/deploy-hooks

## 🔄 工作流程

配置完成后的工作流程：

```
1. 客户在 Sanity Studio 编辑内容
   ↓
2. 点击 "Publish" 发布
   ↓
3. Sanity 发送 Webhook 到 Vercel Deployment Hook URL
   ↓
4. Vercel 检测到 Hook 触发
   ↓
5. Vercel 自动开始新的部署（2-5分钟）
   ↓
6. 部署完成后，前端页面显示最新内容
```

## ⚠️ 注意事项

### 1. Hook URL 安全

- Hook URL 就像密码，不要分享给他人
- 如果泄露，可以在 Vercel 中删除并重新创建

### 2. 部署频率

- 每次触发 Hook 都会创建新的部署
- 如果频繁更新，可能会有多个部署队列
- 这是正常的，Vercel 会按顺序处理

### 3. 分支选择

- 确保选择的是主分支（通常是 `main` 或 `master`）
- 这样部署的才是生产环境

## 🆘 常见问题

### Q: 找不到 "Deploy Hooks" 选项？

**A**: 
1. 确认您有项目管理员权限
2. 尝试刷新页面
3. 查看 Vercel 文档或联系 Vercel 支持

### Q: Hook 创建后如何使用？

**A**: 
1. 复制 Hook URL
2. 在 Sanity Webhook 配置中粘贴
3. 保存即可

### Q: 如何测试 Hook 是否工作？

**A**: 
1. 使用 curl 命令测试（见上方）
2. 或在 Sanity 中发布内容，查看 Vercel 是否有新部署

### Q: 可以创建多个 Hook 吗？

**A**: 
- 可以
- 每个 Hook 可以有不同的名称和分支
- 例如：一个用于生产，一个用于预览

## 📚 相关资源

- [Vercel Deploy Hooks 文档](https://vercel.com/docs/concepts/git/deploy-hooks)
- [Sanity Webhooks 文档](https://www.sanity.io/docs/webhooks)

## ✅ 配置检查清单

- [ ] 已找到 Vercel Deploy Hooks 设置
- [ ] 已创建新的 Hook
- [ ] 已复制 Hook URL
- [ ] 已在 Sanity 中配置 Webhook
- [ ] Webhook URL 已正确粘贴
- [ ] Filter 已设置为 `_type == "careersPage"`
- [ ] 触发条件已选择（Create、Update、Delete）
- [ ] 已测试 Hook 是否工作

---

**提示**：如果仍然找不到 Deploy Hooks，可以尝试联系 Vercel 支持，或使用 GitHub Actions 作为替代方案（见 `SANITY_AUTOMATION_SETUP.md`）。

