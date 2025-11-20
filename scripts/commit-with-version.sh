#!/bin/bash

# 自动递增版本号并提交的脚本

echo "🔄 Bumping version..."
npm run version:bump

echo "📝 Adding changes..."
git add .

echo "💬 Enter commit message:"
read commit_message

echo "📦 Committing..."
git commit -m "$commit_message"

echo "✅ Done! New version committed."
echo "💡 Push with: git push"
