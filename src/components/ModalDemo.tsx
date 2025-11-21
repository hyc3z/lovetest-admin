// 这是一个演示文件，展示所有弹窗类型
// 可以在开发时临时使用，生产环境可以删除

import { useModal } from '../hooks/useModal';
import './ModalDemo.css';

export default function ModalDemo() {
  const { showSuccess, showError, showWarning, showInfo, showConfirm, ModalComponent } = useModal();

  return (
    <div className="modal-demo">
      <h2>弹窗演示 / Modal Demo</h2>
      
      <div className="demo-buttons">
        <button 
          className="demo-btn demo-btn-success"
          onClick={() => showSuccess('操作成功完成！', '成功')}
        >
          ✓ Success
        </button>

        <button 
          className="demo-btn demo-btn-error"
          onClick={() => showError('操作失败，请重试', '错误')}
        >
          ✕ Error
        </button>

        <button 
          className="demo-btn demo-btn-warning"
          onClick={() => showWarning('请注意这个警告信息', '警告')}
        >
          ⚠ Warning
        </button>

        <button 
          className="demo-btn demo-btn-info"
          onClick={() => showInfo('这是一条提示信息', '提示')}
        >
          ℹ Info
        </button>

        <button 
          className="demo-btn demo-btn-confirm"
          onClick={() => showConfirm(
            '确定要执行此操作吗？此操作无法撤销。',
            () => {
              console.log('用户确认了操作');
              showSuccess('操作已确认');
            },
            '确认操作'
          )}
        >
          ? Confirm
        </button>
      </div>

      {ModalComponent}
    </div>
  );
}
