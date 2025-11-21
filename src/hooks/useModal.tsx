import { useState, useCallback } from 'react';
import Modal from '../components/Modal';
import { useLanguage } from '../i18n/LanguageContext';

interface ModalState {
  isOpen: boolean;
  type: 'success' | 'error' | 'warning' | 'info' | 'confirm';
  title?: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function useModal() {
  const { t } = useLanguage();
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: 'info',
    message: '',
  });

  const closeModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const showSuccess = useCallback((message: string, title?: string) => {
    setModalState({
      isOpen: true,
      type: 'success',
      title: title || t.success,
      message,
      onConfirm: closeModal,
    });
  }, [closeModal, t.success]);

  const showError = useCallback((message: string, title?: string) => {
    setModalState({
      isOpen: true,
      type: 'error',
      title: title || t.error,
      message,
      onConfirm: closeModal,
    });
  }, [closeModal, t.error]);

  const showWarning = useCallback((message: string, title?: string) => {
    setModalState({
      isOpen: true,
      type: 'warning',
      title: title || t.warning,
      message,
      onConfirm: closeModal,
    });
  }, [closeModal, t.warning]);

  const showInfo = useCallback((message: string, title?: string) => {
    setModalState({
      isOpen: true,
      type: 'info',
      title: title || t.info,
      message,
      onConfirm: closeModal,
    });
  }, [closeModal, t.info]);

  const showConfirm = useCallback((
    message: string,
    onConfirm: () => void,
    title?: string
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        type: 'confirm',
        title: title || t.confirm,
        message,
        onConfirm: () => {
          closeModal();
          onConfirm();
          resolve(true);
        },
        onCancel: () => {
          closeModal();
          resolve(false);
        },
      });
    });
  }, [closeModal, t.confirm]);

  const ModalComponent = modalState.isOpen ? (
    <Modal
      type={modalState.type}
      title={modalState.title}
      message={modalState.message}
      onConfirm={modalState.onConfirm}
      onCancel={modalState.onCancel}
      confirmText={t.ok}
      cancelText={t.cancel}
    />
  ) : null;

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
    ModalComponent,
  };
}
