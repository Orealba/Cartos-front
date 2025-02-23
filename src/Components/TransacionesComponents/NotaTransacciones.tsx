import { TransaccionesPadre } from './TransaccionesPadre';

export const NotaTransacciones = () => {
  return (
    <>
      <div className=" rounded-xl w-full mx-auto h-10 sm:h-11 md:h-12 lg:h-12 mt-2 sm:mt-3 md:mt-2 lg:mt-2">
        <TransaccionesPadre label="Nota">
          <textarea
            className="input-editraAgregarTrans bg-transparent border-0 hover:border-0 text-white"
            placeholder=""
          />
        </TransaccionesPadre>
      </div>
    </>
  );
};
