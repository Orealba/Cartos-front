import { TransaccionesPadre } from './TransaccionesPadre';
import { useState } from 'react';

interface MontoTransaccionesProps {
  value: string;
  onChange: (value: string) => void;
}

export const MontoTransacciones = ({
  value,
  onChange,
}: MontoTransaccionesProps) => {
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Permitir números, un punto decimal y borrar
    if (newValue === '' || /^\d*\,?\d*$/.test(newValue)) {
      onChange(newValue);
      setError('');
    } else {
      setError('Solo se permiten números');
    }
  };

  return (
    <TransaccionesPadre label="Monto">
      <div className="flex flex-col w-full">
        <div className="flex items-center">
          <input
            type="text"
            value={value}
            onChange={handleChange}
            className={`bg-transparent border-transparent focus:border-myYellow focus:ring-0 text-white w-full outline-none ${
              error ? 'border-red-500' : ''
            }`}
          />
          <span className="text-white -ml-2">€</span>
        </div>
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    </TransaccionesPadre>
  );
};
