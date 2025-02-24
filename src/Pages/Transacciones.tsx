import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Components/Botones/BotonDesplegable/BotonDesplegableTransacciones.css';

import '../Components/Botones/EstilosBotones/BotonAgregar.css';
import { BotonDesplegableTransacciones } from '../Components/Botones/BotonDesplegable/BotonDesplegableTransacciones';
import { BotonGeneral } from '../Components/Botones/BotonGeneral/BotonGeneral';
import { useAuth } from '../Context/AuthContext';
import { apiClient } from '../services/api';

interface Transaccion {
  id: number;
  type: 'EXPENSE' | 'INCOME';
  name: string;
  description: string;
  amount: number;
  date: string;
  status: string;
  categoryId: number;
  accountId: number;
  createdAt: string;
  autoComplete: boolean;
}

export const Transacciones = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const { token, accountId } = useAuth();
  const navigate = useNavigate();
  const api = apiClient(token || undefined);

  useEffect(() => {
    const fetchTransacciones = async () => {
      if (!accountId) {
        return;
      }

      try {
        const response = await api.get(
          `/api/transactions?accountId=${accountId}&page=${
            currentPage - 1
          }&size=10`,
        );

        if (response && response.content) {
          setTransacciones(response.content);
          setTotalPaginas(response.totalPages);
        }
      } catch (error) {
        console.error('Error al obtener transacciones:', error);
      }
    };

    fetchTransacciones();
  }, [currentPage, accountId, token]);

  const handleAgregarClick = () => {
    navigate('/agregar-editar-transaccion');
  };

  const transaccionesPorPagina = 10;
  const indexOfLastItem = currentPage * transaccionesPorPagina;
  const indexOfFirstItem = indexOfLastItem - transaccionesPorPagina;
  const transaccionesActuales = transacciones.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const opcionesTransacciones = ['Egresos', 'Ingresos'];

  return (
    <div className="w-full flex justify-center">
      <div>
        <div className="mt-30">
          <BotonDesplegableTransacciones />
        </div>
        <div className="bg-myGray/50 rounded-2xl px-8 sm:px-8 md:px-20 lg:px-26 py-4 sm:py-6 md:py-8 lg:py-10 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
          <div>
            {/* Encabezados de columnas */}
            <div className="flex justify-between items-center h-10 mx-4 sm:mx-6 md:mx-8 lg:mx-12 text-white/50 text-sm">
              <span className="w-[30%] px-4">Concepto</span>
              <span className="w-[25%] px-4 text-center">Fecha</span>
              <span className="w-[25%] px-4 text-center">Monto</span>
              <span className="w-[20%] px-4 text-right">Tipo</span>
            </div>

            {/* Lista de transacciones */}
            {transacciones.map((transaccion, index) => (
              <div
                key={transaccion.id}
                onClick={() =>
                  navigate(`/agregar-editar-transaccion/${transaccion.id}`)
                }
                className="bg-myGray rounded-xl w-full mx-auto h-10 sm:h-11 md:h-12 lg:h-12 mt-2 sm:mt-3 md:mt-2 lg:mt-2 cursor-pointer hover:bg-myGray/80 transition-colors">
                <div className="flex justify-between items-center h-full mx-4 sm:mx-6 md:mx-8 lg:mx-12">
                  <span className="w-[30%] px-4 text-white text-base truncate">
                    {transaccion.name}
                  </span>
                  <span className="w-[25%] px-4 text-white text-xs text-center">
                    {new Date(transaccion.date).toLocaleDateString('es-ES')}
                  </span>
                  <span className="w-[25%] px-4 text-white font-bold text-center">
                    {transaccion.amount}€
                  </span>
                  <span className="w-[20%] px-4 text-white font-bold text-right">
                    {transaccion.type === 'EXPENSE' ? 'Egreso' : 'Ingreso'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Controles de paginación */}
          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-myGreen text-white rounded-lg disabled:opacity-50 cursor-pointer hover:border-myYellow hover:border-2 border-2 border-transparent">
              Anterior
            </button>
            <span className="flex items-center text-white">
              Página {currentPage} de {totalPaginas}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPaginas))
              }
              disabled={currentPage === totalPaginas}
              className="px-4 py-2 bg-myGreen text-white rounded-lg disabled:opacity-50 cursor-pointer hover:border-myYellow hover:border-2 border-2 border-transparent">
              Siguiente
            </button>
          </div>
          <div className="w-full flex justify-end pr-2 ml-5 md:ml-12">
            <BotonGeneral
              onClick={handleAgregarClick}
              tipo="agregar"
              className="botonAgregar-neumorphism"
              textoFijo="+"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
