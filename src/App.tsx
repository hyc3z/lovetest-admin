import { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { LanguageProvider } from './i18n/LanguageContext';
import { apiService } from './services/api';
import type { User } from './types';
import './App.css';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has a valid token
    const token = apiService.getToken();
    if (token) {
      // Verify token by making a test request
      apiService.getStats()
        .then(() => {
          setUser({ username: 'admin', token });
        })
        .catch(() => {
          apiService.clearToken();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (username: string, password: string): Promise<void> => {
    const response = await apiService.login(username, password);
    if (response.success && response.token) {
      apiService.setToken(response.token);
      setUser({ username, token: response.token });
    } else {
      throw new Error(response.message);
    }
  };

  const handleLogout = () => {
    apiService.clearToken();
    setUser(null);
  };

  if (loading) {
    return (
      <LanguageProvider>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          Loading...
        </div>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      {!user ? <Login onLogin={handleLogin} /> : <Dashboard user={user} onLogout={handleLogout} />}
    </LanguageProvider>
  );
}

export default App;
