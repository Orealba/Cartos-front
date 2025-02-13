import { Outlet } from 'react-router-dom';
import { SupabaseClient } from '@supabase/supabase-js';
import { Session } from '@supabase/supabase-js';
import { Login } from '../../Pages/Login';

interface ProtectedRouteProps {
  canActivate: boolean;
  supabase: SupabaseClient;
  session: Session | null;
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  canActivate,
  supabase,
  session,
}) => {
  if (canActivate) {
    return (
      <Login
        supabase={supabase}
        session={session}
      />
    );
  }

  return <Outlet />;
};
