interface ModalConfirmacionProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  mensaje: string;
}

export const ModalConfirmacion = ({
  isOpen,
  onClose,
  onConfirm,
  mensaje,
}: ModalConfirmacionProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-myGray/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-myGreen rounded-xl border-myYellow border-1 p-4 sm:p-6 w-[80%] sm:w-96 relative">
        {/* Botón X para cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-300">
          ✕
        </button>

        {/* Mensaje */}
        <div className="mt-4 mb-4 sm:mb-6 text-white text-center text-sm sm:text-base">
          {mensaje}
        </div>

        {/* Botones */}
        <div className="flex justify-center gap-3 sm:gap-4">
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm sm:text-base">
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm sm:text-base">
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};
