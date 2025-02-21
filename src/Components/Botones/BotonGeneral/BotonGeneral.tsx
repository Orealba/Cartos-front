import React, { useState } from 'react';
import './BotonGeneral.css';

interface BotonGeneralProps {
  onClick?: () => void;
  className?: string;
  tipo?: 'basico' | 'agregar' | 'danger' | 'green' | 'edit';
  textoFijo: string;
  valorInicial: string;
}

export const BotonGeneral: React.FC<BotonGeneralProps> = ({
  onClick,
  className,
  tipo,
  textoFijo,
  valorInicial,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState(valorInicial);

  const handleButtonClick = () => {
    if (tipo === 'edit') {
      setIsModalOpen(true);
    } else if (onClick) {
      onClick();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleSave = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
    edit: 'botonBasico',
  };

  const combinedClassName = `${className || ''} ${
    tipo ? tipoClasses[tipo] : ''
  }`.trim();

  return (
    <>
      <button
        onClick={handleButtonClick}
        className={combinedClassName}
        style={baseStyle}>
        <div style={{ textAlign: 'center' }}>
          <span>{textoFijo}</span>
          <br />
          <span>{inputValue} €</span>
        </div>
      </button>

      {tipo === 'edit' && isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={handleCancel}
              className="close-button">
              ×
            </button>
            <h2>Editar {textoFijo}</h2>
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              className="bg-green-50 border border-green-500 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            <button
              onClick={handleSave}
              className="save-button">
              Guardar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
