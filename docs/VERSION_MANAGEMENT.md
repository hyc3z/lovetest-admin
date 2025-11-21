# 版本管理说明

## 自动版本更新流程

每次提交到 main/master 分支时，CI/CD 会自动：

1. **递增版本号**（patch 版本，如 2.0.0 → 2.0.1）
2. **更新所有版本引用**：
   - `package.json` - npm 包版本
   - `k8s/kustomization.yaml` - Kustomize 镜像标签
   - `k8s/deployment.yaml` - Deployment 镜像版本
   - `VERSION` - 版本追踪文件
3. **构建 Docker 镜像**，注入版本信息：
   - `VITE_APP_VERSION` - 版本号（如 2.0.1）
   - `VITE_BUILD_TIME` - 构建时间戳
   - `VITE_COMMIT_HASH` - Git commit hash
4. **推送到 Docker Hub**（带版本标签和 latest）
5. **提交版本变更**回仓库（带 `[skip ci]` 避免循环）
6. **ArgoCD 自动部署**新版本

## VersionBadge 组件

前端的 VersionBadge 组件会显示：
- **版本号**：来自 `VITE_APP_VERSION`
- **构建时间**：鼠标悬停显示
- **Commit Hash**：鼠标悬停显示

这些值在 Docker 构建时通过 build args 注入，编译到最终的 JavaScript 包中。

## 版本号格式

使用语义化版本（Semantic Versioning）：`MAJOR.MINOR.PATCH`

- **PATCH**（补丁版本）：自动递增，每次提交 +1
- **MINOR**（次版本）：手动修改 `package.json`，用于新功能
- **MAJOR**（主版本）：手动修改 `package.json`，用于破坏性变更

## 手动修改版本

如果需要手动调整版本（如发布新功能）：

```bash
# 编辑 package.json，修改 version 字段
# 例如：从 2.0.5 改为 2.1.0

# 提交并推送
git add package.json
git commit -m "feat: bump to v2.1.0"
git push

# CI 会使用新版本构建，下次自动递增会从 2.1.0 → 2.1.1
```

## 本地开发

本地开发时，VersionBadge 会显示：
- 版本：从 `package.json` 读取
- 构建时间：显示 "dev"
- Commit：显示 "local"

运行 `npm run dev` 或 `npm run build` 时，`scripts/build-info.js` 会生成 `.env.local` 文件（仅用于本地开发）。

## 查看当前版本

```bash
# 方法1：查看 VERSION 文件
cat VERSION

# 方法2：查看 package.json
node -p "require('./package.json').version"

# 方法3：查看 Docker 镜像标签
docker images omaticaya/lovetest-admin
```

## 故障排查

### VersionBadge 显示错误版本

检查 Docker 镜像是否使用了正确的 build args：

```bash
# 查看镜像标签
docker inspect omaticaya/lovetest-admin:latest | grep VITE_APP_VERSION
```

### 版本没有自动递增

检查 GitHub Actions 日志：
1. 确认 `bump-version.sh` 执行成功
2. 确认版本文件被正确更新
3. 确认 commit 和 push 成功

### ArgoCD 没有部署新版本

1. 检查 ArgoCD 同步状态
2. 确认 `k8s/kustomization.yaml` 中的 `newTag` 已更新
3. 手动触发 ArgoCD 同步
