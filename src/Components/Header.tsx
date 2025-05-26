import { MyCalendar } from './Calendar/MyCalendar';
import { BotonGeneral } from './Botones/BotonGeneral/BotonGeneral';
import './Botones/EstilosBotones/BotonAgregar.css';
import './Botones/EstilosBotones/BotonesHeader.css';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  const handleTotalClick = () => {
    console.log('Mi Total clickeado');
  };

  const handleLimiteClick = () => {
    console.log('Límite diario clickeado');
  };

  const handleAgregarClick = () => {
    navigate('/agregar-editar-transaccion');
  };

  return (
    <>
      <div>
        <div className="w-full flex justify-center mt-34">
          <h1 className="text-center text-white text-base sm:text-lg md:text-xl max-w-xl px-4">
            Control diario de gastos: añade tus gastos, fija tus límites y
            consulta los cobros próximos desde el calendario.
          </h1>
        </div>
        <div className="w-full flex justify-center mt-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-20 md:gap-32 lg:gap-56">
            <BotonGeneral
              onClick={handleTotalClick}
              tipo="edit"
              textoFijo="Mi Total:"
              valorInicial="1000"
            />
            <BotonGeneral
              onClick={handleLimiteClick}
              tipo="edit"
              textoFijo="Límite diario:"
              valorInicial="30"
            />
          </div>
        </div>
        <div>
          <div className="bg-myGray/50 rounded-2xl px-8 sm:px-8 md:px-20 lg:px-30 py-4 sm:py-6 md:py-8 lg:py-10 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
            <MyCalendar></MyCalendar>
            <div className="w-full flex justify-end pr-2 ml-5 md:ml-15">
              <div className="transform scale-75 sm:scale-85 md:scale-90 lg:scale-100 origin-right">
                <BotonGeneral
                  onClick={handleAgregarClick}
                  tipo="agregar"
                  className="botonAgregar-neumorphism"
                  textoFijo="+"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
