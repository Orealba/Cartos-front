import { TransaccionesPadre } from './TransaccionesPadre';
export const MontoTransacciones = () => {
  return (
    <TransaccionesPadre label="Monto">
      <input
        type="number"
        className="bg-transparent border-0 hover:border-0 text-white"
      />
    </TransaccionesPadre>
  );
};
