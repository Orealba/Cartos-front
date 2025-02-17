import { BotonGuardarTrans } from './Botones/BotonGuardarTrans/BotonGuardarTrans';
import { BotonCancelarTrans } from './Botones/BotonCancelarTrans/BotonCancelarTrans';
export const EditarAgregarTrans = () => {
  return (
    <>
      <div className="flex justify-between">
        <BotonCancelarTrans />
        <BotonGuardarTrans />
      </div>
    </>
  );
};
