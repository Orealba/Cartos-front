import './BotonProxGastos.css';
import { Link } from 'react-router-dom';

export const BotonProxGastos = () => {
  return (
    <>
      <div>
        <Link to="/transacciones">
          <button
            type="button"
            className="botonProxGastos-neumorphism">
            Próximas transacciones
          </button>
        </Link>
      </div>
    </>
  );
};
