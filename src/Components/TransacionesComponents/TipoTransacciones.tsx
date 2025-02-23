import { useState, useRef, useEffect } from 'react';

export const TipoTransacciones = () => {
  const [tipo, setTipo] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-myGray/50 rounded-3xl w-[98%] mx-auto h-12 flex items-center px-8">
      <div className="flex items-center gap-4 w-full">
        <span className="text-white whitespace-nowrap">Tipo:</span>
        <div
          className="relative flex-1"
          ref={dropdownRef}>
          <div
            className="bg-transparent text-white cursor-pointer flex items-center gap-4"
            onClick={() => setIsOpen(!isOpen)}>
            <span className="text-white/60">{tipo || 'Seleccionar'}</span>
            <span className="text-white/60 text-sm">▼</span>
          </div>
          {isOpen && (
            <div className="absolute top-full left-0 w-full mt-1 bg-myGreen border border-myYellow rounded-md overflow-hidden z-50">
              <div
                className="px-4 py-2 hover:bg-myGray cursor-pointer"
                onClick={() => {
                  setTipo('Egresos');
                  setIsOpen(false);
                }}>
                Egresos
              </div>
              <div
                className="px-4 py-2 hover:bg-myGray cursor-pointer"
                onClick={() => {
                  setTipo('Ingresos');
                  setIsOpen(false);
                }}>
                Ingresos
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
