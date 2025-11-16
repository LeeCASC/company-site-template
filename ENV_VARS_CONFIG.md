# 环境变量配置说明

## 当前配置的环境变量

根据你提供的信息，以下环境变量已配置：

```
KV_REST_API_URL="https://easy-drake-12361.upstash.io"
KV_REST_API_TOKEN="ATBJAAIncDI4NTMwZjljMTVmNzY0Zjk1ODRmNDE0NjcxMmNlMzc4YXAyMTIzNjE"
KV_REST_API_READ_ONLY_TOKEN="AjBJAAIgcDKoMStdpA1_NeD4W17v0Rocf1NkS4TYYH_nDfRD8N-QMQ"
```

## 代码如何工作

代码会按以下顺序检测环境变量：

1. **优先检查** `UPSTASH_REDIS_REST_URL` 和 `UPSTASH_REDIS_REST_TOKEN`
   - 如果存在，使用 `@upstash/redis` 客户端

2. **备选检查** `KV_REST_API_URL` 和 `KV_REST_API_TOKEN` ✅ **当前使用**
   - 如果存在，使用 `@vercel/kv` 客户端
   - **你的配置会使用这种方式**

3. **回退** 文件系统（仅开发环境）

## 验证配置

### 在 Vercel 中验证

1. 进入项目设置 → **Environment Variables**
2. 确认以下变量存在：
   - ✅ `KV_REST_API_URL` = `https://easy-drake-12361.upstash.io`
   - ✅ `KV_REST_API_TOKEN` = `ATBJAAIncDI4NTMwZjljMTVmNzY0Zjk1ODRmNDE0NjcxMmNlMzc4YXAyMTIzNjE`

### 测试编辑功能

1. 访问编辑页面：`/zh/admin/careers` 或 `/en/admin/careers`
2. 修改招聘信息
3. 点击"发布"按钮
4. 应该能成功发布，数据会保存到 Vercel KV 存储

## 数据存储位置

- **存储服务**: Vercel KV (通过 Upstash 提供)
- **存储键名**: `careers:data`
- **存储格式**: JSON

## 如果遇到问题

如果发布失败，检查：

1. ✅ 环境变量是否正确配置（在 Vercel 项目设置中）
2. ✅ 代码是否已重新部署
3. ✅ 查看 Vercel 部署日志中的错误信息

代码会自动使用 `KV_REST_API_URL` 和 `KV_REST_API_TOKEN` 连接到 Vercel KV 存储。

