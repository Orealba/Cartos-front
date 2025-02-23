import { Link } from 'react-router-dom';

export const BotonProxGastos = () => {
  return (
    <>
      <div>
        <Link to="/transacciones">
          <button
            type="button"
            className="py-1.5 sm:py-2 md:py-1.5 px-3 sm:px-4 md:px-4 me-1 mb-3 
                     text-xs sm:text-sm md:text-base font-bold 
                     text-white bg-myYellow rounded-full border border-myYellow 
                     hover:bg-myGreen hover:text-myYellow transition-colors duration-300 
                     cursor-pointer">
            Próximas transacciones
          </button>
        </Link>
      </div>
    </>
  );
};
