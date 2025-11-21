# GitHub Actions Workflows

## Overview

This project uses automated workflows for version management and Docker image deployment.

## Workflows

### docker-build.yml - Automated Build & Version Bump

**Trigger**: Push to `main` or `master` branch (excluding version files)

**Process**:
1. Checkout repository
2. Bump patch version (e.g., 2.0.0 → 2.0.1)
3. Update version in:
   - `package.json`
   - `k8s/kustomization.yaml`
   - `k8s/deployment.yaml`
   - `VERSION` file
4. Build multi-arch Docker image (amd64, arm64)
5. Push to Docker Hub with tags:
   - `v{version}` (e.g., v2.0.1)
   - `latest`
6. Commit version changes back to repo with `[skip ci]` tag

**Required Secrets**:
- `DOCKERHUB_USERNAME` - Docker Hub username
- `DOCKERHUB_TOKEN` - Docker Hub access token

**Required Variables**:
- `DOCKER_IMAGE_NAME` - Docker image name (e.g., lovetest-admin)

### docker-release.yml - Release Build

**Trigger**: GitHub Release published

**Process**:
1. Extract version from release tag
2. Build multi-arch Docker image
3. Push to Docker Hub with release version
4. Update Docker Hub description

## Version Management

### Automatic Version Bumping

The `scripts/bump-version.sh` script handles version increments:
- Reads current version from `package.json`
- Increments patch version
- Updates all version references
- Outputs new version for GitHub Actions

### Version Files

- `VERSION` - Single source of truth for current version
- `package.json` - npm package version
- `k8s/kustomization.yaml` - Kustomize image tag
- `k8s/deployment.yaml` - Deployment image version

## ArgoCD Integration

ArgoCD monitors the `k8s/` directory for changes:
- Detects version updates in `kustomization.yaml`
- Automatically syncs new image version to cluster
- Performs rolling update of pods

## Manual Workflow Trigger

You can manually trigger the build workflow:
1. Go to GitHub repository
2. Click "Actions" tab
3. Select "Build and Push Docker Image"
4. Click "Run workflow"

## Skipping CI

To push changes without triggering the workflow, include `[skip ci]` in your commit message:

```bash
git commit -m "docs: update README [skip ci]"
```

## Troubleshooting

### Workflow fails at version bump
- Check that `scripts/bump-version.sh` has execute permissions
- Verify `package.json` has valid version format

### Docker push fails
- Verify `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets are set
- Check Docker Hub repository exists

### Version commit fails
- Ensure GitHub Actions has write permissions
- Check for merge conflicts in version files

## Best Practices

1. **Don't manually edit version files** - Let the workflow handle it
2. **Use feature branches** - Merge to main when ready to deploy
3. **Tag releases** - Use GitHub Releases for major/minor versions
4. **Monitor ArgoCD** - Verify deployments complete successfully
