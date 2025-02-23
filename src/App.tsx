import './App.css';

import 'flowbite';
import { Bienvenida } from './Pages/Bienvenida';
import { Home } from './Pages/Home';
import { Layout } from './Components/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { supabase } from './SupabaseClient';
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Bienvenida />}
        />

        {/* Rutas con Navbar */}
        <Route element={<Layout />}>
          <Route
            path="/home"
            element={<Home />}
          />
        </Route>
        <Route element={<Layout />}>
          <Route
            path="/login"
            element={
              <Login
                supabase={supabase}
                session={session}
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
