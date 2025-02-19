import { BotonGuardarTrans } from '../Components/Botones/BotonGuardarTrans/BotonGuardarTrans';
import { BotonCancelarTrans } from '../Components/Botones/BotonCancelarTrans/BotonCancelarTrans';
import { TituloTransacciones } from '../Components/TransacionesComponents/TituloTransacciones';
import { MontoTransacciones } from '../Components/TransacionesComponents/MontoTransacciones';
import { FechaTransacciones } from '../Components/TransacionesComponents/FechaTransacciones';
import { RecurrenteTransacciones } from '../Components/TransacionesComponents/RecurrenteTransacciones';
import { TipoTransacciones } from '../Components/TransacionesComponents/TipoTransacciones';
import { NotaTransacciones } from '../Components/TransacionesComponents/NotaTransacciones';
import { CategoríaTransacciones } from '../Components/TransacionesComponents/CategoríaTransacciones';
import { BotonPagado } from '../Components/Botones/BotonPagado/BotonPagado';
import { BotonBorraTrans } from '../Components/Botones/BotonBorraTrans/BotonBorraTrans';

export const AgregarEditarTransaccion = () => {
  return (
    <>
      <div className="">
        <div className="flex justify-center gap-56 mt-35 sm:mt-35 md:mt-4 lg:mt-25">
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
      </div>
    </>
  );
};
