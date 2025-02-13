import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  canActivate: boolean;
  isLoading: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  canActivate,
  isLoading,
}) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!canActivate) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
};
