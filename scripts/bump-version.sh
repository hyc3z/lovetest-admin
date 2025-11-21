#!/bin/bash
set -e

# Get current version from package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "Current version: $CURRENT_VERSION"

# Parse version components
IFS='.' read -r -a VERSION_PARTS <<< "$CURRENT_VERSION"
MAJOR="${VERSION_PARTS[0]}"
MINOR="${VERSION_PARTS[1]}"
PATCH="${VERSION_PARTS[2]}"

# Bump patch version
PATCH=$((PATCH + 1))
NEW_VERSION="$MAJOR.$MINOR.$PATCH"

echo "New version: $NEW_VERSION"

# Update package.json
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.version = '$NEW_VERSION';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

# Update kustomization.yaml
sed -i.bak "s/newTag: .*/newTag: v$NEW_VERSION/" k8s/kustomization.yaml && rm k8s/kustomization.yaml.bak

# Update deployment.yaml
sed -i.bak "s|image: omaticaya/lovetest-admin:.*|image: omaticaya/lovetest-admin:v$NEW_VERSION|" k8s/deployment.yaml && rm k8s/deployment.yaml.bak

echo "v$NEW_VERSION" > VERSION
echo "NEW_VERSION=v$NEW_VERSION" >> $GITHUB_OUTPUT
