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
            <div className="flex flex-col items-center sm:block sm:max-w-4xl mx-auto ">
              <h2 className="font-['NexaBold'] text-base sm:text-xl text-myYellow mt-8 sm:mt-20 leading-relaxed text-justify">
                <h1 className="text-center sm:text-2xl pb-5">
                  Controla tus gastos fácilmente:
                </h1>
                <p>
                  Registra cada gasto, ya sea puntual o recurrente, de forma
                  rápida y sencilla. Programa pagos futuros para no olvidar
                  ninguna obligación financiera.
                </p>
                <p className="mt-4">
                  Con el calendario integrado, visualiza tus gastos diarios y
                  controla si superas los límites que hayas establecido, todo
                  desde una interfaz clara y organizada.
                </p>
              </h2>
              <BotonGeneral
                onClick={handleLoginClick}
                className="botonAmarillo-neumorphism mt-15"
                tipo="basico"
                textoFijo="COMENZAR"
                valorInicial=""
              />
            </div>
          </div>
          <div className=""></div>
        </div>
        <div className="relative custom-shape-divider-bottom-1740484337 hidden sm:block">
          <p className="absolute w-full bottom-10 text-xs sm:text-sm text-gray-400 text-center px-4 leading-relaxed z-10">
            Este proyecto ha sido desarrollado por{' '}
            <a
              href="https://www.orealbasoriano.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-myYellow transition-colors duration-200">
              Orealba Soriano
            </a>{' '}
            y se encuentra en fase de pruebas.
            <br />
            Si deseas colaborar o compartir tu opinión, puedes acceder al código
            fuente en{' '}
            <a
              href="https://github.com/Orealba/Cartos-front"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-myYellow transition-colors duration-200">
              GitHub
            </a>
            .
          </p>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="pointer-events-none">
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            />
          </svg>
        </div>
      </div>
    </>
  );
};
