import { TransaccionesPadre } from './TransaccionesPadre';
import { useState } from 'react';

export const FechaTransacciones = () => {
  const fechaHoy = new Date().toISOString().split('T')[0];
  const [fecha, setFecha] = useState(fechaHoy);

  return (
    <>
      <div className="bg-myGray rounded-xl w-full mx-auto h-10 sm:h-11 md:h-12 lg:h-12 mt-2 sm:mt-3 md:mt-2 lg:mt-2">
        <TransaccionesPadre label="Fecha">
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="bg-transparent border-0 hover:border-0 text-white"
          />
        </TransaccionesPadre>
      </div>
    </>
  );
};
