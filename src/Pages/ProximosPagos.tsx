import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import '../Components/Botones/BotonDesplegable/BotonDesplegableTransacciones.css';
import '../Components/Botones/EstilosBotones/BotonAgregar.css';

import { BotonGeneral } from '../Components/Botones/BotonGeneral/BotonGeneral';
import { useAuth } from '../Context/AuthContext';
import { apiClient } from '../services/api';
import { BotonDesplegableProximos } from '../Components/Botones/BotonDesplegable/BotonDesplegableProximos';

interface Gasto {
  id: string;
  name: string;
  date: string;
  amount: number;
  type: 'EXPENSE' | 'INCOME';
}

type FuturePeriod = '1M' | '3M' | '6M' | '12M';

export const ProximosPagos = () => {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [selectedPeriod, setSelectedPeriod] = useState<FuturePeriod>('1M');

  const { session } = useAuth();
  const api = apiClient(session?.access_token);
  const navigate = useNavigate();
  const lastKey = useRef<string>(''); // ← agrega esto

  useEffect(() => {
    const cargarGastos = async () => {
      if (!session?.access_token) return;

      try {
        const startDate = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        const endDate = (
          selectedPeriod === '1M'
            ? dayjs().add(1, 'month')
            : selectedPeriod === '3M'
            ? dayjs().add(3, 'month')
            : selectedPeriod === '6M'
            ? dayjs().add(6, 'month')
            : dayjs().add(1, 'year')
        ).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

        const key = `${startDate}|${endDate}|pending+completed`;
        if (lastKey.current === key) return; // ✅ evita duplicados por StrictMode
        lastKey.current = key;

        const response = await api.get(
          `/api/calendar/transactions?startDate=${startDate}&endDate=${endDate}&includePending=true&includeCompleted=true`,
        );

        const soloGastos = response
          .filter((t: any) => t.type === 'EXPENSE')
          .sort(
            (a: any, b: any) =>
              new Date(a.date).getTime() - new Date(b.date).getTime(),
          )
          .map((g: any) => ({
            id: g.transactionId,
            name: g.name,
            date: g.date,
            amount: g.amount,
            type: g.type,
          }));

        setGastos(soloGastos);
        setPaginaActual(1);
      } catch (e) {
        console.error('Error al cargar próximos pagos:', e);
      }
    };

    cargarGastos();
  }, [session, selectedPeriod]);

  const gastosPorPagina = 10;
  const totalPaginas = Math.max(1, Math.ceil(gastos.length / gastosPorPagina));

  const indexOfLastItem = paginaActual * gastosPorPagina;
  const indexOfFirstItem = indexOfLastItem - gastosPorPagina;
  const gastosActuales = gastos.slice(indexOfFirstItem, indexOfLastItem);

  const handleAgregarClick = () => {
    navigate('/agregar-editar-transaccion');
  };

  return (
    <div className="w-full flex justify-center mt-35">
      <div>
        <h1 className="mx-auto text-center text-white sm:text-lg md:text-xl ">
          PRÓXIMOS PAGOS
        </h1>

        {/* Botón desplegable centrado */}
        <div className="w-full flex justify-center mt-5">
          <BotonDesplegableProximos
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          />
        </div>

        <div className="bg-myGray/50 rounded-2xl px-4 sm:px-6 md:px-8 lg:px-30 py-4 sm:py-6 md:py-8 lg:py-10 mt-5">
          <div className="hidden sm:flex justify-between items-center h-10 mx-4 sm:mx-6 md:mx-8 lg:mx-12 text-white/50 text-sm">
            <span className="w-[30%] px-4">Concepto</span>
            <span className="w-[25%] px-4 text-center">Fecha</span>
            <span className="w-[25%] px-4 text-center">Monto</span>
          </div>

          {gastosActuales.map((g) => (
            <div
              key={g.id}
              onClick={() => navigate(`/agregar-editar-transaccion/${g.id}`)}
              className="bg-myGray rounded-xl w-full mx-auto h-auto sm:h-11 md:h-12 lg:h-12  mt-2 sm:mt-3 md:mt-2 lg:mt-2 cursor-pointer hover:bg-myGray/80 transition-colors">
              <div className="flex flex-col p-4 sm:hidden">
                <span className="text-white text-base mb-1">{g.name}</span>
                <div className="flex justify-between items-center">
                  <span className="text-white text-xs">
                    {new Date(g.date).toLocaleDateString('es-ES')}
                  </span>
                  <span className="text-white font-bold">
                    {g.amount.toFixed(2)}€
                  </span>
                  <span className="text-white font-bold">Egreso</span>
                </div>
              </div>

              <div className="hidden sm:flex justify-between items-center h-full mx-4 sm:mx-6 md:mx-8 lg:mx-12">
                <span className="w-[40%] px-4 text-white text-base truncate">
                  {g.name}
                </span>
                <span className="w-[25%] px-4 text-white text-xs text-center">
                  {new Date(g.date).toLocaleDateString('es-ES')}
                </span>
                <span className="w-[25%] px-4 text-white font-bold text-center">
                  {g.amount.toFixed(2)}€
                </span>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
              disabled={paginaActual === 1}
              className="px-4 py-2 bg-myGreen text-white rounded-lg disabled:opacity-50 cursor-pointer">
              Anterior
            </button>
            <span className="flex items-center text-white">
              Página {paginaActual} de {totalPaginas}
            </span>
            <button
              onClick={() =>
                setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))
              }
              disabled={paginaActual === totalPaginas}
              className="px-4 py-2 bg-myGreen text-white rounded-lg disabled:opacity-50 cursor-pointer">
              Siguiente
            </button>
          </div>

          <div className="w-full flex justify-end pr-4 ml-5 mt-2 md:ml-12">
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
};
