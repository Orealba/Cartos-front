import { useEffect } from 'react';
import { initFlowbite } from 'flowbite';
import './BotonDesplegableTransacciones.css';

interface BotonDesplegableTransaccionesProps {
  onSelect: (opcion: 'Egresos' | 'Ingresos') => void;
}

export const BotonDesplegableTransacciones: React.FC<
  BotonDesplegableTransaccionesProps
> = ({ onSelect }) => {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <>
      <div>
        <div className="relative inline-block">
          <button
            id="dropdownOffsetButton"
            data-dropdown-toggle="dropdownDistance"
            data-dropdown-offset-distance="10"
            data-dropdown-offset-skidding="0"
            className="botonDesplegableTransacciones-neumorphism"
            type="button">
            Tipo de transacción:
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
            id="dropdownDistance"
            className="absolute top-full left-0 mt-1 z-10 hidden bg-white divide-y border border-myYellow divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-myGreen">
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefault">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelect('Egresos');
                  }}
                  className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Egresos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelect('Ingresos');
                  }}
                  className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Ingresos
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
