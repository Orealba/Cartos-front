import logo from '../assets/Images/Logo.svg';

import phone from '../assets/Images/phone.png';
import { BotonAmarillo } from './Botones/BotonAmarillo';
export const Landing = () => {
  return (
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
        {/* <div className="flex items-center justify-center">
          <img
            src={icon}
            alt=""
            className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-15 lg:h-15"
          />
        </div> */}
        <div className="flex items-center justify-center"></div>
        <BotonAmarillo to="/login" />
      </div>
    </div>
  );
};
