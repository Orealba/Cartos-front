import { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from '../SupabaseClient';

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Verifica la sesión de Supabase
    return !!supabase.auth.getSession();
  });

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
