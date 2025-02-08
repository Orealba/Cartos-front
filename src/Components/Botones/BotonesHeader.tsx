export const BotonesHeader = () => {
  return (
    <>
      <div className="flex flex-row gap-75">
        <button
          type="button"
          className="py-1 px-9 me-2 mb-2 text-sm font-bold text-white bg-myYellow rounded-full border border-myYellow hover:bg-myGreen hover:text-myYellow transition-colors duration-300 cursor-pointer whitespace-pre-line">
          {`Mi Total:
          1000 €`}
        </button>
        <button
          type="button"
          className="py-1 px-5 me-2 mb-2 text-sm font-bold text-white bg-myYellow rounded-full border border-myYellow hover:bg-myGreen hover:text-myYellow transition-colors duration-300 cursor-pointer whitespace-pre-line">
          {`Límite diario:
           30 €`}
        </button>
      </div>
    </>
  );
};
