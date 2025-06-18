import React from 'react';
import ResumenGraficos from '../Components/ResumenGraficos';

interface Props {
  token: string;
}

const Resumen: React.FC<Props> = ({ token }) => {
  return (
    <div className="pt-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Summary</h1>
      <ResumenGraficos token={token} />
    </div>
  );
};

export default Resumen;
