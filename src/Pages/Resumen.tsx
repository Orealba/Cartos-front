import { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { apiClient } from '../services/api';
import { Transaccion } from '../Pages/Transacciones';
import { PieChart } from '../Components/PieChart';
import { BotonGeneral } from '../Components/Botones/BotonGeneral/BotonGeneral'; // importa tu botón
export const Resumen = () => {
  const { token, accountId } = useAuth();
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [loading, setLoading] = useState(true);

  const [filtro, setFiltro] = useState<'todos' | 'categoria'>('todos');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchTransacciones = async () => {
      if (!token || !accountId) return;

      try {
        const api = apiClient(token);
        const response = await api.get(
          `/api/transactions?accountId=${accountId}&page=0&size=100`,
        );
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

  let transaccionesFiltradas = transacciones.filter(
    (t) => t.type === 'EXPENSE',
  );
  if (filtro === 'categoria' && categoriaSeleccionada !== null) {
    transaccionesFiltradas = transaccionesFiltradas.filter(
      (t) => t.categoryId === categoriaSeleccionada,
    );
  }

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Resumen de transacciones</h2>

      {/* Botones para seleccionar filtro */}
      <div className="flex gap-4 mb-4">
        <BotonGeneral
          textoFijo="Todos"
          tipo={filtro === 'todos' ? 'green' : 'basico'}
          onClick={() => setFiltro('todos')}
        />
        <BotonGeneral
          textoFijo="Por Categoría"
          tipo={filtro === 'categoria' ? 'green' : 'basico'}
          onClick={() => setFiltro('categoria')}
        />
      </div>

      {/* Selector de categoría */}
      {filtro === 'categoria' && (
        <select
          value={categoriaSeleccionada ?? ''}
          onChange={(e) => setCategoriaSeleccionada(Number(e.target.value))}
          className="mb-4 p-2 rounded bg-gray-700 text-white">
          <option value="">Seleccione categoría</option>
          <option value={1}>Categoría 1</option>
          <option value={2}>Categoría 2</option>
          <option value={3}>Categoría 3</option>
          {/* Aquí pon las categorías reales */}
        </select>
      )}

      {/* Solo mostramos el gráfico */}
      <PieChart transacciones={transaccionesFiltradas} />
    </div>
  );
};
