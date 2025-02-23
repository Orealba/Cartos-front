import { TransaccionesPadre } from './TransaccionesPadre';

export const CategoríaTransacciones = () => {
  return (
    <>
      <div>
        <TransaccionesPadre label="CATEGORÍA">
          {/* <select
          className="input-editraAgregarTrans bg-transparent border-0 hover:border-0 text-white"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}></select> */}
        </TransaccionesPadre>
      </div>
    </>
  );
};
