import { TransaccionesPadre } from './TransaccionesPadre';

interface NotaTransaccionesProps {
  value: string;
  onChange: (value: string) => void;
}

export const NotaTransacciones = ({
  value,
  onChange,
}: NotaTransaccionesProps) => {
  return (
    <>
      <div className="rounded-xl w-full mx-auto h-10 sm:h-11 md:h-12 lg:h-12 mt-2 sm:mt-3 md:mt-2 lg:mt-2">
        <TransaccionesPadre label="Nota">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent border-transparent focus:border-myYellow focus:ring-0 text-white w-full outline-none"
            placeholder=""
          />
        </TransaccionesPadre>
      </div>
    </>
  );
};
