# Sanity CMS 快速开始指南

## 🎯 目标

客户在 Sanity Studio 编辑内容 → 自动触发 Vercel 部署 → 前端页面自动更新

## ⚡ 5 分钟快速配置

### 步骤 1: 创建 Sanity 项目（2分钟）

1. 访问 [sanity.io](https://www.sanity.io/) 并登录
2. 创建新项目
3. 记录 **Project ID**

### 步骤 2: 配置环境变量（1分钟）

在 Vercel 项目设置中添加：

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

**获取 API Token**：
- Sanity 后台 → Settings → API → Tokens → Add API token
- 权限选择：**Editor**

### 步骤 3: 创建 Vercel Deployment Hook（1分钟）

1. Vercel 项目 → Settings → Git → Deploy Hooks
2. Create Hook
3. 名称：`sanity-update`
4. 分支：`main`
5. **复制生成的 URL**

### 步骤 4: 配置 Sanity Webhook（1分钟）

1. Sanity 后台 → Settings → API → Webhooks
2. Create webhook
3. **URL**: 粘贴步骤 3 的 URL
4. **Dataset**: `production`
5. **Filter**: `_type == "careersPage"`
6. **Trigger on**: ✅ Create, ✅ Update, ✅ Delete
7. Save

## ✅ 完成！

现在客户可以：
1. 访问 `https://your-domain.vercel.app/studio`
2. 编辑招聘信息
3. 点击 "Publish"
4. 等待 2-5 分钟，前端自动更新

## 📚 详细文档

- **完整配置**：`SANITY_SETUP_COMPLETE.md`
- **客户指南**：`SANITY_CLIENT_GUIDE.md`
- **自动化配置**：`SANITY_AUTOMATION_SETUP.md`

