import { BotonProxGastos } from './Botones/BotonProxGastos';

interface Gasto {
  icono: string;
  titulo: string;
  fecha: string;
  monto: string;
}

export const Body = () => {
  const gastos: Gasto[] = [
    {
      icono: 'X',
      titulo: 'Clases de tenis',
      fecha: '03/02/2025',
      monto: '35€',
    },
    {
      icono: 'X',
      titulo: 'Seguro coche',
      fecha: '03/02/2025',
      monto: '78€',
    },
    {
      icono: 'X',
      titulo: 'Gym',
      fecha: '03/02/2025',
      monto: '25€',
    },
    {
      icono: 'X',
      titulo: 'Alquiler',
      fecha: '03/02/2025',
      monto: '975€',
    },
  ];

  return (
    <>
      <div className="bg-myGray/50 rounded-2xl px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
        <div>
          <BotonProxGastos></BotonProxGastos>
        </div>
        <div className="max-h-[200px] overflow-y-auto">
          {gastos.map((gasto, index) => (
            <div
              key={index}
              className="bg-myGray rounded-4xl w-[95%] sm:w-[90%] md:w-[85%] lg:w-[100%] mx-auto h-10 sm:h-11 md:h-12 lg:h-12 mt-2 sm:mt-3 md:mt-2 lg:mt-2">
              <div className="flex items-center justify-between px-4 h-full">
                <div className="flex items-center gap-4">
                  <span className="text-white font-bold text-xl">
                    {gasto.icono}
                  </span>
                  <span className="text-white font-medium">{gasto.titulo}</span>
                </div>
                <span className="text-white">{gasto.fecha}</span>
                <div className="flex items-center gap-4">
                  <span className="text-white font-bold">{gasto.monto}</span>
                  <span className="text-white font-bold text-xl">
                    {gasto.icono}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
