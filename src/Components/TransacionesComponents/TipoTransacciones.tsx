import { useState } from 'react';
import { TransaccionesPadre } from './TransaccionesPadre';

export const TipoTransacciones = () => {
  const [tipo, setTipo] = useState<string>('');

  return (
    <div className="bg-myGray rounded-4xl w-full mx-auto h-10 sm:h-11 md:h-12 lg:h-12 mt-2 sm:mt-3 md:mt-2 lg:mt-2">
      <TransaccionesPadre label="TIPO">
        <select
          className="input-editraAgregarTrans bg-transparent border-0 hover:border-0 text-white"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}>
          <option value="">Seleccionar</option>
          <option value="egresos">Egresos</option>
          <option value="ingresos">Ingresos</option>
        </select>
      </TransaccionesPadre>
    </div>
  );
};
