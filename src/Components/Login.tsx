import React, { useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // ... tu lógica de validación ...
      localStorage.setItem('isAuthenticated', 'true');
      login();
      console.log('Login exitoso, isAuthenticated establecido');
      navigate('/home');
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  return <div>Login Component</div>;
};

export default Login;
