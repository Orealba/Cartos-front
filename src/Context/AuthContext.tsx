import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiClient } from '../services/api';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../SupabaseClient';

interface AuthContextType {
  token: string | null;
  accountId: number | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  session: Session | null;
  setSession: (session: Session | null) => void;
  logout: () => Promise<void>;
  login: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  accountId: null,
  isLoading: true,
  isAuthenticated: false,
  session: null,
  setSession: () => {},
  logout: async () => {},
  login: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();

        if (currentSession?.access_token) {
          setSession(currentSession);
          setToken(currentSession.access_token);

          const api = apiClient(currentSession.access_token);
          const response = await api.get('/api/accounts');

          if (response && response.content && response.content.length > 0) {
            const account = response.content[0];
            setAccountId(account.id);
            setIsAuthenticated(true);
          }
        } else if (location.pathname !== '/') {
          setToken(null);
          setAccountId(null);
          setSession(null);
          setIsAuthenticated(false);
          navigate('/login');
        }
      } catch (error) {
        if (location.pathname !== '/') {
          setToken(null);
          setAccountId(null);
          setSession(null);
          setIsAuthenticated(false);
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (event === 'SIGNED_IN' && currentSession) {
        setSession(currentSession);
        setToken(currentSession.access_token);

        const api = apiClient(currentSession.access_token);
        const response = await api.get('/api/accounts');

        if (!response.content || response.content.length === 0) {
          try {
            await api.post('/api/users/onboarding', {
              firstName: 'Nombre',
              lastName: 'Apellido',
              language: 'es',
            });
            console.log('✅ Onboarding completado');
          } catch (err) {
            console.error('❌ Error en onboarding:', err);
          }
        }

        if (response && response.content && response.content.length > 0) {
          const account = response.content[0];
          setAccountId(account.id);
          setIsAuthenticated(true);
        }
      } else if (event === 'SIGNED_OUT') {
        setToken(null);
        setAccountId(null);
        setSession(null);
        setIsAuthenticated(false);
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setToken(null);
      setAccountId(null);
      setIsAuthenticated(false);
      setSession(null);
      navigate('/login');
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        accountId,
        isLoading,
        isAuthenticated,
        session,
        setSession,
        logout,
        login: () => {},
      }}>
      {!isLoading ? children : <div>Cargando...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
