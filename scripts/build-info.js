#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

// 读取 package.json 获取版本号
const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));
const version = packageJson.version;

// 获取构建时间
const buildTime = new Date().toISOString();

// 获取 git commit hash
let commitHash = 'unknown';
try {
  commitHash = execSync('git rev-parse --short HEAD').toString().trim();
} catch (e) {
  console.log('⚠️  Could not get git commit hash');
}

// 创建 .env.local 文件
const envContent = `# Auto-generated build info
VITE_APP_VERSION=${version}
VITE_BUILD_TIME=${buildTime}
VITE_COMMIT_HASH=${commitHash}
`;

writeFileSync('.env.local', envContent);

console.log('✅ Build info generated:');
console.log(`   Version: ${version}`);
console.log(`   Build Time: ${buildTime}`);
console.log(`   Commit: ${commitHash}`);
