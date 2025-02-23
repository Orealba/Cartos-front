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
  const [titulo, setTitulo] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [nota, setNota] = useState('');

  // Limpiar todos los campos cuando cambia el tipo
  const handleTipoChange = (nuevoTipo: string) => {
    setTipoSeleccionado(nuevoTipo);
    setTitulo('');
    setMonto('');
    setFecha(new Date().toISOString().split('T')[0]);
    setNota('');
  };

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
            <TipoTransacciones onTipoChange={handleTipoChange} />
            <CategoriaTransacciones tipoSeleccionado={tipoSeleccionado} />
            <TituloTransacciones
              value={titulo}
              onChange={setTitulo}
            />
            <MontoTransacciones
              value={monto}
              onChange={setMonto}
            />
            <FechaTransacciones
              value={fecha}
              onChange={setFecha}
            />
            <NotaTransacciones
              value={nota}
              onChange={setNota}
            />
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
