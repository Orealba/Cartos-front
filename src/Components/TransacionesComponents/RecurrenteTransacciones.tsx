import { useState } from 'react';
import { TransaccionesPadre } from './TransaccionesPadre';

export const RecurrenteTransacciones = () => {
  const [isRecurrent, setIsRecurrent] = useState<string>('');
  const [frecuencia, setFrecuencia] = useState<string>('');
  const [dia, setDia] = useState<string>('');
  const [mes, setMes] = useState<string>('');

  const dias = Array.from({ length: 31 }, (_, i) => i + 1);
  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const handleRecurrentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setIsRecurrent(value);
    if (value === 'NO' || value === '') {
      // Resetear todos los estados si se selecciona NO o se deselecciona
      setFrecuencia('');
      setDia('');
      setMes('');
    }
  };

  return (
    <div>
      <TransaccionesPadre label="RECURRENTE">
        <select
          className="input-editraAgregarTrans bg-transparent border-0 hover:border-0 text-white"
          value={isRecurrent}
          onChange={handleRecurrentChange}>
          <option value="">Seleccionar</option>
          <option value="SI">SI</option>
          <option value="NO">NO</option>
        </select>
      </TransaccionesPadre>

      {isRecurrent === 'SI' && (
        <TransaccionesPadre label="FRECUENCIA">
          <select
            className="input-editraAgregarTrans bg-transparent border-0 hover:border-0 text-white"
            value={frecuencia}
            onChange={(e) => setFrecuencia(e.target.value)}>
            <option value="">Seleccionar frecuencia</option>
            <option value="mensual">Cada mes</option>
            <option value="bimestral">Cada dos meses</option>
            <option value="personalizar">Personalizar</option>
          </select>
        </TransaccionesPadre>
      )}

      {frecuencia === 'personalizar' && (
        <>
          <TransaccionesPadre label="DÍA">
            <select
              className="input-editraAgregarTrans bg-transparent border-0 hover:border-0 text-white"
              value={dia}
              onChange={(e) => setDia(e.target.value)}>
              <option value="">Seleccionar día</option>
              {dias.map((d) => (
                <option
                  key={d}
                  value={d}>
                  {d}
                </option>
              ))}
            </select>
          </TransaccionesPadre>

          <TransaccionesPadre label="MES">
            <select
              className="input-editraAgregarTrans bg-transparent border-0 hover:border-0 text-white"
              value={mes}
              onChange={(e) => setMes(e.target.value)}>
              <option value="">Seleccionar mes</option>
              {meses.map((m, index) => (
                <option
                  key={index}
                  value={m}>
                  {m}
                </option>
              ))}
            </select>
          </TransaccionesPadre>
        </>
      )}
    </div>
  );
};
