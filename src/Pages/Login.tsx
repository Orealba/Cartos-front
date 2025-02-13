import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SupabaseClient, Session } from '@supabase/supabase-js';

interface LoginProps {
  supabase: SupabaseClient;
  session: Session | null;
}
export const Login: React.FC<LoginProps> = ({ supabase, session }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (session) {
      navigate('/ships');
    }
  }, [session, navigate]);

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
