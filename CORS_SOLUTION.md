# CORS 解决方案 / CORS Solutions

## 问题描述 / Problem Description

前端应用（`http://localhost:5174`）访问后端API（`https://api.lovetest.com.cn`）时遇到CORS错误：

```
Access to fetch at 'https://api.lovetest.com.cn/api/admin/login' from origin 'http://localhost:5174' 
has been blocked by CORS policy
```

## 解决方案 / Solutions

### 方案1：Vite开发代理（已实现）✅

**适用场景**: 本地开发环境

**配置文件**: `vite.config.ts`

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.lovetest.com.cn',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
```

**工作原理**:
- 前端请求 `http://localhost:5174/api/admin/login`
- Vite代理转发到 `https://api.lovetest.com.cn/api/admin/login`
- 避免浏览器CORS检查

**使用方法**:
```bash
# 重启开发服务器
npm run dev
```

---

### 方案2：后端配置CORS（推荐生产环境）

**适用场景**: 生产环境

后端API需要添加CORS响应头：

```csharp
// ASP.NET Core 示例
app.UseCors(policy => policy
    .WithOrigins("https://your-frontend-domain.com")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials());
```

**必需的响应头**:
```
Access-Control-Allow-Origin: https://your-frontend-domain.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

---

### 方案3：Nginx反向代理（生产环境）

**适用场景**: 使用Nginx部署

**配置文件**: `nginx.conf`

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端静态文件
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }

    # API代理
    location /api/ {
        proxy_pass https://api.lovetest.com.cn;
        proxy_set_header Host api.lovetest.com.cn;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # CORS headers (如果后端没有配置)
        add_header Access-Control-Allow-Origin * always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;
        
        if ($request_method = OPTIONS) {
            return 204;
        }
    }
}
```

更新 `src/config.ts`:
```typescript
export const API_BASE_URL = '';  // 使用相对路径
```

---

### 方案4：浏览器插件（仅用于测试）⚠️

**不推荐用于开发**，仅用于快速测试：

1. 安装Chrome扩展: "Allow CORS: Access-Control-Allow-Origin"
2. 启用扩展
3. 刷新页面

**警告**: 这只是临时解决方案，不适合实际开发。

---

## 当前项目配置 / Current Configuration

### 开发环境 (Development)
- ✅ 使用Vite代理
- ✅ 配置文件: `vite.config.ts`
- ✅ API_BASE_URL: 空字符串（使用相对路径）

### 生产环境 (Production)
- 📝 需要后端配置CORS
- 📝 或使用Nginx反向代理
- ✅ API_BASE_URL: `https://api.lovetest.com.cn`

## 测试步骤 / Testing Steps

### 1. 测试开发环境

```bash
# 停止当前开发服务器
# Ctrl+C

# 重新启动
npm run dev

# 访问 http://localhost:5174
# 尝试登录
```

### 2. 检查网络请求

打开浏览器开发者工具:
1. Network标签
2. 查看请求URL应该是: `http://localhost:5174/api/admin/login`
3. 不应该有CORS错误

### 3. 测试生产构建

```bash
# 构建
npm run build

# 预览（仍使用Vite代理）
npm run preview

# 或使用Docker（需要Nginx配置）
docker build -t lovetest-admin .
docker run -p 8080:80 lovetest-admin
```

## 常见问题 / FAQ

### Q: 为什么开发环境可以，生产环境不行？

A: 开发环境使用Vite代理，生产环境需要后端配置CORS或使用Nginx代理。

### Q: 如何知道是否是CORS问题？

A: 浏览器控制台会显示明确的CORS错误信息，包含 "Access-Control-Allow-Origin" 字样。

### Q: OPTIONS请求是什么？

A: 浏览器在发送跨域请求前会先发送OPTIONS预检请求，检查服务器是否允许该跨域请求。

### Q: 生产环境推荐哪种方案？

A: 推荐方案3（Nginx反向代理），这样前后端使用同一域名，无需CORS配置。

## 相关文件 / Related Files

- `vite.config.ts` - Vite代理配置
- `src/config.ts` - API URL配置
- `nginx.conf` - Nginx配置（生产环境）
- `.env.development` - 开发环境变量
- `.env.production` - 生产环境变量

## 更多资源 / Resources

- [MDN CORS文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Vite代理配置](https://vitejs.dev/config/server-options.html#server-proxy)
- [Nginx反向代理](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)
