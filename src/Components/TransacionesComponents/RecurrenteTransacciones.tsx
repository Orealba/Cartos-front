import { useState, useEffect, useRef } from 'react';

export interface RecurrenceRule {
  interval: number;
  unit: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
}

export interface RecurrenteTransaccionesProps {
  initialRule?: RecurrenceRule | null;
  onChange: (rule: RecurrenceRule | null) => void;
}

export const RecurrenteTransacciones: React.FC<
  RecurrenteTransaccionesProps
> = ({ initialRule = null, onChange }) => {
  const [isRecurrente, setIsRecurrente] = useState<boolean>(!!initialRule);
  const [frecuencia, setFrecuencia] = useState<
    'DIARIO' | 'SEMANAL' | 'MENSUAL' | 'ANUAL' | 'CUSTOM'
  >(() => {
    if (!initialRule) return 'DIARIO';
    switch (initialRule.unit) {
      case 'DAILY':
        return 'DIARIO';
      case 'WEEKLY':
        return 'SEMANAL';
      case 'MONTHLY':
        return 'MENSUAL';
      case 'YEARLY':
        return 'ANUAL';
    }
  });
  const [customInterval, setCustomInterval] = useState<number>(
    initialRule?.interval ?? 1,
  );
  const [customUnit, setCustomUnit] = useState<
    'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
  >(initialRule?.unit ?? 'DAILY');

  // Propagar cambios
  useEffect(() => {
    if (!isRecurrente) {
      onChange(null);
      return;
    }
    if (frecuencia !== 'CUSTOM') {
      const mapUnit = {
        DIARIO: 'DAILY',
        SEMANAL: 'WEEKLY',
        MENSUAL: 'MONTHLY',
        ANUAL: 'YEARLY',
      } as const;
      onChange({ interval: 1, unit: mapUnit[frecuencia] });
    } else {
      onChange({ interval: customInterval, unit: customUnit });
    }
  }, [isRecurrente, frecuencia, customInterval, customUnit, onChange]);

  // Hook genérico de dropdown
  const useDropdown = <T,>(
    initial: T,
  ): [T, boolean, React.RefObject<HTMLDivElement | null>, (v?: T) => void] => {
    const [value, setValue] = useState<T>(initial);
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, []);

    const toggle = (newVal?: T) => {
      if (newVal !== undefined) setValue(newVal);
      setOpen((o) => !o);
    };

    return [value, open, ref, toggle];
  };

  // Dropdowns
  const [selRecurrente, openRecurrente, refRecurrente, toggleRecurrente] =
    useDropdown<'Sí' | 'No'>(isRecurrente ? 'Sí' : 'No');
  const [selFrecuencia, openFrecuencia, refFrecuencia, toggleFrecuencia] =
    useDropdown<string>(
      frecuencia === 'DIARIO'
        ? 'Cada día'
        : frecuencia === 'SEMANAL'
        ? 'Cada semana'
        : frecuencia === 'MENSUAL'
        ? 'Cada mes'
        : frecuencia === 'ANUAL'
        ? 'Cada año'
        : 'Personalizar...',
    );
  // Custom-unit dropdown
  const unitLabels = ['Día(s)', 'Semana(s)', 'Mes(es)', 'Año(s)'] as const;
  const labelToUnit = {
    'Día(s)': 'DAILY',
    'Semana(s)': 'WEEKLY',
    'Mes(es)': 'MONTHLY',
    'Año(s)': 'YEARLY',
  } as const;
  const [selCustomUnit, openCustomUnit, refCustomUnit, toggleCustomUnit] =
    useDropdown<string>(
      unitLabels.find((l) => labelToUnit[l] === customUnit) || unitLabels[0],
    );

  // Handlers
  const handleSelectRecurrente = (v: 'Sí' | 'No') => {
    setIsRecurrente(v === 'Sí');
    toggleRecurrente(v);
  };
  const handleSelectFrecuencia = (v: string) => {
    toggleFrecuencia(v);
    if (v === 'Cada día') setFrecuencia('DIARIO');
    else if (v === 'Cada semana') setFrecuencia('SEMANAL');
    else if (v === 'Cada mes') setFrecuencia('MENSUAL');
    else if (v === 'Cada año') setFrecuencia('ANUAL');
    else setFrecuencia('CUSTOM');
  };
  const handleSelectCustomUnit = (v: string) => {
    toggleCustomUnit(v);
    setCustomUnit(labelToUnit[v as keyof typeof labelToUnit]);
  };

  return (
    <div className="bg-myGray rounded-xl w-[98%] mx-auto flex flex-col gap-4 px-6 py-4">
      {/* Recurrente */}
      <div className="flex items-center gap-4">
        <span className="text-white whitespace-nowrap">Recurrente:</span>
        <div
          className="relative flex-1"
          ref={refRecurrente}>
          <div
            className="bg-transparent text-white cursor-pointer flex items-center gap-4"
            onClick={() => toggleRecurrente()}>
            <span className="text-white/60">{selRecurrente}</span>
            <span className="text-white/60 text-sm">⌄</span>
          </div>
          {openRecurrente && (
            <div className="absolute top-full left-0 w-full mt-1 bg-myGreen border border-myYellow rounded-md overflow-hidden z-50">
              {(['No', 'Sí'] as const).map((opt) => (
                <div
                  key={opt}
                  className="px-4 py-2 hover:bg-myGray cursor-pointer text-white"
                  onClick={() => handleSelectRecurrente(opt)}>
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Frecuencia */}
      {isRecurrente && (
        <div className="flex items-center gap-4">
          <span className="text-white whitespace-nowrap">Cada:</span>
          <div
            className="relative flex-1"
            ref={refFrecuencia}>
            <div
              className="bg-transparent text-white cursor-pointer flex items-center gap-4"
              onClick={() => toggleFrecuencia()}>
              <span className="text-white/60">{selFrecuencia}</span>
              <span className="text-white/60 text-sm">⌄</span>
            </div>
            {openFrecuencia && (
              <div className="absolute top-full left-0 w-full mt-1 bg-myGreen border border-myYellow rounded-md overflow-hidden z-50">
                {[
                  'Cada día',
                  'Cada semana',
                  'Cada mes',
                  'Cada año',
                  'Personalizar...',
                ].map((opt) => (
                  <div
                    key={opt}
                    className="px-4 py-2 hover:bg-myGray cursor-pointer text-white"
                    onClick={() => handleSelectFrecuencia(opt)}>
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Personalizar */}
      {isRecurrente && frecuencia === 'CUSTOM' && (
        <div className="flex items-center gap-4">
          <span className="text-white whitespace-nowrap">Personalizar:</span>
          <input
            type="number"
            min={1}
            max={31}
            className="w-16 bg-transparent text-white border border-myYellow rounded px-2 py-1 outline-none"
            value={customInterval}
            onChange={(e) => setCustomInterval(Number(e.target.value))}
          />
          <div
            className="relative flex-1"
            ref={refCustomUnit}>
            <div
              className="bg-transparent text-white cursor-pointer flex items-center gap-4 border border-myYellow rounded px-4 py-2"
              onClick={() => toggleCustomUnit()}>
              <span className="text-white/60">{selCustomUnit}</span>
              <span className="text-white/60 text-sm">⌄</span>
            </div>
            {openCustomUnit && (
              <div className="absolute top-full left-0 w-full mt-1 bg-myGreen border border-myYellow rounded-md overflow-hidden z-50">
                {unitLabels.map((opt) => (
                  <div
                    key={opt}
                    className="px-4 py-2 hover:bg-myGray cursor-pointer text-white"
                    onClick={() => handleSelectCustomUnit(opt)}>
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
