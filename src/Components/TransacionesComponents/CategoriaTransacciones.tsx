import { TransaccionesPadre } from './TransaccionesPadre';
import { useState, useEffect } from 'react';
import { apiClient } from '../../services/api';
import { useAuth } from '../../Context/AuthContext';

interface CategoriaResponse {
  id: number;
  name: string;
  type: string;
  picture: string;
}

interface Props {
  tipoSeleccionado: string;
}

export const CategoriaTransacciones = ({ tipoSeleccionado }: Props) => {
  const [categorias, setCategorias] = useState<CategoriaResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, token } = useAuth();
  const api = apiClient();

  useEffect(() => {
    const fetchCategorias = async () => {
      if (!isAuthenticated || !token) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await api.get('/api/categories?size=100');
        if (data && data.content) {
          setCategorias(data.content);
        }
      } catch (error) {
        setCategorias([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategorias();
  }, [isAuthenticated, token]);

  const categoriasFiltradas = categorias.filter((categoria) =>
    tipoSeleccionado === 'Egresos'
      ? categoria.type === 'EXPENSE'
      : categoria.type === 'INCOME',
  );

  return (
    <div>
      <TransaccionesPadre label="Categoría">
        <select className="form-select">
          <option value="">Selecciona una categoria</option>
          {!isLoading &&
            categoriasFiltradas.map((categoria) => (
              <option
                key={categoria.id}
                value={categoria.id}>
                {categoria.picture} {categoria.name}
              </option>
            ))}
        </select>
      </TransaccionesPadre>
    </div>
  );
};
