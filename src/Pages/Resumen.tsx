import React from 'react';
import ResumenGraficos from '../Components/ResumenGraficos';

interface Props {
  token: string;
}

const Resumen: React.FC<Props> = ({ token }) => {
  return (
    <div className="mt-30">
      <h1 className="text-center text-white text-base sm:text-lg md:text-xl max-w-xl ">
        Resumen de gastos por categoría
      </h1>
      {/* Centramos todo el contenido y damos padding idéntico al resto de páginas */}
      <div className="max-w-7xl mx-auto pt-0">
        <ResumenGraficos token={token} />
      </div>
    </div>
  );
};

export default Resumen;
