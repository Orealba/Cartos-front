import React from 'react';
import ResumenGraficos from '../Components/ResumenGraficos/ResumenGraficos';

interface Props {
  token: string;
}

const Resumen: React.FC<Props> = ({ token }) => {
  return (
    <div className="mt-35">
      <h1 className="mx-auto text-center text-white sm:text-lg md:text-xl ">
        RESUMEN DE GASTOS
      </h1>
      {/* Centramos todo el contenido y damos padding idéntico al resto de páginas */}
      <div className="pt-0">
        <ResumenGraficos token={token} />
      </div>
    </div>
  );
};

export default Resumen;
