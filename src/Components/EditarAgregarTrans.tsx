import { BotonGuardarTrans } from './Botones/BotonGuardarTrans/BotonGuardarTrans';
import { BotonCancelarTrans } from './Botones/BotonCancelarTrans/BotonCancelarTrans';
import { TituloTransacciones } from './TransacionesComponents/TituloTransacciones';
import { MontoTransacciones } from './TransacionesComponents/MontoTransacciones';
import { FechaTransacciones } from './TransacionesComponents/FechaTransacciones';
import { RecurrenteTransacciones } from './TransacionesComponents/RecurrenteTransacciones';
import { TipoTransacciones } from './TransacionesComponents/TipoTransacciones';
import { NotaTransacciones } from './TransacionesComponents/NotaTransacciones';
import { CategoríaTransacciones } from './TransacionesComponents/CategoríaTransacciones';
import { BotonPagado } from './Botones/BotonPagado/BotonPagado';
import { BotonBorraTrans } from './Botones/BotonBorraTrans/BotonBorraTrans';
export const EditarAgregarTrans = () => {
  return (
    <>
      <div className="flex justify-center gap-56 mt-35 sm:mt-35 md:mt-4 lg:mt-5">
        <BotonCancelarTrans />
        <BotonGuardarTrans />
      </div>
      <div className="bg-myGray/50 rounded-2xl px-12 sm:px-12 md:px-24 lg:px-35 py-6 sm:py-8 md:py-10 lg:py-16 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
        <div>
          <TituloTransacciones />
          <MontoTransacciones />
          <FechaTransacciones />
          <RecurrenteTransacciones />
          <TipoTransacciones />
          <CategoríaTransacciones />
          <NotaTransacciones />
        </div>

        <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-8">
          <BotonPagado />
          <div className="mt-1.5 xs:mt-2 sm:mt-3 md:mt-4 lg:mt-4">
            <BotonBorraTrans />
          </div>
        </div>
      </div>
    </>
  );
};
