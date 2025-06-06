import { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { apiClient } from '../services/api';
import { Transaccion } from '../Pages/Transacciones'; // Ajusta el path según dónde está tu interfaz
import { PieChart } from '../Components/PieChart';

export const Resumen = () => {
  const { token, accountId } = useAuth();
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransacciones = async () => {
      if (!token || !accountId) return;

      try {
        const api = apiClient(token);
        const response = await api.get(
          `/api/transactions?accountId=${accountId}&page=0&size=100`,
        );
        // Usar response.content aquí
        setTransacciones(response.content || []);
      } catch (error) {
        console.error('Error al obtener transacciones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransacciones();
  }, [token, accountId]);

  if (loading) return <div>Cargando resumen...</div>;

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Resumen de transacciones</h2>

      {transacciones.length === 0 ? (
        <p>No hay transacciones disponibles.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {transacciones.map((tx) => (
              <li
                key={tx.id}
                className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                <p>
                  <strong>Nombre:</strong> {tx.name}
                </p>
                <p>
                  <strong>Tipo:</strong> {tx.type}
                </p>
                <p>
                  <strong>Monto:</strong> ${tx.amount}
                </p>
                <p>
                  <strong>Fecha:</strong>{' '}
                  {new Date(tx.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Categoría:</strong> {tx.categoryName}
                </p>
                <p>
                  <strong>Cuenta:</strong> {tx.accountName}
                </p>
                <p>
                  <strong>Descripción:</strong> {tx.description}
                </p>
              </li>
            ))}
          </ul>

          {/* Aquí agregamos el gráfico */}
          <PieChart transacciones={transacciones} />
        </>
      )}
    </div>
  );
};
