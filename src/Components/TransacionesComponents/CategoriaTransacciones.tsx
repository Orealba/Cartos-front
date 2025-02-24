import { TransaccionesPadre } from './TransaccionesPadre';
import { useState, useEffect, useRef } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, token } = useAuth();
  const api = apiClient(token || undefined);

  useEffect(() => {
    setCategoriaSeleccionada('');
  }, [tipoSeleccionado]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <div className=" w-[98%] mx-auto h-12 flex items-center px-8">
      <div className="flex items-center gap-4 w-full">
        <span className="text-white whitespace-nowrap">Categoría:</span>
        <div
          className="relative flex-1"
          ref={dropdownRef}>
          <div
            className="bg-transparent text-white cursor-pointer flex items-center gap-4"
            onClick={() => setIsOpen(!isOpen)}>
            <span className="text-white/60 whitespace-nowrap">
              {categoriaSeleccionada || 'Seleccionar categoria'}
            </span>
            <span className="text-white/60 text-sm">⌄</span>
          </div>
          {isOpen && (
            <div className="absolute top-full left-0 w-[120%] -ml-[10%] mt-1 bg-myGreen border border-myYellow rounded-md overflow-hidden z-50">
              {!isLoading &&
                categoriasFiltradas.map((categoria) => (
                  <div
                    key={categoria.id}
                    className="px-4 py-2 hover:bg-myGray cursor-pointer text-white whitespace-nowrap"
                    onClick={() => {
                      setCategoriaSeleccionada(
                        `${categoria.picture} ${categoria.name}`,
                      );
                      setIsOpen(false);
                    }}>
                    {categoria.picture} {categoria.name}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
