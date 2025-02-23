import { useState, useRef, useEffect } from 'react';
import { TransaccionesPadre } from './TransaccionesPadre';
import './TransaccionGeneralForm.css';

interface TransaccionGeneralFormProps {
  tipo: 'select' | 'text' | 'number' | 'date';
  label: string;
  opciones?: { valor: string; texto: string }[];
  valor: string;
  onChange: (valor: string) => void;
  required?: boolean;
}

export const TransaccionGeneralForm = ({
  tipo,
  label,
  opciones,
  valor,
  onChange,
  required,
}: TransaccionGeneralFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderInput = () => {
    switch (tipo) {
      case 'select':
        return (
          <div
            className="relative w-full"
            ref={dropdownRef}>
            <div className="w-full flex items-center bg-myGray/50 rounded-xl ">
              <label className="text-white whitespace-nowrap mr-2">
                {label}:
              </label>
              <div
                className="flex-1 flex items-center justify-between cursor-pointer py-2 px-30"
                onClick={() => setIsOpen(!isOpen)}>
                <span className="text-white">
                  {opciones?.find((opt) => opt.valor === valor)?.texto ||
                    'Seleccionar'}
                </span>
                <span className="text-white">▼</span>
              </div>
            </div>
            {isOpen && (
              <div className="absolute top-full left-0 w-full mt-1 bg-myGreen border border-myYellow rounded-md overflow-hidden z-50">
                {opciones?.map((opcion) => (
                  <div
                    key={opcion.valor}
                    className="px-3 py-2 hover:bg-myGray cursor-pointer text-white"
                    onClick={() => {
                      onChange(opcion.valor);
                      setIsOpen(false);
                    }}>
                    {opcion.texto}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      // Aquí irán los otros casos cuando los necesitemos
      default:
        return null;
    }
  };

  return <div className="w-full">{renderInput()}</div>;
};
