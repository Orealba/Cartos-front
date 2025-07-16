import { useState, useEffect, useRef } from 'react';

export interface RecurrenceRule {
  interval: number;
  unit: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'; //ESTO LO RECIBIRÁ EL BACK ASÍ REVISAR
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

  return (
    <div className="bg-myGray rounded-xl w-[98%] mx-auto h-auto flex flex-col gap-4 px-6 py-4">
      <div className="flex items-center gap-4">
        <span className="text-white whitespace-nowrap">Recurrente:</span>
        <select
          className="bg-transparent text-white flex-1"
          value={isRecurrente ? 'SI' : 'NO'}
          onChange={(e) => setIsRecurrente(e.target.value === 'SI')}>
          <option value="NO">No</option>
          <option value="SI">Sí</option>
        </select>
      </div>

      {isRecurrente && (
        <>
          <div className="flex items-center gap-4">
            <span className="text-white whitespace-nowrap">Cada:</span>
            <select
              className="bg-transparent text-white flex-1"
              value={frecuencia}
              onChange={(e) => setFrecuencia(e.target.value as any)}>
              <option value="DIARIO">Cada día</option>
              <option value="SEMANAL">Cada semana</option>
              <option value="MENSUAL">Cada mes</option>
              <option value="ANUAL">Cada año</option>
              <option value="CUSTOM">Personalizar...</option>
            </select>
          </div>

          {frecuencia === 'CUSTOM' && (
            <div className="flex items-center gap-4">
              <input
                type="number"
                min={1}
                max={31}
                className="w-16 bg-transparent text-white"
                value={customInterval}
                onChange={(e) => setCustomInterval(Number(e.target.value))}
              />
              <select
                className="bg-transparent text-white flex-1"
                value={customUnit}
                onChange={(e) => setCustomUnit(e.target.value as any)}>
                <option value="DAILY">Día(s)</option>
                <option value="WEEKLY">Semana(s)</option>
                <option value="MONTHLY">Mes(es)</option>
                <option value="YEARLY">Año(s)</option>
              </select>
            </div>
          )}
        </>
      )}
    </div>
  );
};
