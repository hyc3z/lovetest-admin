import { useEffect } from 'react';
import './Modal.css';

interface ModalProps {
  type: 'success' | 'error' | 'warning' | 'info' | 'confirm';
  title?: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function Modal({
  type,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Cancel',
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onCancel) {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      case 'confirm':
        return '?';
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onCancel) {
      onCancel();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal-dialog modal-${type}`}>
        <div className="modal-icon-wrapper">
          <div className={`modal-icon modal-icon-${type}`}>
            {getIcon()}
          </div>
        </div>
        
        {title && <h3 className="modal-title">{title}</h3>}
        <p className="modal-message">{message}</p>
        
        <div className="modal-actions">
          {type === 'confirm' ? (
            <>
              <button
                className="modal-button modal-button-cancel"
                onClick={onCancel}
              >
                {cancelText}
              </button>
              <button
                className="modal-button modal-button-confirm"
                onClick={onConfirm}
                autoFocus
              >
                {confirmText}
              </button>
            </>
          ) : (
            <button
              className="modal-button modal-button-primary"
              onClick={onConfirm || onCancel}
              autoFocus
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
