import './App.css';
import 'flowbite/dist/flowbite.min.js';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { supabase } from './SupabaseClient';
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';

import { AuthProvider } from './Context/AuthContext';

import { Rutas } from './Rutas';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

   
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
        <Rutas
          session={session}
          isLoading={isLoading}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

export default App;
