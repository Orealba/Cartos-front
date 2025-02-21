import React from 'react';
import './BotonGeneral.css';

interface BotonGeneralProps {
  onClick?: () => void;
  className?: string;
  tipo?: 'basico' | 'agregar' | 'danger' | 'green';
  texto?: string;
}

export const BotonGeneral: React.FC<BotonGeneralProps> = ({
  onClick,
  className,
  tipo,
  texto,
}) => {
  const baseStyle = {
    fontSize: '1rem',
    color: 'white',
    cursor: 'pointer',
    border: 'var(--my-yellow)',
  };

  const tipoClasses = {
    basico: 'botonBasico',
    agregar: 'botonAgregar',
    danger: 'botonDanger',
    green: 'botonGreen',
  };

  const combinedClassName = `${className || ''} ${
    tipo ? tipoClasses[tipo] : ''
  }`.trim();

  return (
    <button
      onClick={onClick}
      className={combinedClassName}
      style={baseStyle}>
      {texto || 'BotonGeneral'}
    </button>
  );
};
