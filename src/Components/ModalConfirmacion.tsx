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
      <div className="bg-myGreen rounded-xl  border-myYellow border-1 p-6 w-96 relative">
        {/* Botón X para cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-300">
          ✕
        </button>

        {/* Mensaje */}
        <div className="mt-4 mb-6 text-white text-center">{mensaje}</div>

        {/* Botones */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};
