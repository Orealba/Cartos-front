import { Navigate, useNavigate } from 'react-router-dom';
import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { apiClient } from '../services/api';
import { useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import logo from '../assets/Images/Logo.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface LoginProps {
  supabase: SupabaseClient;
  session: Session | null;
}

export const Login: React.FC<LoginProps> = ({ supabase, session }) => {
  const { setSession } = useAuth();
  const [authKey, setAuthKey] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      setSession(session);
      const token = session.access_token;
      const api = apiClient(token);

      const checkAuth = async () => {
        try {
          await api.get('/greeting/whoami');
          navigate('/home');
          setAuthKey(Date.now());
        } catch (error) {
          console.error('Error checking auth:', error);
        }
      };

      checkAuth();
    }
  }, [session, setSession, navigate]);

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
      <div className="flex justify-center">
        <Link
          to="/"
          className="flex items-center">
          <img
            src={logo}
            className="h-12  md:h-15 lg:h-18 transition-all duration-300 mb-20"
            alt="Logo"
          />
        </Link>
      </div>
      <h1 className="text-3xl  text-myYellow">Inicia sesión o Regístrate</h1>
      <Auth
        key={authKey}
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        localization={{
          variables: {
            sign_in: {
              email_label: 'Correo electrónico',
              password_label: 'Contraseña',
              email_input_placeholder: 'Tu correo electrónico',
              password_input_placeholder: 'Tu contraseña',
              button_label: 'Iniciar sesión',
              loading_button_label: 'Iniciando sesión ...',
              social_provider_text: 'Iniciar sesión con {{provider}}',
              link_text: '¿Ya tienes una cuenta? Inicia sesión',
            },
            sign_up: {
              email_label: 'Correo electrónico',
              password_label: 'Contraseña',
              email_input_placeholder: 'Tu correo electrónico',
              password_input_placeholder: 'Tu contraseña',
              button_label: 'Registrarse',
              loading_button_label: 'Registrando ...',
              social_provider_text: 'Registrarse con {{provider}}',
              link_text: '¿No tienes una cuenta? Regístrate',
            },
            forgotten_password: {
              email_label: 'Correo electrónico',
              password_label: 'Contraseña',
              email_input_placeholder: 'Tu correo electrónico',
              button_label: 'Enviar instrucciones',
              loading_button_label: 'Enviando instrucciones ...',
              link_text: '¿Olvidaste tu contraseña?',
            },
          },
        }}
      />
    </div>
  );
};
