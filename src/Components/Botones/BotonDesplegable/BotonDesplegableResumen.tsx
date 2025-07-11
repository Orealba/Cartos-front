// src/components/BotonDesplegableResumen.tsx
import { useEffect } from 'react';
import { initFlowbite } from 'flowbite';
import './BotonDesplegableTransacciones.css'; // reutiliza la misma hoja de estilos

type Period = '1M' | '3M' | '6M' | '12M';
interface Props {
  selectedPeriod: Period;
  setSelectedPeriod: (p: Period) => void;
}

export const BotonDesplegableResumen: React.FC<Props> = ({
  selectedPeriod,
  setSelectedPeriod,
}) => {
  useEffect(() => {
    initFlowbite();
  }, []);

  const opciones: { value: Period; label: string }[] = [
    { value: '1M', label: 'Último mes' },
    { value: '3M', label: 'Últimos 3 meses' },
    { value: '6M', label: 'Últimos 6 meses' },
    { value: '12M', label: 'Último año' },
  ];

  const etiquetaActual = opciones.find(
    (o) => o.value === selectedPeriod,
  )!.label;

  return (
    <div>
      <button
        id="dropdownResumenButton"
        data-dropdown-toggle="dropdownResumen"
        data-dropdown-offset-distance="10"
        data-dropdown-offset-skidding="0"
        className="botonDesplegableTransacciones-neumorphism"
        type="button">
        {etiquetaActual}
        <svg
          className="w-2.5 h-2.5 ms-3 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>

      <div
        id="dropdownResumen"
        className="z-10 hidden bg-white divide-y border border-myYellow divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-myGreen">
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownResumenButton">
          {opciones.map((opt) => (
            <li key={opt.value}>
              <a
                href="#"
                className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedPeriod(opt.value);
                }}>
                {opt.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
