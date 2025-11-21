# Sanity CMS 完整配置指南

## 🎯 系统架构

```
客户在 Sanity Studio 编辑内容
    ↓
点击 "Publish" 发布
    ↓
Sanity Webhook 触发
    ↓
Vercel 自动重新部署（2-5分钟）
    ↓
前端页面自动显示最新内容
```

## ✅ 已完成的配置

1. ✅ Sanity Schema 已定义
2. ✅ Sanity Studio 页面已创建（`/studio`）
3. ✅ API 路由已更新（支持从 Sanity 读取）
4. ✅ Webhook 端点已创建（`/api/sanity/webhook`）

## 📋 配置步骤

### 步骤 1: 创建 Sanity 项目

1. 访问 [sanity.io](https://www.sanity.io/)
2. 注册/登录账号
3. 创建新项目
4. 记录 **Project ID**

### 步骤 2: 配置环境变量

在 Vercel 项目设置中添加以下环境变量：

```bash
# Sanity 配置（必需）
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token

# Webhook 安全（可选，但推荐）
SANITY_WEBHOOK_SECRET=your-random-secret
```

#### 获取 API Token

1. Sanity 管理后台 → **Settings** → **API** → **Tokens**
2. 点击 **"Add API token"**
3. 设置名称：`Website Editor`
4. 权限：**Editor**
5. 复制生成的 Token

### 步骤 3: 创建 Vercel Deployment Hook

**详细步骤**（如果找不到，请查看 `VERCEL_HOOK_GUIDE.md`）：

1. 进入 Vercel 项目
2. 点击顶部菜单的 **"Settings"**（设置）
3. 在左侧菜单找到 **"Git"** 并点击
4. 向下滚动找到 **"Deploy Hooks"**（部署钩子）部分
5. 点击 **"Create Hook"**（创建钩子）按钮
6. 填写信息：
   - **Name**（名称）：`sanity-update` 或任意名称
   - **Branch**（分支）：选择主分支（通常是 `main` 或 `master`）
7. 点击 **"Create Hook"** 或 **"Add Hook"**
8. **重要**：立即复制生成的 URL（类似：`https://api.vercel.com/v1/integrations/deploy/xxxxx/yyyyy`）

**如果找不到 Deploy Hooks**：
- 可能在不同位置，尝试在设置页面搜索 "deploy hook"
- 或查看详细指南：`VERCEL_HOOK_GUIDE.md`

### 步骤 4: 配置 Sanity Webhook

1. 进入 Sanity 管理后台
2. **Settings** → **API** → **Webhooks**
3. 点击 **"Create webhook"**
4. 配置如下：

   **基本信息**：
   - **Name**: `Vercel Auto Deploy`
   - **URL**: 粘贴步骤 3 中复制的 Vercel Deployment Hook URL
   - **Dataset**: `production`
   - **HTTP method**: `POST`

   **触发条件**：
   - ✅ **Create** - 创建新文档时
   - ✅ **Update** - 更新文档时
   - ✅ **Delete** - 删除文档时

   **过滤器**（重要）：
   ```
   _type == "careersPage"
   ```
   这样只有招聘页面更新时才会触发部署

   **Headers**（如果配置了 Secret）：
   ```
   x-sanity-webhook-secret: YOUR_WEBHOOK_SECRET
   ```

5. 点击 **"Save"**

### 步骤 5: 配置 CORS Origin（重要）

**首次访问 Studio 时必须配置！**

1. 访问：`http://localhost:3000/studio`（本地）或 `https://your-domain.vercel.app/studio`（生产）
2. 如果看到 CORS 提示，点击 **"Continue"** 按钮
3. 或手动配置：
   - Sanity 后台 → Settings → API → CORS origins
   - 点击 **"Add CORS origin"**
   - 添加：
     - 本地：`http://localhost:3000`
     - 生产：`https://your-domain.vercel.app`
   - 勾选 **"Allow credentials"**
   - 点击 **"Add"**
4. 返回 Studio 页面刷新

**详细步骤**：查看 `SANITY_CORS_SETUP.md`

### 步骤 6: 初始化数据

1. 访问：`https://your-domain.vercel.app/studio`
2. 登录 Sanity 账号
3. 在左侧菜单找到 **"招聘页面"**
4. 如果没有文档，点击 **"Create"** 创建
5. 填写初始数据
6. 点击 **"Publish"**

## 🧪 测试流程

### 1. 测试编辑功能

1. 访问 `/studio`
2. 编辑招聘信息
3. 点击 **"Publish"**
4. 应该看到发布成功提示

### 2. 测试自动部署

1. 发布后，进入 Vercel Dashboard
2. 查看 **Deployments** 标签页
3. 应该看到新的部署正在运行
4. 等待 2-5 分钟部署完成

### 3. 验证前端更新

1. 部署完成后，访问前端页面
2. 应该看到最新内容

## 🔄 工作流程

### 客户操作流程

1. **访问 Sanity Studio**
   ```
   https://your-domain.vercel.app/studio
   ```

2. **编辑内容**
   - 修改职位信息
   - 修改联系方式
   - 添加/删除职位

3. **发布**
   - 点击右上角 **"Publish"** 按钮
   - 确认发布

4. **等待自动部署**
   - 系统自动触发 Vercel 部署
   - 等待 2-5 分钟

5. **查看效果**
   - 访问前端页面查看最新内容

### 自动化流程

```
客户发布 → Sanity Webhook → Vercel Deployment Hook → 自动部署 → 前端更新
```

## 📝 配置检查清单

- [ ] Sanity 项目已创建
- [ ] 环境变量已配置（Vercel）
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_SANITY_DATASET`
  - [ ] `SANITY_API_TOKEN`
  - [ ] `SANITY_WEBHOOK_SECRET`（可选）
- [ ] Vercel Deployment Hook 已创建
- [ ] Sanity Webhook 已配置
  - [ ] URL 正确
  - [ ] Filter 正确（`_type == "careersPage"`）
  - [ ] 触发条件已选择
- [ ] Sanity Studio 可以访问（`/studio`）
- [ ] 可以编辑和发布内容
- [ ] 测试自动部署功能

## 🆘 故障排除

### 问题 1: 无法访问 `/studio`

**解决**：
1. 检查环境变量 `NEXT_PUBLIC_SANITY_PROJECT_ID` 是否配置
2. 确认已安装 `sanity` 包
3. 重启开发服务器或重新部署

### 问题 2: Webhook 未触发

**解决**：
1. 检查 Sanity Webhook 配置
2. 确认 Filter 是否正确：`_type == "careersPage"`
3. 确认触发条件已选择（Create、Update、Delete）
4. 查看 Sanity Webhook 日志

### 问题 3: 部署未触发

**解决**：
1. 检查 Vercel Deployment Hook URL 是否正确
2. 测试 Webhook URL 是否有效
3. 查看 Vercel 部署日志

### 问题 4: 内容未更新

**解决**：
1. 确认在 Sanity 中已点击 "Publish"（不是草稿）
2. 等待部署完成（2-5 分钟）
3. 清除浏览器缓存
4. 检查 API 是否返回最新数据

## 📚 相关文档

- **客户使用指南**：`SANITY_CLIENT_GUIDE.md`
- **自动化配置**：`SANITY_AUTOMATION_SETUP.md`
- **Vercel 部署**：`VERCEL_DEPLOYMENT.md`

## 🎉 完成

配置完成后，客户只需：
1. 访问 `/studio`
2. 编辑内容
3. 点击 "Publish"

系统会自动处理后续所有步骤！

