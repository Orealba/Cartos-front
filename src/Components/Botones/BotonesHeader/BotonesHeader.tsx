import './BotonesHeader.css';

export const BotonesHeader = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-55">
      <button
        type="button"
        className="botones-header-neumorphism-total">
        {`Mi Total:\n1000 €`}
      </button>
      <button
        type="button"
        className="botones-header-neumorphism-total">
        {`Límite diario:\n30 €`}
      </button>
    </div>
  );
};
