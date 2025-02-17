import './App.css';

import 'flowbite/dist/flowbite.min.js';
import { Bienvenida } from './Pages/Bienvenida';
import { Home } from './Pages/Home';
import { Layout } from './Components/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
    <AuthProvider>
      <Router>
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

          {/* Rutas con Navbar */}
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
            </Route>
            <Route
              path="/transacciones"
              element={<Transacciones />}
            />
            <Route
              path="/agregar-editar-transaccion"
              element={<AgregarEditarTransaccion />}
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
