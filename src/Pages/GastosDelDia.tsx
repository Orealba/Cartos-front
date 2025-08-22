import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import '../Components/Botones/EstilosBotones/BotonAgregar.css';
import { BotonGeneral } from '../Components/Botones/BotonGeneral/BotonGeneral';
import { useAuth } from '../Context/AuthContext';
import { apiClient } from '../services/api';

type Tipo = 'EXPENSE' | 'INCOME';

interface ItemDia {
  id: string | number;
  name: string;
  date: string;
  amount: number;
  type: Tipo;
}

export default function GastosDelDia() {
  const { fecha } = useParams<{ fecha: string }>(); // YYYY-MM-DD
  const navigate = useNavigate();
  const { session } = useAuth();

  const [items, setItems] = useState<ItemDia[]>([]);

  // Fechas estables para el rango del día
  const base = useMemo(() => dayjs(fecha, 'YYYY-MM-DD'), [fecha]);
  const startDate = useMemo(
    () => base.startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    [base],
  );
  const endDate = useMemo(
    () => base.endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    [base],
  );

  // evita pedir dos veces en StrictMode para el mismo día
  const lastKey = useRef<string>('');

  useEffect(() => {
    if (!session?.access_token || !base.isValid()) return;

    const key = `${startDate}|${endDate}|day-view`;
    if (lastKey.current === key) return;
    lastKey.current = key;

    const api = apiClient(session.access_token);

    api
      .get(
        `/api/calendar/transactions?startDate=${startDate}&endDate=${endDate}&includePending=true&includeCompleted=true`,
      )
      .then((res: any[] = []) => {
        // Solo gastos del día (si quieres incluir ingresos, quita el filter)
        const data = res
          .filter((t) => t.type === 'EXPENSE')
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          )
          .map((t) => ({
            id: t.transactionId ?? t.id,
            name: t.name,
            date: t.date,
            amount: t.amount,
            type: t.type as Tipo,
          }));

        setItems(data);
      })
      .catch(console.error);
  }, [session, startDate, endDate, base]);

  const tituloFecha = base.isValid()
    ? base.format('DD/MM/YYYY')
    : 'Fecha inválida';

  const handleAgregarClick = () => {
    navigate('/agregar-editar-transaccion'); // si luego quieres prellenar la fecha, lo vemos
  };

  return (
    <div className="w-full flex justify-center ">
      <div className="w-full max-w-5xl">
        <h1 className="mx-auto text-center text-white sm:text-lg md:text-xl ">
          GASTOS DEL DÍA
        </h1>
        <h1 className="mx-auto text-center text-white sm:text-lg md:text-xl ">
          {tituloFecha}
        </h1>

        <div className="bg-myGray/50 rounded-2xl px-4 sm:px-8 md:px-20 lg:px-20 py-4 sm:py-6 md:py-8 lg:py-10 mt-4">
          {/* Cabecera (desktop) */}
          <div className="hidden sm:flex justify-between items-center h-10 mx-4 sm:mx-6 md:mx-8 lg:mx-12 text-white/50 text-sm">
            <span className="w-[40%] px-4">Concepto</span>
            <span className="w-[25%] px-4 text-center">Hora</span>
            <span className="w-[25%] px-4 text-center">Monto</span>
          </div>

          {/* Lista */}
          {items.length === 0 ? (
            <p className="text-center text-white mt-4">
              No hay gastos registrados en este día.
            </p>
          ) : (
            items.map((g) => (
              <div
                key={g.id}
                onClick={() => navigate(`/agregar-editar-transaccion/${g.id}`)}
                className="bg-myGray rounded-xl w-full mx-auto h-auto sm:h-11 md:h-12 lg:h-12 mt-2 cursor-pointer hover:bg-myGray/80 transition-colors">
                {/* Mobile */}
                <div className="flex flex-col p-4 sm:hidden">
                  <span className="text-white text-base mb-1">{g.name}</span>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-xs">
                      {new Date(g.date).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span className="text-white font-bold">
                      {g.amount.toFixed(2)}€
                    </span>
                  </div>
                </div>

                {/* Desktop */}
                <div className="hidden sm:flex justify-between items-center h-full mx-4 sm:mx-6 md:mx-8 lg:mx-12">
                  <span className="w-[40%] px-4 text-white text-base truncate">
                    {g.name}
                  </span>
                  <span className="w-[25%] px-4 text-white text-xs text-center">
                    {new Date(g.date).toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <span className="w-[25%] px-4 text-white font-bold text-center">
                    {g.amount.toFixed(2)}€
                  </span>
                </div>
              </div>
            ))
          )}

          <div className="w-full flex justify-end pr-4 mt-3">
            <BotonGeneral
              onClick={handleAgregarClick}
              tipo="agregar"
              className="botonAgregar-neumorphism"
              textoFijo={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
