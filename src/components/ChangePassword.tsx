import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { apiService } from '../services/api';
import './ChangePassword.css';

interface ChangePasswordProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ChangePassword({ onClose, onSuccess }: ChangePasswordProps) {
  const { t } = useLanguage();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
  const passwordValid = newPassword.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError(t.enterAllFields);
      return;
    }

    if (newPassword.length < 6) {
      setError(t.passwordMinLength);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t.passwordsNotMatch);
      return;
    }

    if (oldPassword === newPassword) {
      setError(t.passwordsSame);
      return;
    }

    setLoading(true);
    try {
      await apiService.changePassword(oldPassword, newPassword);
      alert(t.passwordChanged);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t.changePasswordTitle}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="change-password-form">
          <div className="form-group">
            <label htmlFor="oldPassword">{t.oldPassword}</label>
            <input
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              placeholder={t.enterOldPassword}
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">{t.newPassword}</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder={t.enterNewPassword}
              autoComplete="new-password"
              disabled={loading}
              className={newPassword && !passwordValid ? 'input-error' : ''}
            />
            {newPassword && !passwordValid && (
              <span className="field-hint error">{t.passwordMinLength}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">{t.confirmPassword}</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder={t.enterConfirmPassword}
              autoComplete="new-password"
              disabled={loading}
              className={
                confirmPassword && newPassword !== confirmPassword ? 'input-error' : 
                passwordsMatch ? 'input-success' : ''
              }
            />
            {confirmPassword && newPassword !== confirmPassword && (
              <span className="field-hint error">{t.passwordsNotMatch}</span>
            )}
            {passwordsMatch && (
              <span className="field-hint success">✓ {t.passwordsMatch}</span>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button" disabled={loading}>
              {t.cancel}
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? t.generating : t.changePasswordButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
