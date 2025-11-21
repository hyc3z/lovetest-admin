# 版本自动化流程

## 🔄 完整流程

```
代码提交 → 版本递增 → 构建镜像 → 推送 Docker Hub → 提交版本 → ArgoCD 部署
```

## 📦 自动更新的文件

每次提交到 main/master 会自动更新：

| 文件 | 更新内容 | 用途 |
|------|---------|------|
| `package.json` | `version: "2.0.1"` | npm 包版本 |
| `k8s/kustomization.yaml` | `newTag: v2.0.1` | Kustomize 镜像标签 |
| `k8s/deployment.yaml` | `image: ....:v2.0.1` | K8s 部署镜像 |
| `VERSION` | `v2.0.1` | 版本追踪 |

## 🎯 VersionBadge 显示

前端组件自动显示：
- ✅ **版本号**：2.0.1（来自 package.json）
- ✅ **构建时间**：2024-11-21T10:30:00Z
- ✅ **Commit Hash**：abc1234

这些值在 Docker 构建时注入，无需手动修改代码！

## 🚀 使用方法

### 正常开发流程
```bash
# 1. 修改代码
git add .
git commit -m "feat: add new feature"
git push

# 2. CI 自动完成：
#    - 版本 2.0.0 → 2.0.1
#    - 构建 Docker 镜像
#    - 推送到 Docker Hub
#    - 提交版本变更
#    - ArgoCD 自动部署
```

### 发布新功能（手动调整版本）
```bash
# 1. 修改 package.json 版本
#    "version": "2.1.0"  # 从 2.0.5 改为 2.1.0

# 2. 提交
git add package.json
git commit -m "feat: release v2.1.0"
git push

# 3. 下次自动递增会从 2.1.0 → 2.1.1
```

## 🔍 查看当前版本

```bash
# 快速查看
cat VERSION

# 或
node -p "require('./package.json').version"
```

## ⚙️ 技术实现

### Dockerfile 构建参数
```dockerfile
ARG VITE_APP_VERSION
ARG VITE_BUILD_TIME
ARG VITE_COMMIT_HASH
```

### GitHub Actions 注入
```yaml
build-args: |
  VITE_APP_VERSION=v2.0.1
  VITE_BUILD_TIME=2024-11-21T10:30:00Z
  VITE_COMMIT_HASH=abc1234
```

### React 组件读取
```typescript
const version = import.meta.env.VITE_APP_VERSION;
const buildTime = import.meta.env.VITE_BUILD_TIME;
const commitHash = import.meta.env.VITE_COMMIT_HASH;
```

## 📝 注意事项

1. **不要手动编辑版本文件**（除非要改 minor/major 版本）
2. **使用 feature 分支开发**，合并到 main 时才触发部署
3. **提交信息包含 `[skip ci]`** 可以跳过 CI（如文档更新）
4. **ArgoCD 需要配置自动同步**才能自动部署

## 🎉 优势

- ✅ 零手动操作，完全自动化
- ✅ 版本号统一管理，不会不一致
- ✅ VersionBadge 自动显示正确版本
- ✅ 支持多架构镜像（amd64, arm64）
- ✅ ArgoCD GitOps 自动部署
- ✅ 完整的构建信息追踪
