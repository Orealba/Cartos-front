import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Images/Logo.svg';

import phone from '../assets/Images/phone.png';
import { BotonGeneral } from '../Components/Botones/BotonGeneral/BotonGeneral';

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
              className="h-12  md:h-15 lg:h-15 transition-all duration-300"
              alt="Logo"
            />
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row">
            <img
              src={phone}
              alt=""
              className="w-[8rem] h-[12rem] sm:w-[10rem] sm:h-[14rem] md:w-[12rem] md:h-[16rem] lg:w-[50rem] lg:h-[36rem]"
            />
            <h2 className="font-['NexaBold'] font-semibold text-3xl text-myYellow  mt-55 ">
              {`Ahorra y organiza tu dinero sin complicaciones.
            Descubre a dónde va cada céntimo
            y toma el control de tus finanzas.`}
            </h2>
          </div>

          <div className="flex items-center justify-center">
            <BotonGeneral
              onClick={handleLoginClick}
              className="botonAmarillo-neumorphism"
              tipo="basico"
              textoFijo="COMENZAR"
              valorInicial=""
            />
          </div>
        </div>
      </div>
    </>
  );
};
