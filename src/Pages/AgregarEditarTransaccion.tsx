import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { apiClient } from '../services/api';
import { TransaccionesPadre } from '../Components/TransacionesComponents/TransaccionesPadre';
import {
  RecurrenteTransacciones,
  RecurrenceRule,
} from '../Components/TransacionesComponents/RecurrenteTransacciones';
import { TituloTransacciones } from '../Components/TransacionesComponents/TituloTransacciones';
import { MontoTransacciones } from '../Components/TransacionesComponents/MontoTransacciones';
import { FechaTransacciones } from '../Components/TransacionesComponents/FechaTransacciones';
import { TipoTransacciones } from '../Components/TransacionesComponents/TipoTransacciones';
import { NotaTransacciones } from '../Components/TransacionesComponents/NotaTransacciones';
import { CategoriaTransacciones } from '../Components/TransacionesComponents/CategoriaTransacciones';
import '../Components/Botones/EstilosBotones/BotonCancelarTrans.css';
import '../Components/Botones/EstilosBotones/BotonGuardarTrans.css';
import '../Components/Botones/EstilosBotones/BotonBorraTrans.css';
import { BotonGeneral } from '../Components/Botones/BotonGeneral/BotonGeneral';
import { ModalConfirmacion } from '../Components/ModalConfirmacion';

export const AgregarEditarTransaccion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { session, accountId } = useAuth();
  const api = apiClient(session?.access_token);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('Egresos');
  const [titulo, setTitulo] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [nota, setNota] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [recurrenceRule, setRecurrenceRule] = useState<RecurrenceRule | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<{
    categoria?: string;
    titulo?: string;
    monto?: string;
  }>({});

  useEffect(() => {
    const cargarTransaccion = async () => {
      if (id) {
        try {
          const transaccion = await api.get(`/api/transactions/${id}`);
          setTipoSeleccionado(
            transaccion.type === 'EXPENSE' ? 'Egresos' : 'Ingresos',
          );
          setTitulo(transaccion.name);
          setMonto(transaccion.amount.toString());
          setFecha(transaccion.date.split('T')[0]);
          setNota(transaccion.description || '');
          setCategoriaId(transaccion.categoryId.toString());
        } catch (error) {
          console.error('Error al cargar:', error);
        }
      }
    };

    cargarTransaccion();
  }, [id]);

  const handleTipoChange = (nuevoTipo: string) => {
    setTipoSeleccionado(nuevoTipo);
    setTitulo('');
    setMonto('');
    setFecha(new Date().toISOString().split('T')[0]);
    setNota('');
  };

  const handleTituloChange = (nuevoTitulo: string) => {
    setTitulo(nuevoTitulo);
  };

  const handleMontoChange = (nuevoMonto: string) => {
    setMonto(nuevoMonto);
  };

  const validarFormulario = (): boolean => {
    const nuevosErrores: {
      categoria?: string;
      titulo?: string;
      monto?: string;
    } = {};

    const raw = monto.replace(',', '.');
    const amountNum = parseFloat(raw);

    if (!categoriaId) {
      nuevosErrores.categoria = 'Debes seleccionar una categoría';
    }

    if (!titulo.trim()) {
      nuevosErrores.titulo = 'El título es obligatorio';
    }

    if (!monto || isNaN(amountNum) || amountNum <= 0) {
      nuevosErrores.monto = 'El monto debe ser mayor a 0';
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async () => {
    if (!validarFormulario()) {
      return;
    }

    if (!accountId) {
      console.error('No hay accountId disponible');
      return;
    }
    const raw = monto.replace(',', '.');
    const amountNum = parseFloat(raw);
    try {
      const transaccion = {
        type: tipoSeleccionado === 'Egresos' ? 'EXPENSE' : 'INCOME',
        name: titulo,
        categoryId: parseInt(categoriaId),
        accountId: accountId,
        description: nota || '',
        amount: amountNum,
        date: `${fecha}T00:00:00.000Z`,
        status: 'COMPLETED',
        createdAt: new Date().toISOString(),
        autoComplete: true,
        recurrence: recurrenceRule,
      };

      console.log('Enviando transacción:', transaccion);

      if (id) {
        await api.put(`/api/transactions/${id}`, transaccion);
      } else {
        await api.post('/api/transactions', transaccion);
      }

      navigate('/transacciones');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = () => {
    if (!id) return;
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/api/transactions/${id}`);
      setIsModalOpen(false);
      navigate('/transacciones', { replace: true });
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar la transacción');
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="">
        <div className="flex justify-center gap-2 sm:gap-56 mt-35 sm:mt-35 md:mt-4 lg:mt-20">
          <BotonGeneral
            onClick={() => navigate('/transacciones')}
            tipo="danger"
            className="botonCancelarTrans-neumorphism"
            textoFijo="Cancelar"
          />
          <BotonGeneral
            onClick={() => handleSubmit()}
            tipo="green"
            className="botonGuardarTrans-neumorphism"
            textoFijo="Guardar"
          />
        </div>
        <div className="bg-myGray/50 rounded-2xl px-0  mx-0 sm:mx-0 sm:px-3 md:px-24 lg:px-35 py-3 sm:py-6 md:py-10 lg:py-16 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
          <div>
            <TransaccionesPadre label="Tipo">
              <TipoTransacciones onTipoChange={handleTipoChange} />
            </TransaccionesPadre>
            {errors.categoria && (
              <span className="text-red-500 text-sm ml-2 sm:ml-8">
                {errors.categoria}
              </span>
            )}

            <TransaccionesPadre label="Categoría">
              <CategoriaTransacciones
                tipoSeleccionado={tipoSeleccionado}
                setCategoriaId={setCategoriaId}
                initialCategoryId={categoriaId}
              />
            </TransaccionesPadre>
            {errors.categoria && (
              <span className="text-red-500 text-sm ml-2 sm:ml-8">
                {errors.categoria}
              </span>
            )}

            <TransaccionesPadre label="Título">
              <TituloTransacciones
                value={titulo}
                onChange={handleTituloChange}
              />
            </TransaccionesPadre>
            {errors.titulo && (
              <span className="text-red-500 text-sm ml-2 sm:ml-8">
                {errors.titulo}
              </span>
            )}

            <TransaccionesPadre label="Monto">
              <MontoTransacciones
                value={monto}
                onChange={handleMontoChange}
              />
            </TransaccionesPadre>
            {errors.monto && (
              <span className="text-red-500 text-sm ml-2 sm:ml-8">
                {errors.monto}
              </span>
            )}

            <TransaccionesPadre label="Fecha">
              <FechaTransacciones
                value={fecha}
                onChange={setFecha}
              />
            </TransaccionesPadre>

            <TransaccionesPadre label="Nota">
              <NotaTransacciones
                value={nota}
                onChange={setNota}
              />
            </TransaccionesPadre>

            <TransaccionesPadre label="Recurrente">
              <RecurrenteTransacciones
                initialRule={recurrenceRule}
                onChange={setRecurrenceRule}
              />
            </TransaccionesPadre>
          </div>
        </div>
      </div>

      <ModalConfirmacion
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        mensaje="¿Estás seguro de que quieres eliminar esta transacción?"
      />
    </>
  );
};
