import './App.css';

import 'flowbite/dist/flowbite.min.js';
import { Bienvenida } from './Pages/Bienvenida/Bienvenida';
import { Home } from './Pages/Home';
import { Layout } from './Components/Layout';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Login } from './Pages/Login';
import { supabase } from './SupabaseClient';
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { ProtectedRoute } from './Components/utils/ProtectedRoute';
import { AuthProvider } from './Context/AuthContext';
import { Transacciones } from './Pages/Transacciones';
import { AgregarEditarTransaccion } from './Pages/AgregarEditarTransaccion';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Añado listener para cambios en la autenticación si pasa
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={<Bienvenida />}
          />
          <Route
            path="/login"
            element={
              <Login
                supabase={supabase}
                session={session}
              />
            }
          />
          <Route element={<Layout />}>
            <Route
              element={
                <ProtectedRoute
                  canActivate={!!session}
                  isLoading={isLoading}
                />
              }>
              <Route
                path="/home"
                element={<Home />}
              />
              <Route
                path="/transacciones"
                element={<Transacciones />}
              />
              <Route
                path="/agregar-editar-transaccion"
                element={<AgregarEditarTransaccion />}
              />
              <Route
                path="/agregar-editar-transaccion/:id"
                element={<AgregarEditarTransaccion />}
              />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

// Componente separado para manejar el scroll
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

export default App;
