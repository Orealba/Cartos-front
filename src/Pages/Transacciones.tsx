import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Components/Botones/BotonDesplegable/BotonDesplegableTransacciones.css';

import { BotonAgregarSinNeu } from '../Components/Botones/BotonAgregar/BotonAgregarSinNeu/BotonAgregarSinNeu';
import { BotonDesplegableTransacciones } from '../Components/Botones/BotonDesplegable/BotonDesplegableTransacciones';

interface Transaccion {
  icono: string;
  titulo: string;
  fecha: string;
  monto: string;
}

export const Transacciones = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const transaccionesPorPagina = 10;
  const navigate = useNavigate();

  const transacciones: Transaccion[] = [
    {
      icono: 'X',
      titulo: 'Supermercado',
      fecha: '15/03/2024',
      monto: '120€',
    },
    {
      icono: 'X',
      titulo: 'Netflix',
      fecha: '14/03/2024',
      monto: '12.99€',
    },
    {
      icono: 'X',
      titulo: 'Luz',
      fecha: '13/03/2024',
      monto: '85€',
    },
    {
      icono: 'X',
      titulo: 'Agua',
      fecha: '12/03/2024',
      monto: '45€',
    },
    {
      icono: 'X',
      titulo: 'Internet',
      fecha: '11/03/2024',
      monto: '39.99€',
    },
    {
      icono: 'X',
      titulo: 'Transporte',
      fecha: '10/03/2024',
      monto: '30€',
    },
    {
      icono: 'X',
      titulo: 'Restaurante',
      fecha: '09/03/2024',
      monto: '55€',
    },
    {
      icono: 'X',
      titulo: 'Farmacia',
      fecha: '08/03/2024',
      monto: '22.50€',
    },
    {
      icono: 'X',
      titulo: 'Ropa',
      fecha: '07/03/2024',
      monto: '89.99€',
    },
    {
      icono: 'X',
      titulo: 'Cine',
      fecha: '06/03/2024',
      monto: '15€',
    },
    // Segunda página
    {
      icono: 'X',
      titulo: 'Spotify',
      fecha: '05/03/2024',
      monto: '9.99€',
    },
    {
      icono: 'X',
      titulo: 'Peluquería',
      fecha: '04/03/2024',
      monto: '35€',
    },
    // ... más transacciones ...
  ];

  const indexOfLastItem = currentPage * transaccionesPorPagina;
  const indexOfFirstItem = indexOfLastItem - transaccionesPorPagina;
  const transaccionesActuales = transacciones.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPaginas = Math.ceil(transacciones.length / transaccionesPorPagina);

  const opcionesTransacciones = ['Egresos', 'Ingresos']; // Opciones del desplegable

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
                key={index}
                onClick={() => navigate('/agregar-editar-transaccion')}
                className="bg-myGray rounded-4xl w-full mx-auto h-10 sm:h-11 md:h-12 lg:h-12 mt-2 sm:mt-3 md:mt-2 lg:mt-2 cursor-pointer hover:bg-myGray/80 transition-colors">
                <div className="flex items-center justify-between px-8 sm:px-10 md:px-12 lg:px-16 h-full">
                  <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                    <span className="text-white font-bold text-base sm:text-lg md:text-xl">
                      {transaccion.icono}
                    </span>
                    <span className="text-white font-medium text-sm sm:text-base md:text-lg">
                      {transaccion.titulo}
                    </span>
                  </div>
                  <span className="text-white text-xs sm:text-sm md:text-base">
                    {transaccion.fecha}
                  </span>
                  <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                    <span className="text-white font-bold text-sm sm:text-base md:text-lg">
                      {transaccion.monto}
                    </span>
                    <span className="text-white font-bold text-base sm:text-lg md:text-xl">
                      {transaccion.icono}
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
            <BotonAgregarSinNeu />
          </div>
        </div>
      </div>
    </div>
  );
};
