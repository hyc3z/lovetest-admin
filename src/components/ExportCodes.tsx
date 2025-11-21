import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { apiService } from '../services/api';
import { useModal } from '../hooks/useModal';
import './ExportCodes.css';

interface ExportCodesProps {
  onClose: () => void;
}

interface PreviewResult {
  matchedCount: number;
  matchedCodes: string[];
}

export default function ExportCodes({ onClose }: ExportCodesProps) {
  const { t } = useLanguage();
  const { showSuccess, ModalComponent } = useModal();
  const [pattern, setPattern] = useState('');
  const [useRegex, setUseRegex] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewResult, setPreviewResult] = useState<PreviewResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const buildPattern = (input: string, isRegex: boolean): string => {
    if (!input.trim()) {
      return '.*'; // 匹配所有
    }
    if (isRegex) {
      return input;
    }
    // 如果不是正则，则进行模糊匹配（包含子串）
    const escaped = input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return `.*${escaped}.*`;
  };

  const handlePreview = async () => {
    setError('');
    setLoading(true);
    
    try {
      const finalPattern = buildPattern(pattern, useRegex);
      
      // 使用批量删除的预览接口（dryRun=true）
      const result = await apiService.batchDeleteCodes({
        pattern: finalPattern,
        dryRun: true,
      });
      
      setPreviewResult({
        matchedCount: result.matchedCount,
        matchedCodes: result.matchedCodes,
      });
      setShowPreview(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to preview');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (!previewResult || previewResult.matchedCount === 0) return;

    setLoading(true);
    setError('');
    
    try {
      const finalPattern = buildPattern(pattern, useRegex);
      
      // 再次获取匹配的激活码（确保数据最新）
      const result = await apiService.batchDeleteCodes({
        pattern: finalPattern,
        dryRun: true,
      });
      
      // 创建文本内容（每行一个激活码）
      const content = result.matchedCodes.join('\n');
      
      // 创建Blob对象
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      
      // 创建下载链接
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // 生成文件名（包含日期时间和模式）
      const now = new Date();
      const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
      const patternSuffix = pattern ? `-${pattern.replace(/[^a-zA-Z0-9]/g, '_')}` : '';
      link.download = `activation-codes${patternSuffix}-${timestamp}.txt`;
      
      // 触发下载
      document.body.appendChild(link);
      link.click();
      
      // 清理
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // 显示成功消息
      showSuccess(t.exportSuccess.replace('{count}', result.matchedCount.toString()));
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setShowPreview(false);
    setPreviewResult(null);
    setError('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content export-codes-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t.exportCodesTitle}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {!showPreview ? (
          <div className="export-codes-form">
            <div className="form-group">
              <label htmlFor="pattern">{t.exportPattern}</label>
              <input
                id="pattern"
                type="text"
                value={pattern}
                onChange={e => setPattern(e.target.value)}
                placeholder={t.exportPatternPlaceholder}
                disabled={loading}
                className="pattern-input"
              />
              <span className="field-hint">
                {pattern ? (useRegex ? t.regexHint : t.substringHint) : t.exportAllHint}
              </span>
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={useRegex}
                  onChange={e => setUseRegex(e.target.checked)}
                  disabled={loading}
                />
                <span>{t.useRegex}</span>
              </label>
            </div>

            {useRegex && (
              <div className="regex-examples">
                <p className="examples-title">{t.regexExamples}:</p>
                <ul>
                  <li><code>^TEST-.*</code> - {t.regexExample1}</li>
                  <li><code>.*-2024$</code> - {t.regexExample2}</li>
                  <li><code>^DEMO-\d+$</code> - {t.regexExample3}</li>
                </ul>
              </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button type="button" onClick={onClose} className="cancel-button" disabled={loading}>
                {t.cancel}
              </button>
              <button type="button" onClick={handlePreview} className="preview-button" disabled={loading}>
                {loading ? t.loading : t.preview}
              </button>
            </div>
          </div>
        ) : (
          <div className="preview-result">
            <div className={`result-summary ${previewResult?.matchedCount === 0 ? 'no-match' : 'has-match'}`}>
              <h3>{t.previewResult}</h3>
              <p className="match-count">
                {t.foundMatches.replace('{count}', previewResult?.matchedCount.toString() || '0')}
              </p>
              
              {previewResult && previewResult.matchedCount > 0 && (
                <>
                  <div className="matched-codes-preview">
                    <p className="preview-label">{t.exportPreviewLabel}:</p>
                    <div className="codes-list">
                      {/* 显示前10条 */}
                      {previewResult.matchedCodes.slice(0, 10).map((code, index) => (
                        <div key={index} className="code-item">
                          <span className="code-number">{index + 1}.</span>
                          <span className="code-text">{code}</span>
                        </div>
                      ))}
                      
                      {/* 如果超过11条，显示省略号和最后一条 */}
                      {previewResult.matchedCount > 11 && (
                        <>
                          <div className="more-indicator">
                            ... ({previewResult.matchedCount - 11} {t.moreItems})
                          </div>
                          <div className="code-item last-item">
                            <span className="code-number">{previewResult.matchedCount}.</span>
                            <span className="code-text">
                              {previewResult.matchedCodes[previewResult.matchedCodes.length - 1]}
                            </span>
                          </div>
                        </>
                      )}
                      
                      {/* 如果正好11条，显示第11条 */}
                      {previewResult.matchedCount === 11 && (
                        <div className="code-item">
                          <span className="code-number">11.</span>
                          <span className="code-text">{previewResult.matchedCodes[10]}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="info-box">
                    <span className="info-icon">ℹ️</span>
                    <span>{t.exportInfo}</span>
                  </div>
                </>
              )}
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button type="button" onClick={handleReset} className="cancel-button" disabled={loading}>
                {t.back}
              </button>
              {previewResult && previewResult.matchedCount > 0 && (
                <button 
                  type="button" 
                  onClick={handleExport} 
                  className="export-button" 
                  disabled={loading}
                >
                  {loading ? t.exporting : t.confirmExport}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {ModalComponent}
    </div>
  );
}
