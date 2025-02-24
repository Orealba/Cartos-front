import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { supabase } from '../SupabaseClient';
import { apiClient } from '../services/api';

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => Promise<void>;
  token: string | null;
  accountId: number | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<number | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setToken(session.access_token);
        try {
          const api = apiClient(session.access_token);
          const response = await api.get('/api/accounts');
          if (response && response.content && response.content.length > 0) {
            setAccountId(response.content[0].id);
            setIsAuthenticated(true);
          }
        } catch (error) {}
      }
    };

    checkSession();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        token,
        accountId,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
