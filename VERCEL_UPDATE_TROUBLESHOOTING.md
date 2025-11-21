# Vercel 部署后无法看到更新的问题排查

## 🔍 问题诊断

如果 Vercel 部署后无法看到 Sanity 的更新，请按以下步骤排查：

## ✅ 检查清单

### 1. 环境变量配置

**在 Vercel 项目设置中检查以下环境变量：**

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

**检查方法：**
1. 进入 Vercel Dashboard
2. 选择您的项目
3. 进入 **Settings** → **Environment Variables**
4. 确认所有变量都已配置

### 2. Sanity 数据是否已更新

**检查方法：**
1. 访问：`https://your-domain.vercel.app/studio`
2. 登录 Sanity
3. 查看招聘页面数据是否已更新
4. 确认已点击 **"Publish"**（未发布的内容不会显示）

### 3. API 路由是否正常工作

**测试方法：**
1. 访问：`https://your-domain.vercel.app/api/careers`
2. 应该返回 JSON 数据
3. 检查响应头中的 `X-Data-Source`：
   - `sanity` = 从 Sanity 读取（正确）
   - `fallback` = 从其他存储读取（可能有问题）

### 4. 浏览器缓存问题

**解决方法：**
1. **硬刷新**：`Ctrl + Shift + R` (Windows) 或 `Cmd + Shift + R` (Mac)
2. **清除缓存**：
   - Chrome: 设置 → 隐私和安全 → 清除浏览数据
   - 选择"缓存的图片和文件"
3. **使用无痕模式**测试

### 5. Vercel 部署是否完成

**检查方法：**
1. 进入 Vercel Dashboard → Deployments
2. 确认最新部署状态为 **"Ready"**
3. 如果显示 "Building" 或 "Error"，等待完成或查看错误日志

## 🔧 常见问题及解决方案

### 问题 1: API 返回旧数据

**原因：**
- Sanity CDN 缓存
- Vercel Edge 缓存
- 浏览器缓存

**解决方案：**
1. ✅ 已修复：代码中已禁用 Sanity CDN（`useCdn: false`）
2. ✅ 已修复：API 路由已设置 `no-store` 缓存控制
3. 手动清除浏览器缓存（见上方）

### 问题 2: 环境变量未配置

**症状：**
- API 返回默认数据
- 响应头 `X-Data-Source: fallback`

**解决方案：**
1. 在 Vercel 项目设置中添加环境变量
2. 重新部署项目
3. 等待部署完成后再测试

### 问题 3: Sanity 数据未发布

**症状：**
- Studio 中有数据，但前端显示旧数据

**解决方案：**
1. 进入 Studio：`https://your-domain.vercel.app/studio`
2. 确认数据已点击 **"Publish"**（不是 "Save draft"）
3. 等待几秒钟让数据同步

### 问题 4: Webhook 未触发部署

**症状：**
- 在 Studio 更新后，Vercel 没有自动部署

**解决方案：**
1. 检查 Sanity Webhook 配置：
   - Sanity 后台 → Settings → API → Webhooks
   - 确认 Webhook URL 正确
   - 确认 Filter 为：`_type == "careersPage"`

2. 检查 Vercel Deployment Hook：
   - Vercel → Settings → Git → Deploy Hooks
   - 确认 Hook 已创建
   - 测试 Hook URL 是否有效

3. 手动触发部署：
   - Vercel Dashboard → Deployments → "Redeploy"

## 🧪 测试步骤

### 步骤 1: 验证环境变量

在 Vercel 函数日志中查看（如果可用）：
```
[Careers API] NEXT_PUBLIC_SANITY_PROJECT_ID not configured
```

如果看到此警告，说明环境变量未配置。

### 步骤 2: 测试 API

```bash
# 使用 curl 测试（替换为您的域名）
curl -v https://your-domain.vercel.app/api/careers

# 检查响应头
# 应该看到：X-Data-Source: sanity
```

### 步骤 3: 测试 Sanity 连接

1. 访问：`https://your-domain.vercel.app/studio`
2. 编辑招聘信息
3. 点击 **"Publish"**
4. 等待 10-30 秒
5. 访问：`https://your-domain.vercel.app/api/careers`
6. 检查返回的数据是否已更新

### 步骤 4: 检查部署日志

1. Vercel Dashboard → Deployments → 选择最新部署
2. 查看 **"Build Logs"**
3. 查找错误信息：
   - `Sanity read error`
   - `NEXT_PUBLIC_SANITY_PROJECT_ID not configured`
   - `Error fetching careers data from Sanity`

## 🚀 快速修复

### 方法 1: 重新部署

1. Vercel Dashboard → Deployments
2. 点击最新部署右侧的 **"..."** 菜单
3. 选择 **"Redeploy"**
4. 等待部署完成

### 方法 2: 清除 Vercel 缓存

1. Vercel Dashboard → Settings → Data Cache
2. 清除缓存（如果可用）
3. 或通过 Vercel CLI：
   ```bash
   vercel --prod --force
   ```

### 方法 3: 手动触发 Webhook

1. 在 Sanity Studio 中做一个小改动
2. 点击 **"Publish"**
3. 这应该触发 Webhook 并重新部署

## 📊 调试信息

### 查看 API 响应头

```bash
curl -I https://your-domain.vercel.app/api/careers
```

**应该看到：**
```
Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0
X-Data-Source: sanity
```

### 查看完整响应

```bash
curl https://your-domain.vercel.app/api/careers | jq
```

检查返回的数据是否是最新的。

## 🔄 完整更新流程

1. **客户在 Studio 编辑**
   - 访问：`https://your-domain.vercel.app/studio`
   - 修改内容
   - 点击 **"Publish"**

2. **Sanity 触发 Webhook**
   - 发送请求到 Vercel Deployment Hook
   - 或触发 GitHub Actions

3. **Vercel 重新部署**
   - 检测到 Webhook
   - 开始构建
   - 通常需要 2-5 分钟

4. **前端更新**
   - 部署完成后，访问 API
   - 应该返回最新数据
   - 前端页面自动显示新内容

## ⚠️ 注意事项

1. **首次部署后需要等待**：首次配置环境变量后，需要重新部署才能生效

2. **Webhook 延迟**：Sanity Webhook 可能有几秒钟延迟

3. **Vercel 构建时间**：每次部署需要 2-5 分钟，请耐心等待

4. **浏览器缓存**：如果更新后仍看到旧内容，尝试硬刷新或清除缓存

## 📞 如果问题仍然存在

1. **检查 Vercel 函数日志**：
   - Vercel Dashboard → Functions
   - 查看 `/api/careers` 的日志
   - 查找错误信息

2. **检查 Sanity 项目**：
   - 确认 Project ID 正确
   - 确认 Dataset 名称正确（通常是 `production`）
   - 确认 API Token 有读取权限

3. **联系支持**：
   - 提供 Vercel 部署日志
   - 提供 API 响应示例
   - 提供环境变量配置（隐藏敏感信息）

---

**最后更新**：已修复 Sanity CDN 缓存问题，现在应该能实时获取最新数据。

