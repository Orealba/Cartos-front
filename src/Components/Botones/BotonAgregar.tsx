import React from 'react';

export const BotonAgregar: React.FC = () => {
  return (
    <>
      <div>
        <div>
          <button
            type="button"
            className="py-2.5 px-5  ml-25  text-xl font-bold text-white bg-myYellow rounded-full border border-myYellow hover:bg-myGreen hover:text-myYellow transition-colors duration-300 cursor-pointer">
            +
          </button>
        </div>
      </div>
    </>
  );
};
