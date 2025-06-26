import React from 'react';
import ResumenGraficos from '../Components/ResumenGraficos';

interface Props {
  token: string;
}

const Resumen: React.FC<Props> = ({ token }) => {
  return (
    <div className="pt-60 pb-10 bg-teal-900 min-h-screen">
      {/* Centramos todo el contenido y damos padding idéntico al resto de páginas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ResumenGraficos token={token} />
      </div>
    </div>
  );
};

export default Resumen;
