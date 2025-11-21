# Vercel 快速部署指南

## 🚀 5 分钟快速部署

### 步骤 1: 准备 Git 仓库

```bash
# 如果还没有 Git 仓库
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo-url
git push -u origin main
```

### 步骤 2: 在 Vercel 导入项目

1. 访问 https://vercel.com
2. 点击 **"Add New Project"**
3. 选择您的 Git 仓库
4. 点击 **"Import"**

### 步骤 3: 配置环境变量

在项目设置页面，添加以下环境变量：

#### 必需变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `ADMIN_PASSWORD` | 管理员密码 | `MyCompany@2024!Secure` |

#### 可选变量（如果使用 KV 存储）

| 变量名 | 说明 |
|--------|------|
| `KV_REST_API_URL` | KV 服务 URL |
| `KV_REST_API_TOKEN` | KV 服务 Token |

#### 配置方法

1. 在项目设置中找到 **"Environment Variables"**
2. 点击 **"Add"**
3. 输入变量名和值
4. 选择环境（Production、Preview、Development）
5. 点击 **"Save"**

### 步骤 4: 部署

1. 点击 **"Deploy"** 按钮
2. 等待 2-5 分钟
3. 部署完成！

### 步骤 5: 访问管理页面

部署完成后，访问：

```
https://your-project.vercel.app/zh/admin/login
```

输入您设置的管理员密码即可登录。

## ✅ 部署检查清单

- [ ] 代码已推送到 Git
- [ ] Vercel 项目已创建
- [ ] `ADMIN_PASSWORD` 环境变量已配置
- [ ] KV 环境变量已配置（如果使用）
- [ ] 部署成功
- [ ] 可以访问登录页面
- [ ] 可以成功登录

## 🔒 安全提醒

1. ✅ 使用强密码（至少 12 位）
2. ✅ 不要在代码中硬编码密码
3. ✅ 定期更换密码
4. ✅ 使用 HTTPS（Vercel 自动提供）

## 📝 后续更新

每次推送代码到主分支，Vercel 会自动重新部署。

如果需要手动部署：
- 在 Vercel Dashboard 点击 **"Redeploy"**
- 或使用 CLI：`vercel --prod`

## 🆘 遇到问题？

查看详细文档：`VERCEL_DEPLOYMENT.md`


