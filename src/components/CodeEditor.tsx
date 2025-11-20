import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import './CodeEditor.css';

interface CodeEditorProps {
  onSave: (count: number, prefix?: string) => void;
  onCancel: () => void;
}

export default function CodeEditor({ onSave, onCancel }: CodeEditorProps) {
  const { t } = useLanguage();
  const [count, setCount] = useState(1);
  const [prefix, setPrefix] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (count < 1 || count > 20000) {
      newErrors.count = t.countRange;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      try {
        await onSave(count, prefix || undefined);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="code-editor">
      <div className="editor-header">
        <h2>{t.createTitle}</h2>
      </div>

      <form onSubmit={handleSubmit} className="editor-form">
        <div className="form-field">
          <label htmlFor="count">{t.numberOfCodes} *</label>
          <input
            id="count"
            type="number"
            min="1"
            max="20000"
            value={count}
            onChange={e => setCount(parseInt(e.target.value) || 1)}
            placeholder={t.enterCount}
            className={errors.count ? 'error' : ''}
            disabled={loading}
          />
          {errors.count && <span className="field-error">{errors.count}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="prefix">{t.codePrefix}</label>
          <input
            id="prefix"
            type="text"
            value={prefix}
            onChange={e => setPrefix(e.target.value)}
            placeholder={t.enterPrefix}
            disabled={loading}
          />
          <span className="field-hint">{t.prefixOptional}</span>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button" disabled={loading}>
            {t.cancel}
          </button>
          <button type="submit" className="save-button" disabled={loading}>
            {loading ? t.generating : t.create}
          </button>
        </div>
      </form>
    </div>
  );
}
