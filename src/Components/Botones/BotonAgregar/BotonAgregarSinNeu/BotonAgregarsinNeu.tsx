import { useNavigate } from 'react-router-dom';
import './BotonAgregarSinNeu.css';

export const BotonAgregarSinNeu: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/agregar-editar-transaccion');
  };

  return (
    <div>
      <div>
        <button
          type="button"
          className="botonAgregar-sin-neumorphism text-4xl rounded-full"
          onClick={handleClick}>
          +
        </button>
      </div>
    </div>
  );
};
