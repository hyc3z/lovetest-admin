# 优雅弹窗系统

## 概述

项目已将所有原生的 `alert()` 和 `confirm()` 替换为优雅的自定义弹窗组件。

## 特性

### 视觉效果
- ✨ 渐入动画和滑入效果
- 🎨 渐变色图标（成功、错误、警告、信息、确认）
- 🌈 现代化设计，支持深色模式
- 💫 流畅的交互动画

### 功能
- 🔔 5种弹窗类型：success, error, warning, info, confirm
- ⌨️ 支持 ESC 键关闭
- 🖱️ 点击遮罩层关闭
- 🌐 多语言支持
- ♿ 可访问性支持（自动聚焦）

## 使用方法

### 在组件中使用

```typescript
import { useModal } from '../hooks/useModal';

function MyComponent() {
  const { showSuccess, showError, showWarning, showInfo, showConfirm, ModalComponent } = useModal();

  // 成功提示
  const handleSuccess = () => {
    showSuccess('操作成功！');
  };

  // 错误提示
  const handleError = () => {
    showError('操作失败，请重试');
  };

  // 警告提示
  const handleWarning = () => {
    showWarning('这是一个警告信息');
  };

  // 信息提示
  const handleInfo = () => {
    showInfo('这是一条提示信息');
  };

  // 确认对话框
  const handleDelete = () => {
    showConfirm('确定要删除吗？', async () => {
      // 用户点击确认后执行
      await deleteItem();
    });
  };

  return (
    <div>
      {/* 你的组件内容 */}
      
      {/* 必须在组件末尾渲染 ModalComponent */}
      {ModalComponent}
    </div>
  );
}
```

### API

#### showSuccess(message, title?)
显示成功提示弹窗
- `message`: 提示消息
- `title`: 可选标题（默认："成功"）

#### showError(message, title?)
显示错误提示弹窗
- `message`: 错误消息
- `title`: 可选标题（默认："错误"）

#### showWarning(message, title?)
显示警告提示弹窗
- `message`: 警告消息
- `title`: 可选标题（默认："警告"）

#### showInfo(message, title?)
显示信息提示弹窗
- `message`: 信息内容
- `title`: 可选标题（默认："提示"）

#### showConfirm(message, onConfirm, title?)
显示确认对话框
- `message`: 确认消息
- `onConfirm`: 用户点击确认后的回调函数
- `title`: 可选标题（默认："确认"）
- 返回: `Promise<boolean>` - 用户是否确认

## 已替换的位置

### Dashboard.tsx
- ✅ 加载激活码失败 → `showError()`
- ✅ 生成激活码成功 → `showSuccess()`
- ✅ 生成激活码失败 → `showError()`
- ✅ 删除激活码确认 → `showConfirm()`
- ✅ 删除激活码失败 → `showError()`
- ✅ 删除过期激活码确认 → `showConfirm()`
- ✅ 删除过期激活码成功 → `showSuccess()`
- ✅ 删除过期激活码失败 → `showError()`

### CodeList.tsx
- ✅ 导出成功 → `showSuccess()`
- ✅ 导出失败 → `showError()`

### ChangePassword.tsx
- ✅ 修改密码成功 → `showSuccess()`

### BatchDelete.tsx
- ✅ 批量删除确认 → `showConfirm()`
- ✅ 批量删除成功 → `showSuccess()`

## 样式定制

弹窗样式定义在 `src/components/Modal.css` 中，可以根据需要调整：

- 颜色渐变
- 动画效果
- 尺寸和间距
- 深色模式适配

## 技术实现

### 组件结构
```
Modal.tsx          - 弹窗组件
Modal.css          - 弹窗样式
useModal.tsx       - 弹窗 Hook
```

### 动画
- `fadeIn`: 遮罩层渐入（0.2s）
- `slideUp`: 弹窗滑入（0.3s）
- `scaleIn`: 图标缩放（0.4s，带弹性效果）

### 图标
- ✓ 成功（紫色渐变）
- ✕ 错误（粉红渐变）
- ⚠ 警告（橙色渐变）
- ℹ 信息（青色渐变）
- ? 确认（紫色渐变）

## 优势

相比原生 `alert()` 和 `confirm()`：

1. **更美观** - 现代化设计，符合应用整体风格
2. **更灵活** - 可自定义样式、动画、内容
3. **更友好** - 支持多语言、键盘操作、无障碍访问
4. **更一致** - 所有浏览器表现一致
5. **更强大** - 支持异步操作、Promise、回调

## 未来扩展

可以轻松添加更多功能：

- 自动关闭（toast 模式）
- 自定义按钮
- 输入框（prompt）
- 加载状态
- 多个弹窗队列
- 位置定制（顶部、底部、角落）
