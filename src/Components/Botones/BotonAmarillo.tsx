import { useNavigate } from 'react-router-dom';

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
          className="py-2.5 px-5 me-2 mb-2 text-sm font-bold text-white bg-myYellow rounded-full border border-myYellow hover:bg-myGreen hover:text-myYellow transition-colors duration-300 cursor-pointer">
          COMENZAR
        </button>
      </div>
    </>
  );
};
