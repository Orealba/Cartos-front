import React from 'react';

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
    transition: 'all 300ms',
    border: 'var(--my-yellow)',
  };

  const tipoStyles = {
    basico: {
      backgroundColor: 'var(--color-myYellow)',
      borderRadius: '1rem',
      boxShadow: '-1px -1px 5px #e5a01d, 1px 1px 5px #efa61f',
      ':hover': {
        backgroundColor: 'var(--color-myGreen)',
        borderColor: 'var(--color-myYellow)',
      },
    },
    agregar: {
      backgroundColor: 'var(--color-myYellow)',
      borderRadius: '50%',
      boxShadow: '-1px -1px 5px #e5a01d, 1px 1px 5px #efa61f',
      ':hover': {
        backgroundColor: 'var(--color-myGreen)',
        borderColor: 'var(--color-myYellow)',
      },
    },
    danger: {
      backgroundColor: 'var(--color-myYellow)',
      borderRadius: '1rem',
      boxShadow: '-1px -1px 5px #e5a01d, 1px 1px 5px #efa61f',
      ':hover': {
        backgroundColor: 'rgb(186, 16, 16)',
      },
    },
    green: {
      backgroundColor: 'var(--color-myYellow)',
      borderRadius: '1rem',
      boxShadow: '-1px -1px 5px #e5a01d, 1px 1px 5px #efa61f',
      ':hover': {
        backgroundColor: 'rgb(106, 171, 9)',
        borderColor: 'var(--color-myYellow)',
      },
    },
  };

  const combinedStyle = {
    ...baseStyle,
    ...(tipo ? tipoStyles[tipo] : {}),
  };

  return (
    <button
      onClick={onClick}
      className={className}
      style={combinedStyle}>
      {texto || 'BotonGeneral'}
    </button>
  );
};
