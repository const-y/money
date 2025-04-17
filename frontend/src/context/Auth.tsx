import api from '@/api/api';
import { createContext, FC, useContext, useMemo, useState } from 'react';

interface AuthContext {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContext | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = (token: string) => {
    setAccessToken(token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    setAccessToken(null);
    delete api.defaults.headers.common['Authorization'];
  };

  const value = useMemo(
    () => ({
      accessToken,
      isAuthenticated: !!accessToken,
      login,
      logout,
    }),
    [accessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useModal must be used within a AuthProvider');
  }

  return context;
}
