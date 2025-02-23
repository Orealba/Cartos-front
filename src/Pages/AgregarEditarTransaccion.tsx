import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { TituloTransacciones } from '../Components/TransacionesComponents/TituloTransacciones';
import { MontoTransacciones } from '../Components/TransacionesComponents/MontoTransacciones';
import { FechaTransacciones } from '../Components/TransacionesComponents/FechaTransacciones';

import { TipoTransacciones } from '../Components/TransacionesComponents/TipoTransacciones';
import { NotaTransacciones } from '../Components/TransacionesComponents/NotaTransacciones';
import { CategoriaTransacciones } from '../Components/TransacionesComponents/CategoriaTransacciones';
import '../Components/Botones/EstilosBotones/BotonCancelarTrans.css';
import '../Components/Botones/EstilosBotones/BotonGuardarTrans.css';
import '../Components/Botones/EstilosBotones/BotonBorraTrans.css';
import { BotonGeneral } from '../Components/Botones/BotonGeneral/BotonGeneral';

//tipo debe estar primero y por defecto debe ser egreso
//hay que hacer un fetch para recuperar las categorías y que se muestren en un desplegable en la parte de categoria
//categoría debe estar de segundo
///Recurrente debo quitarlo
export const AgregarEditarTransaccion = () => {
  const navigate = useNavigate();
  const [tipoSeleccionado, setTipoSeleccionado] = useState('Egresos');

  return (
    <>
      <div className="">
        <div className="flex justify-center gap-56 mt-35 sm:mt-35 md:mt-4 lg:mt-25">
          <BotonGeneral
            onClick={() => navigate('/transacciones')}
            tipo="danger"
            className="botonCancelarTrans-neumorphism"
            textoFijo="Cancelar"
          />
          <BotonGeneral
            onClick={() => console.log('Guardar')}
            tipo="green"
            className="botonGuardarTrans-neumorphism"
            textoFijo="Guardar"
          />
        </div>
        <div className="bg-myGray/50 rounded-2xl px-12 sm:px-12 md:px-24 lg:px-35 py-6 sm:py-8 md:py-10 lg:py-16 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
          <div>
            <TipoTransacciones onTipoChange={setTipoSeleccionado} />
            <CategoriaTransacciones tipoSeleccionado={tipoSeleccionado} />
            <TituloTransacciones />
            <MontoTransacciones />
            <FechaTransacciones />

            <NotaTransacciones />
          </div>
          {/* NECESITAS PONER EL BOTON DE BORRAR CUANDO UNA TRASACCION SE VAYA A EDITA, O SEA QUE HAYA SIDO GUARDADA ANTES */}
          <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-8">
            <div className="mt-1.5 xs:mt-2 sm:mt-3 md:mt-4 lg:mt-4">
              <BotonGeneral
                onClick={() => console.log('Borrar')}
                tipo="danger"
                className="botonBorraTrans-neumorphism"
                textoFijo="Borrar"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
