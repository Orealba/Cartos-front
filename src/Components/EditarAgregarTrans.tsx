import { BotonGuardarTrans } from './Botones/BotonGuardarTrans/BotonGuardarTrans';
import { BotonCancelarTrans } from './Botones/BotonCancelarTrans/BotonCancelarTrans';
import { TituloTransacciones } from './TransacionesComponents/TituloTransacciones';
import { MontoTransacciones } from './TransacionesComponents/MontoTransacciones';
import { FechaTransacciones } from './TransacionesComponents/FechaTransacciones';
import { RecurrenteTransacciones } from './TransacionesComponents/recurrenteTransacciones';
import { TipoTransacciones } from './TransacionesComponents/TipoTransacciones';
import { NotaTransacciones } from './TransacionesComponents/NotaTransacciones';
import { CategoríaTransacciones } from './TransacionesComponents/CategoríaTransacciones';
export const EditarAgregarTrans = () => {
  return (
    <>
      <div className="flex justify-between">
        <BotonCancelarTrans />
        <BotonGuardarTrans />
      </div>
      <div className=" bg-myGray/50 rounded-2xl px-8 sm:px-8 md:px-20 lg:px-15 py-4 sm:py-6 md:py-8 lg:py-10 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
        <div>
          <TituloTransacciones />
          <MontoTransacciones />
          <FechaTransacciones />
          <RecurrenteTransacciones />
          <TipoTransacciones />
          <CategoríaTransacciones />
          <NotaTransacciones />
        </div>

        <div></div>
      </div>
    </>
  );
};
