# Changelog

## [2.0.0] - 2024-11-20

### 重大更新 / Major Updates

#### 🔌 API集成 / API Integration
- 完全集成真实的Activation Code API
- 移除所有mock数据
- 实现JWT认证和token管理
- 支持自动token验证和刷新

#### 🔐 认证功能 / Authentication
- 真实的登录API集成
- JWT token持久化存储
- 添加修改密码功能
- 移除默认密码提示

#### 📊 功能增强 / Feature Enhancements
- 实时统计信息展示（总数、已使用、未使用、有效激活码）
- 支持生成1-20,000个激活码
- 支持自定义激活码前缀
- 删除过期激活码功能
- Skip token分页支持
- 加载更多功能

#### 🎨 UI改进 / UI Improvements
- 添加统计信息栏
- 新增修改密码模态框
- 优化按钮布局和样式
- 改进加载状态显示
- 更新状态徽章（已使用、未使用、有效、过期）

#### 🗑️ 移除功能 / Removed Features
- 移除编辑激活码功能（API不支持）
- 移除批量选择删除（改为单个删除）
- 移除demo提示信息

#### 📝 API端点 / API Endpoints
- `POST /api/admin/login` - 管理员登录
- `POST /api/admin/change-password` - 修改密码
- `POST /api/admin/generate-codes` - 生成激活码
- `GET /api/admin/codes` - 查询激活码列表
- `GET /api/admin/stats` - 获取统计信息
- `DELETE /api/admin/codes/{code}` - 删除指定激活码
- `DELETE /api/admin/codes/expired` - 删除过期激活码

#### 🔧 技术改进 / Technical Improvements
- 新增API服务层 (`src/services/api.ts`)
- 更新类型定义以匹配API响应
- 环境变量配置支持
- 改进错误处理
- 添加加载状态管理

---

## [1.0.0] - 2024-11-19

### 初始版本 / Initial Release
- Monet风格设计
- 中英文国际化支持
- Mock数据演示
- Docker部署支持
