import React from 'react';
import ResumenGraficos from '../Components/ResumenGraficos';

interface Props {
  token: string;
}

const Resumen: React.FC<Props> = ({ token }) => {
  return (
    <div className="pt-60 max-w-7xl mx-auto">
      <ResumenGraficos token={token} />
    </div>
  );
};

export default Resumen;
