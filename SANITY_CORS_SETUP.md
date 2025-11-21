# Sanity CORS Origin 配置指南

## 🔒 什么是 CORS Origin？

CORS（跨域资源共享）是浏览器的安全机制。Sanity 需要知道哪些网站可以访问您的数据，以防止未授权访问。

## 📋 配置步骤

### 步骤 1: 登录 Sanity 管理后台

1. 访问 [sanity.io](https://www.sanity.io/)
2. 登录您的账号
3. 选择您的项目

### 步骤 2: 进入 API 设置

1. 点击左侧菜单的 **Settings**（设置）
2. 选择 **API**（API 设置）

### 步骤 3: 添加 CORS Origin

1. 在 **API** 页面，找到 **CORS origins**（CORS 来源）部分
2. 点击 **"Add CORS origin"**（添加 CORS 来源）按钮

### 步骤 4: 配置 CORS Origin

#### 对于本地开发环境

填写以下信息：

- **Origin**（来源）：
  ```
  http://localhost:3000
  ```
  
- **Allow credentials**（允许凭证）：
  - ✅ 勾选（如果需要）

- **点击 "Add"**（添加）

#### 对于生产环境（Vercel 部署后）

还需要添加生产环境的 URL：

- **Origin**：
  ```
  https://your-domain.vercel.app
  ```
  替换 `your-domain.vercel.app` 为您的实际域名

- **Allow credentials**：
  - ✅ 勾选

- **点击 "Add"**

### 步骤 5: 保存并刷新

1. 配置完成后，返回 Studio 页面
2. 刷新浏览器页面（F5）
3. 应该可以正常访问了

## 📝 需要添加的 CORS Origins

### 本地开发

```
http://localhost:3000
```

如果使用其他端口，也需要添加：
```
http://localhost:3001
http://localhost:3002
```

### 生产环境

```
https://your-domain.vercel.app
```

如果使用自定义域名：
```
https://www.yourdomain.com
https://yourdomain.com
```

### 预览环境（如果使用）

```
https://your-project-git-main.vercel.app
https://your-project-*.vercel.app
```

## ⚡ 快速配置

### 方法 1: 逐个添加（推荐）

1. Sanity 后台 → Settings → API → CORS origins
2. 点击 "Add CORS origin"
3. 输入 `http://localhost:3000`
4. 勾选 "Allow credentials"
5. 点击 "Add"
6. 重复添加生产环境 URL

### 方法 2: 使用通配符（开发环境）

对于本地开发，可以使用：

```
http://localhost:*
```

**注意**：通配符可能不安全，建议只用于开发环境。

## 🔍 配置位置截图说明

```
Sanity Dashboard
  └── Your Project
      └── Settings（设置）
          └── API（API 设置）
              └── CORS origins（CORS 来源）← 在这里
                  └── Add CORS origin（添加 CORS 来源）
```

## ✅ 配置后

配置完成后：

1. **刷新 Studio 页面**（F5）
2. 应该可以正常访问和编辑了
3. 不再显示 CORS 错误提示

## 🆘 常见问题

### Q: 添加后仍然无法访问？

**A**: 
1. 确认 URL 完全匹配（包括 `http://` 或 `https://`）
2. 确认端口号正确
3. 清除浏览器缓存
4. 刷新页面

### Q: 需要添加多少个 CORS Origin？

**A**: 
- 至少需要添加：本地开发环境（`http://localhost:3000`）
- 生产环境部署后，添加生产 URL
- 如果有多个环境，每个都需要添加

### Q: 可以使用通配符吗？

**A**: 
- 开发环境可以：`http://localhost:*`
- 生产环境不建议使用通配符（安全考虑）

### Q: 配置后多久生效？

**A**: 
- 通常立即生效
- 如果不行，刷新页面或清除缓存

## 📚 相关文档

- [Sanity CORS 文档](https://www.sanity.io/docs/cors)
- **完整配置**：`SANITY_SETUP_COMPLETE.md`

---

**配置完成后，返回 Studio 页面刷新即可正常使用！**

