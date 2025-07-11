import { BotonGeneral } from './Botones/BotonGeneral/BotonGeneral';
import { useNavigate } from 'react-router-dom';
import './Botones/EstilosBotones/BotonProxGastos.css';
import { useEffect, useState } from 'react';
import { apiClient } from '../services/api';
import { useAuth } from '../Context/AuthContext';
import dayjs from 'dayjs';

interface Gasto {
  id: string;
  name: string;
  date: string;
  amount: number;
}

export const Body = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [gastos, setGastos] = useState<Gasto[]>([]);

  useEffect(() => {
    const cargarProximosGastos = async () => {
      if (!session?.access_token) return;

      try {
        const api = apiClient(session.access_token);
        const startDate = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        const endDate = dayjs()
          .add(1, 'year')
          .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

        const response = await api.get(
          `/api/calendar/transactions?startDate=${startDate}&endDate=${endDate}&includePending=true&includeCompleted=true`,
        );

        // Filtrar solo egresos futuros, ordenar por fecha más cercana y tomar los primeros 4
        const proximosGastos = response
          .filter((trans: any) => trans.type === 'EXPENSE')
          .sort(
            (a: any, b: any) =>
              new Date(a.date).getTime() - new Date(b.date).getTime(),
          )
          .slice(0, 4)
          .map((gasto: any) => ({
            id: gasto.transactionId,
            name: gasto.name,
            date: dayjs(gasto.date).format('DD/MM/YYYY'),
            amount: gasto.amount,
          }));

        setGastos(proximosGastos);
      } catch (error) {
        console.error('Error al cargar gastos:', error);
      }
    };

    cargarProximosGastos();
  }, [session]);

  const handleProxGastosClick = () => {
    navigate('/transacciones');
  };

  return (
    <>
      <div className="bg-myGray/50 rounded-2xl px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
        <div>
          <BotonGeneral
            onClick={handleProxGastosClick}
            tipo="basico"
            className="botonProxGastos-neumorphism"
            textoFijo="Próximos Gastos"
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {gastos.length === 0 ? (
            <p className="text-white text-center text-sm sm:text-base">
              No tienes próximos cobros pendientes o registrados
            </p>
          ) : (
            gastos.map((gasto) => (
              <div
                key={gasto.id}
                onClick={() =>
                  navigate(`/agregar-editar-transaccion/${gasto.id}`)
                }
                className="bg-myGray rounded-xl w-[95%] sm:w-[90%] md:w-[85%] lg:w-[100%] mx-auto h-10 sm:h-11 md:h-12 lg:h-12 cursor-pointer hover:bg-myGray/80 transition-colors">
                <div className="flex items-center justify-between px-6 h-full">
                  <div className="flex items-center gap-2 w-1/3">
                    <span className="text-xl hidden sm:inline">💸</span>
                    <span className="text-white font-medium text-sm sm:text-base">
                      {gasto.name}
                    </span>
                  </div>
                  <span className="text-white w-1/3 text-center text-sm sm:text-base">
                    {gasto.date}
                  </span>
                  <span className="text-white font-bold w-1/3 text-right text-sm sm:text-base">
                    {gasto.amount}€
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
