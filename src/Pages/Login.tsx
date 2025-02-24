import { Navigate } from 'react-router-dom';
import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { apiClient } from '../services/api';

interface LoginProps {
  supabase: SupabaseClient;
  session: Session | null;
}

export const Login: React.FC<LoginProps> = ({ supabase, session }) => {
  const api = apiClient();
  if (session) {
    console.log(api.get('/greeting/whoami'));
    return (
      <Navigate
        to="/home"
        replace
      />
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.get('email'),
        password: formData.get('password'),
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
