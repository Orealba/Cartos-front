export const BotonesHeader = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-55">
      <button
        type="button"
        className="py-1 px-8 text-sm font-bold text-white bg-myYellow rounded-full border border-myYellow hover:bg-myGreen hover:text-myYellow transition-colors duration-300 cursor-pointer whitespace-pre-line">
        {`Mi Total:\n1000 €`}
      </button>
      <button
        type="button"
        className="py-1 px-4 text-sm font-bold text-white bg-myYellow rounded-full border border-myYellow hover:bg-myGreen hover:text-myYellow transition-colors duration-300 cursor-pointer whitespace-pre-line">
        {`Límite diario:\n30 €`}
      </button>
    </div>
  );
};
