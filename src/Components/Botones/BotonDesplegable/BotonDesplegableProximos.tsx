import { useEffect } from 'react';
import { initFlowbite } from 'flowbite';
import './BotonDesplegableTransacciones.css'; // mismo CSS

type Period = '1M' | '3M' | '6M' | '12M';

interface Props {
  selectedPeriod: Period;
  setSelectedPeriod: (p: Period) => void;
}

export const BotonDesplegableProximos: React.FC<Props> = ({
  selectedPeriod,
  setSelectedPeriod,
}) => {
  useEffect(() => {
    initFlowbite();
  }, []);

  const opciones: { value: Period; label: string }[] = [
    { value: '1M', label: 'Próximo mes' },
    { value: '3M', label: 'Próximos 3 meses' },
    { value: '6M', label: 'Próximos 6 meses' },
    { value: '12M', label: 'Próximo año' },
  ];

  const etiquetaActual = opciones.find(
    (o) => o.value === selectedPeriod,
  )!.label;

  return (
    <div>
      <button
        id="dropdownProximosButton"
        data-dropdown-toggle="dropdownProximos"
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
        id="dropdownProximos"
        className="z-10 hidden bg-white divide-y border border-myYellow divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-myGreen">
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownProximosButton">
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
