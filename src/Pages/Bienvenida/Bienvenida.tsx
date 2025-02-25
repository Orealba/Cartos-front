import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Images/Logo.svg';

import phone from '../../assets/Images/phone.png';
import { BotonGeneral } from '../../Components/Botones/BotonGeneral/BotonGeneral';
import './Bienvenida.css';

export const Bienvenida = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <div>
        <div className="flex justify-center">
          <a
            href="#"
            className="flex items-center">
            <img
              src={logo}
              className="h-12  md:h-15 lg:h-18 transition-all duration-300 mb-10"
              alt="Logo"
            />
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            <img
              src={phone}
              alt=""
              className="w-[80%] h-auto sm:w-[8rem] sm:h-[12rem] md:w-[12rem] md:h-[16rem] lg:w-[50rem] lg:h-[36rem]"
            />
            <div className="flex flex-col items-center sm:block">
              <h2 className="font-['NexaBold'] font-semibold text-xl sm:text-3xl text-myYellow mt-8 sm:mt-40">
                {`Ahorra y organiza tu dinero sin complicaciones.
            Descubre a dónde va cada céntimo
            y toma el control de tus finanzas.`}
              </h2>
              <BotonGeneral
                onClick={handleLoginClick}
                className="botonAmarillo-neumorphism mt-30"
                tipo="basico"
                textoFijo="COMENZAR"
                valorInicial=""
              />
            </div>
          </div>
          <div className=""></div>
        </div>
        {/* este es el código que dibuja la curva */}
        <div className="custom-shape-divider-bottom-1740484337 hidden sm:block">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none">
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"></path>
          </svg>
        </div>
      </div>
    </>
  );
};
