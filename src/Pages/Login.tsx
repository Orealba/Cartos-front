import { Navigate, useNavigate } from 'react-router-dom';
import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { apiClient } from '../services/api';
import { useEffect } from 'react';

interface LoginProps {
  supabase: SupabaseClient;
  session: Session | null;
}

export const Login: React.FC<LoginProps> = ({ supabase, session }) => {
  const api = apiClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      const token = session.access_token;
      const api = apiClient(token);

      const checkAuth = async () => {
        try {
          await api.get('/greeting/whoami');
          navigate('/home');
        } catch (error) {
          console.error('Error checking auth:', error);
        }
      };

      checkAuth();
    }
  }, [session]);

  if (session) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });

      console.log('Respuesta de login:', data);
      console.log('Token:', data.session?.access_token);

      if (error) throw error;
    } catch (error) {
      console.error('Error de login:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-['Star_Jedi'] text-yellow-400">
        log in or Sign up
      </h1>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
      />
    </div>
  );
};
