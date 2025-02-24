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
  const { token, accountId } = useAuth(); // Obtenemos accountId del context
  const navigate = useNavigate();
  const api = apiClient(token || undefined);

  useEffect(() => {
    const fetchTransacciones = async () => {
      if (!accountId) {
        console.log('No hay accountId disponible');
        return;
      }

      try {
        console.log('Obteniendo transacciones para cuenta:', accountId);
        const response = await api.get(
          `/api/transactions?accountId=${accountId}&page=${
            currentPage - 1
          }&size=10`,
        );
        console.log('Respuesta completa:', response);
        console.log('Contenido de transacciones:', response.content);
        console.log('Total páginas:', response.totalPages);

        if (response && response.content) {
          console.log(
            'Actualizando estado con transacciones:',
            response.content,
          );
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

  const opcionesTransacciones = ['Egresos', 'Ingresos']; // Opciones del desplegable

  // También agreguemos un log en el render para ver qué hay en el estado
  console.log('Estado actual de transacciones:', transacciones);

  return (
    <div className="w-full flex justify-center">
      <div>
        <div className="mt-30">
          <BotonDesplegableTransacciones />
        </div>
        <div className="bg-myGray/50 rounded-2xl px-8 sm:px-8 md:px-20 lg:px-15 py-4 sm:py-6 md:py-8 lg:py-10 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
          <div>
            {transaccionesActuales.map((transaccion, index) => (
              <div
                key={transaccion.id}
                onClick={() => navigate('/agregar-editar-transaccion')}
                className="bg-myGray rounded-xl w-full mx-auto h-10 sm:h-11 md:h-12 lg:h-12 mt-2 sm:mt-3 md:mt-2 lg:mt-2 cursor-pointer hover:bg-myGray/80 transition-colors">
                <div className="flex items-center justify-between px-8 sm:px-10 md:px-12 lg:px-16 h-full">
                  <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                    <span className="text-white  text-base sm:text-sm md:text-lg">
                      {transaccion.name}
                    </span>
                    {/* <span className="text-white  text-base sm:text-sm md:text-sm">
                      {transaccion.description}
                    </span> */}
                  </div>
                  <span className="text-white text-xs sm:text-xs md:text-sm">
                    {new Date(transaccion.date).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'numeric',
                    })}
                  </span>
                  <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                    <span className="text-white font-bold text-sm sm:text-base md:text-sm">
                      {transaccion.amount}€
                    </span>
                    <span className="text-white font-bold text-base sm:text-lg md:text-sm">
                      {transaccion.type === 'EXPENSE' ? 'Egreso' : 'Ingreso'}
                    </span>
                  </div>
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
