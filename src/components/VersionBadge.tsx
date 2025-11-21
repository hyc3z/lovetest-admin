import './VersionBadge.css';

export default function VersionBadge() {
  // Version info injected during build via Dockerfile build args
  const version = import.meta.env.VITE_APP_VERSION || '2.0.0';
  const buildTime = import.meta.env.VITE_BUILD_TIME || 'dev';
  const commitHash = import.meta.env.VITE_COMMIT_HASH || 'local';

  return (
    <div className="version-badge" title={`Build: ${buildTime}\nCommit: ${commitHash}`}>
      <span className="version-label">v</span>
      <span className="version-number">{version}</span>
    </div>
  );
}
