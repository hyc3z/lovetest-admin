import './VersionBadge.css';

export default function VersionBadge() {
  const version = import.meta.env.VITE_APP_VERSION || '2.0.0';
  const buildTime = import.meta.env.VITE_BUILD_TIME || '';
  const commitHash = import.meta.env.VITE_COMMIT_HASH || '';

  return (
    <div className="version-badge" title={`Build: ${buildTime}\nCommit: ${commitHash}`}>
      <span className="version-label">v</span>
      <span className="version-number">{version}</span>
    </div>
  );
}
