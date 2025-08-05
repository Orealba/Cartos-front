import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Components/Botones/BotonDesplegable/BotonDesplegableTransacciones.css';
import '../Components/Botones/EstilosBotones/BotonAgregar.css';
import { BotonGeneral } from '../Components/Botones/BotonGeneral/BotonGeneral';
import { useAuth } from '../Context/AuthContext';
import { apiClient } from '../services/api';

interface RecurringTransaction {
  id: number;
  name: string;
  amount: number;
  type: 'EXPENSE' | 'INCOME';
  transactionId: number;
  frequencyUnit: string;
  frequencyNumber: number;
  nextDate: string;
}

export const ProximosPagos = () => {
  const [reglas, setReglas] = useState<RecurringTransaction[]>([]);
  const { session } = useAuth();
  const api = apiClient(session?.access_token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReglas = async () => {
      if (!session?.access_token) {
        console.log('No hay sesión activa');
        return;
      }

      try {
        const response = await api.listRecurring();

        if (response && response.content) {
          const ordenadas = response.content.sort(
            (a: RecurringTransaction, b: RecurringTransaction) =>
              new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime(),
          );
          console.log('📦 Respuesta reglas recurrentes:', response.content);
          setReglas(ordenadas);
        }
      } catch (error) {
        console.error('Error al obtener reglas recurrentes:', error);
      }
    };

    fetchReglas();
  }, [session]);

  const reglasPorPagina = 10;
  const [paginaActual, setPaginaActual] = useState(1);
  const totalPaginas = Math.ceil(reglas.length / reglasPorPagina);

  const reglasActuales = reglas.slice(
    (paginaActual - 1) * reglasPorPagina,
    paginaActual * reglasPorPagina,
  );

  const handleAgregarClick = () => {
    navigate('/agregar-editar-transaccion');
  };

  return (
    <div className="w-full flex justify-center">
      <div>
        <h1 className="mx-auto text-center text-white sm:text-lg md:text-xl ">
          PRÓXIMOS PAGOS
        </h1>
        <div className="bg-myGray/50 rounded-2xl px-4 sm:px-8 md:px-20 lg:px-20 py-4 sm:py-6 md:py-8 lg:py-10 mt-5">
          <div className="hidden sm:flex justify-between items-center h-10 mx-4 sm:mx-6 md:mx-8 lg:mx-12 text-white/50 text-sm">
            <span className="w-[30%] px-4">Concepto</span>
            <span className="w-[25%] px-4 text-center">Próxima fecha</span>
            <span className="w-[25%] px-4 text-center">Monto</span>
          </div>

          {reglasActuales.map((r) => (
            <div
              key={r.id}
              onClick={() =>
                navigate(`/agregar-editar-transaccion/${r.transactionId}`)
              }
              className="bg-myGray rounded-xl w-full mx-auto h-auto sm:h-11 md:h-12 lg:h-12 mt-2 sm:mt-3 md:mt-2 lg:mt-2 cursor-pointer hover:bg-myGray/80 transition-colors">
              <div className="flex flex-col p-4 sm:hidden">
                <span className="text-white text-base mb-1">{r.name}</span>
                <div className="flex justify-between items-center">
                  <span className="text-white text-xs">
                    {new Date(r.nextDate).toLocaleDateString('es-ES')}
                  </span>
                  <span className="text-white font-bold">
                    {r.amount.toFixed(2)}€
                  </span>
                  <span className="text-white font-bold">
                    {r.type === 'EXPENSE' ? 'Egreso' : 'Ingreso'}
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex justify-between items-center h-full mx-4 sm:mx-6 md:mx-8 lg:mx-12">
                <span className="w-[30%] px-4 text-white text-base truncate">
                  {r.name}
                </span>
                <span className="w-[25%] px-4 text-white text-xs text-center">
                  {new Date(r.nextDate).toLocaleDateString('es-ES')}
                </span>
                <span className="w-[25%] px-4 text-white font-bold text-center">
                  {r.amount.toFixed(2)}€
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
