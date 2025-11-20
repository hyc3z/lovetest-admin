# 快速设置指南 / Quick Setup Guide

## 环境要求 / Requirements

- Node.js 18+
- npm 或 yarn
- Docker (可选 / optional)

## 本地开发 / Local Development

### 1. 克隆项目 / Clone Repository

```bash
git clone <repository-url>
cd lovetest-admin
```

### 2. 安装依赖 / Install Dependencies

```bash
npm install
```

### 3. 配置环境变量 / Configure Environment

创建 `.env` 文件 / Create `.env` file:

```bash
cp .env.example .env
```

编辑 `.env` 文件，设置API地址 / Edit `.env` to set API URL:

```env
VITE_API_BASE_URL=https://api.lovetest.com.cn
```

### 4. 启动开发服务器 / Start Dev Server

```bash
npm run dev
```

访问 / Visit: http://localhost:5173

### 5. 登录 / Login

默认凭据 / Default credentials:
- 用户名 / Username: `admin`
- 密码 / Password: `admin`

**重要 / Important**: 首次登录后立即修改密码！/ Change password after first login!

## Docker部署 / Docker Deployment

### 使用Docker Compose / Using Docker Compose

```bash
docker-compose up -d
```

访问 / Visit: http://localhost:8080

### 使用Docker / Using Docker

```bash
# 构建镜像 / Build image
docker build -t lovetest-admin .

# 运行容器 / Run container
docker run -d -p 8080:80 lovetest-admin
```

## 生产构建 / Production Build

```bash
# 构建 / Build
npm run build

# 预览 / Preview
npm run preview
```

构建产物在 `dist/` 目录 / Build output in `dist/` directory

## API配置 / API Configuration

确保后端API服务正在运行 / Ensure backend API is running:

- 默认地址 / Default URL: `https://api.lovetest.com.cn`
- API文档 / API Docs: 查看 `API_DOCUMENTATION.md` / See `API_DOCUMENTATION.md`

## 功能测试 / Feature Testing

### 1. 登录测试 / Test Login
- 使用默认凭据登录 / Login with default credentials
- 验证JWT token存储 / Verify JWT token storage

### 2. 修改密码 / Change Password
- 点击"修改密码"按钮 / Click "Change Password" button
- 输入旧密码和新密码 / Enter old and new password
- 确认修改成功 / Confirm success

### 3. 查看统计 / View Statistics
- 查看顶部统计栏 / Check top stats bar
- 验证数据准确性 / Verify data accuracy

### 4. 生成激活码 / Generate Codes
- 点击"+ 创建激活码" / Click "+ Create Codes"
- 输入数量（1-20,000）/ Enter count (1-20,000)
- 可选：输入前缀 / Optional: Enter prefix
- 点击生成 / Click generate

### 5. 搜索激活码 / Search Codes
- 使用搜索框过滤 / Use search box to filter
- 实时搜索结果 / Real-time search results

### 6. 删除激活码 / Delete Codes
- 单个删除：点击删除按钮 / Single: Click delete button
- 批量删除过期：点击"删除过期" / Bulk expired: Click "Delete Expired"

### 7. 分页加载 / Pagination
- 滚动到底部 / Scroll to bottom
- 点击"加载更多" / Click "Load More"
- 验证新数据加载 / Verify new data loads

## 故障排除 / Troubleshooting

### CORS错误 / CORS Error

开发环境已配置Vite代理解决CORS问题 / Dev environment uses Vite proxy to solve CORS:

1. **开发环境** / Development:
   - Vite自动代理 `/api` 请求到后端
   - 无需配置CORS
   - 重启开发服务器: `npm run dev`

2. **生产环境** / Production:
   - 需要后端API配置CORS
   - 或使用Nginx反向代理
   - 参考 `nginx.conf` 配置

### API连接失败 / API Connection Failed

检查 / Check:
1. API服务是否运行 / Is API service running?
2. `.env` 文件配置是否正确 / Is `.env` configured correctly?
3. 网络连接 / Network connection
4. Vite代理配置 / Vite proxy configuration (dev only)

### 登录失败 / Login Failed

检查 / Check:
1. 用户名密码是否正确 / Correct username/password?
2. API `/api/admin/login` 端点是否可用 / Is login endpoint available?
3. 浏览器控制台错误信息 / Browser console errors

### Token过期 / Token Expired

- JWT token有效期30分钟 / JWT token valid for 30 minutes
- 过期后需要重新登录 / Re-login after expiration
- Token存储在localStorage / Token stored in localStorage

## 开发提示 / Development Tips

### 清除本地存储 / Clear Local Storage

```javascript
// 在浏览器控制台执行 / Run in browser console
localStorage.clear()
```

### 查看API请求 / View API Requests

打开浏览器开发者工具 / Open browser DevTools:
- Network标签 / Network tab
- 查看请求/响应 / View requests/responses
- 检查JWT token / Check JWT token

### 热重载 / Hot Reload

开发服务器支持热重载 / Dev server supports hot reload:
- 修改代码自动刷新 / Auto refresh on code changes
- 保持应用状态 / Maintains app state

## 更多信息 / More Information

- API文档 / API Docs: `API_DOCUMENTATION.md`
- 更新日志 / Changelog: `CHANGELOG.md`
- README: `README.md`
