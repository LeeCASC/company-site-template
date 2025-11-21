# 管理页面身份验证配置指南

## ✅ 已实现的功能

1. ✅ **登录页面** - `/zh/admin/login` 或 `/en/admin/login`
2. ✅ **密码保护** - 使用环境变量配置密码
3. ✅ **会话管理** - 30分钟自动过期
4. ✅ **API 保护** - 所有编辑操作都需要认证
5. ✅ **自动登出** - 会话过期后自动重定向到登录页

## 🔧 配置步骤

### 步骤 1: 设置管理员密码

在项目根目录创建或编辑 `.env.local` 文件：

```bash
# 管理员密码（请使用强密码）
ADMIN_PASSWORD=your-strong-password-here
```

**密码要求**：
- 至少 12 位字符
- 包含大小写字母、数字和符号
- 不要使用常见密码

**示例**：
```bash
ADMIN_PASSWORD=MyCompany@2024!SecurePass
```

### 步骤 2: 在 Vercel 中配置（生产环境）

如果部署到 Vercel：

1. 进入 Vercel 项目设置
2. 进入 **Settings** → **Environment Variables**
3. 添加变量：
   - **Name**: `ADMIN_PASSWORD`
   - **Value**: 您的管理员密码
   - **Environment**: Production, Preview, Development（根据需要选择）

### 步骤 3: 重启开发服务器

```bash
npm run dev
```

## 🚀 使用方法

### 访问管理页面

1. 访问：`http://localhost:3000/zh/admin/careers` 或 `/en/admin/careers`
2. 系统会自动重定向到登录页面
3. 输入管理员密码
4. 登录成功后进入编辑界面

### 登录后

- ✅ 可以正常编辑所有招聘信息
- ✅ 会话有效期为 30 分钟
- ✅ 30 分钟无操作后自动登出
- ✅ 可以点击"退出登录"手动登出

## 🔒 安全说明

### 当前实现

- ✅ 密码存储在环境变量中（不暴露在代码中）
- ✅ 前端使用 sessionStorage 管理会话
- ✅ API 路由验证密码
- ✅ 会话自动过期（30分钟）

### 安全建议

1. **使用强密码**
   - 至少 12 位
   - 包含大小写、数字、符号
   - 定期更换

2. **HTTPS**
   - 生产环境必须使用 HTTPS
   - 防止密码在传输中被截获

3. **访问限制**
   - 考虑添加 IP 白名单（可选）
   - 记录访问日志（可选）

4. **定期检查**
   - 定期检查环境变量是否泄露
   - 定期更换密码

## 📋 文件说明

### 新增文件

- `app/[locale]/admin/login/page.tsx` - 登录页面
- `app/api/admin/auth/route.ts` - 认证 API
- `app/api/admin/token/route.ts` - Token 生成 API

### 修改文件

- `app/[locale]/admin/careers/page.tsx` - 添加了权限检查
- `app/api/careers/route.ts` - 添加了 API 保护

## 🔍 故障排除

### 问题：无法登录

**检查**：
1. 确认 `.env.local` 文件中设置了 `ADMIN_PASSWORD`
2. 确认密码输入正确
3. 重启开发服务器

### 问题：登录后立即被登出

**检查**：
1. 检查浏览器是否禁用了 sessionStorage
2. 检查是否有其他脚本清除了 sessionStorage
3. 查看浏览器控制台是否有错误

### 问题：API 返回 401 错误

**检查**：
1. 确认环境变量 `ADMIN_PASSWORD` 已正确配置
2. 确认服务器端可以读取环境变量
3. 检查 API 路由的认证逻辑

## 🎯 下一步

如果需要更高级的安全功能，可以考虑：

1. **JWT Token** - 更安全的 token 机制
2. **Session Cookie** - 使用 HTTP-only cookie
3. **多因素认证** - 添加二次验证
4. **访问日志** - 记录所有访问和操作

## 📞 需要帮助？

如果遇到问题，请检查：
1. 环境变量是否正确配置
2. 开发服务器是否重启
3. 浏览器控制台是否有错误信息


