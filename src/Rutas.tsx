import { Route, Routes } from 'react-router-dom';
import { Bienvenida } from './Pages/Bienvenida/Bienvenida';
import { Login } from './Pages/Login';
import { Layout } from './Components/Layout';
import { Home } from './Pages/Home';
import { Transacciones } from './Pages/Transacciones';
import { AgregarEditarTransaccion } from './Pages/AgregarEditarTransaccion';
import { ProtectedRoute } from './Components/utils/ProtectedRoute';
import { Session } from '@supabase/supabase-js';
import { supabase } from './SupabaseClient';
import Resumen from './Pages/Resumen';
import { ProximosPagos } from './Pages/ProximosPagos';

interface RutasProps {
  session: Session | null;
  isLoading: boolean;
}

export const Rutas = ({ session, isLoading }: RutasProps) => {
  return (
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
          <Route
            path="/resumen"
            element={<Resumen token={session?.access_token ?? ''} />}
          />
          <Route
            path="/proximos-pagos"
            element={<ProximosPagos />}
          />
        </Route>
      </Route>
    </Routes>
  );
};
