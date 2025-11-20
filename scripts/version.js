#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

// 读取 package.json
const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));
const currentVersion = packageJson.version;

// 解析版本号
const [major, minor, patch] = currentVersion.split('.').map(Number);

// 递增 patch 版本
const newVersion = `${major}.${minor}.${patch + 1}`;

// 更新 package.json
packageJson.version = newVersion;
writeFileSync('./package.json', JSON.stringify(packageJson, null, 2) + '\n');

console.log(`✅ Version bumped: ${currentVersion} → ${newVersion}`);

// 获取 git commit hash (如果在 git 仓库中)
try {
  const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
  console.log(`📝 Commit: ${commitHash}`);
} catch (e) {
  console.log('⚠️  Not in a git repository');
}
