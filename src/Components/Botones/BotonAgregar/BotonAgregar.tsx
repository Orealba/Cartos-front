import { useNavigate } from 'react-router-dom';
import './BotonAgregar.css';

export const BotonAgregar: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/agregar-editar-transaccion');
  };

  return (
    <div>
      <div>
        <button
          type="button"
          className="botonAgregar-neumorphism text-4xl rounded-full"
          onClick={handleClick}>
          +
        </button>
      </div>
    </div>
  );
};
