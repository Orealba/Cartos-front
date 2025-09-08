import {
  createContext,
  useContext,
  useEffect,
  useRef,
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

type AuthProviderProps = { children: ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // --- 1) Inicialización y suscripción (una sola vez) ---
  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const applySession = (sess: Session | null) => {
      if (sess?.access_token) {
        setSession(sess);
        setToken(sess.access_token);
        setIsAuthenticated(true);
      } else {
        setSession(null);
        setToken(null);
        setIsAuthenticated(false);
        if (location.pathname !== '/') navigate('/login');
      }
      setIsLoading(false);
    };

    // sesión actual
    supabase.auth
      .getSession()
      .then(({ data: { session: current } }) => applySession(current))
      .catch(() => applySession(null));

    // cambios posteriores de sesión
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, current) =>
      applySession(current),
    );

    return () => subscription.unsubscribe();
    // deps vacías: no atarlo a location/navigate para que no se repita
  }, []); // ✅ no `location.pathname` aquí

  // --- 2) Carga de cuentas (una vez por token) ---
  const fetchedForToken = useRef<string | null>(null);
  useEffect(() => {
    if (!token) return;
    if (fetchedForToken.current === token) return; // ✅ evita repetición
    fetchedForToken.current = token;

    const api = apiClient(token);
    let cancelled = false;

    (async () => {
      try {
        const response = await api.get('/api/accounts');

        if (!response?.content || response.content.length === 0) {
          // Onboarding solo si no hay cuentas
          try {
            await api.post('/api/users/onboarding', {
              firstName: 'Nombre',
              lastName: 'Apellido',
              language: 'es',
            });
            // volver a intentar cargar cuentas
            const again = await api.get('/api/accounts');
            if (!cancelled && again?.content?.length) {
              setAccountId(again.content[0].id);
            }
          } catch (e) {
            console.error('❌ Error en onboarding:', e);
          }
          return;
        }

        if (!cancelled) {
          setAccountId(response.content[0].id);
        }
      } catch (e) {
        if (!cancelled) console.error(e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setToken(null);
      setAccountId(null);
      setIsAuthenticated(false);
      setSession(null);
      navigate('/login');
    } catch {}
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
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
