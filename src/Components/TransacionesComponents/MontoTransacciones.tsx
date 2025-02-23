import { TransaccionesPadre } from './TransaccionesPadre';

interface MontoTransaccionesProps {
  value: string;
  onChange: (value: string) => void;
}

export const MontoTransacciones = ({
  value,
  onChange,
}: MontoTransaccionesProps) => {
  return (
    <TransaccionesPadre label="Monto">
      <div className="flex items-center">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-transparent focus:border-myYellow focus:ring-0 text-white w-full outline-none"
        />
        <span className="text-white -ml-2">€</span>
      </div>
    </TransaccionesPadre>
  );
};
