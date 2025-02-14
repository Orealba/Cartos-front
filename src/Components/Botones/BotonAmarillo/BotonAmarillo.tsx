import { useNavigate } from 'react-router-dom';
import './BotonAmarillo.css';
interface BotonAmarilloProps {
  to: string;
}

export const BotonAmarillo = ({ to }: BotonAmarilloProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <button
          onClick={() => navigate(to)}
          type="button"
          className="botonAmarillo-neumorphism">
          COMENZAR
        </button>
      </div>
    </>
  );
};
