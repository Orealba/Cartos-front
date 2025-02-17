interface TransaccionesPadreProps {
  label: string;
  children: React.ReactNode;
}
export const TransaccionesPadre: React.FC<TransaccionesPadreProps> = ({
  label,
  children,
}) => {
  return (
    <div className="flex display-flex ">
      <h1 className="text-white text-base sm:text-lg md:text-lg p-3 ml-3">
        {label}:
      </h1>
      {children}
    </div>
  );
};
