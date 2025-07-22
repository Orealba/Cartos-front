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
  const [recurringId, setRecurringId] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<{
    categoria?: string;
    titulo?: string;
    monto?: string;
  }>({});

  useEffect(() => {
    const cargarTransaccion = async () => {
      if (id) {
        const tx = await api.get(`/api/transactions/${id}`);
        setTitulo(tx.name);
        setMonto(tx.amount.toString());
        setFecha(tx.date.split('T')[0]);
        setNota(tx.description || '');
        setCategoriaId(tx.categoryId.toString());

        // 2.2) Traer la regla recurrente si existe
        try {
          const rule = await api.getRecurring(id);
          setRecurrenceRule({
            interval: rule.frequencyNumber,
            unit: rule.frequencyUnit as RecurrenceRule['unit'],
          });
          setRecurringId(rule.id);
        } catch {
          setRecurrenceRule(null);
          setRecurringId(undefined);
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
    if (!validarFormulario()) return;

    // 1) Transacción “plana”
    const raw = monto.replace(',', '.');
    const amountNum = parseFloat(raw);

    const txPayload = {
      type: tipoSeleccionado === 'Egresos' ? 'EXPENSE' : 'INCOME',
      name: titulo,
      categoryId: Number(categoriaId),
      accountId: Number(accountId!),
      description: nota,
      amount: amountNum,
      date: `${fecha}T00:00:00.000Z`,
      status: 'COMPLETED',
      createdAt: new Date().toISOString(),
      autoComplete: true,
    };
    console.log('¡¡¡¡Enviando txPayload:', txPayload);

    let txResp;
    if (id) {
      txResp = await api.put(`/api/transactions/${id}`, txPayload);
    } else {
      txResp = await api.post(`/api/transactions`, txPayload);
    }

    // 2) Regla recurrente (CR/UP/DEL)
    if (recurrenceRule) {
      const unitMap: Record<string, string> = {
        DAILY: 'DAY',
        WEEKLY: 'WEEK',
        MONTHLY: 'MONTH',
        YEARLY: 'YEAR',
      };
      const frequencyUnit = unitMap[recurrenceRule.unit];

      const recurPayload = {
        ...txPayload,
        transactionId: txResp.id,
        startDate: txResp.date,
        frequencyNumber: recurrenceRule.interval,
        frequencyUnit,
      };
      console.log('Enviando recurPayload:', recurPayload);

      if (recurringId) {
        await api.put(
          `/api/recurring-transactions/${recurringId}`,
          recurPayload,
        );
      } else {
        const newRule = await api.post(
          `/api/recurring-transactions`,
          recurPayload,
        );
        setRecurringId(newRule.id);
      }
    } else if (recurringId) {
      // si quitaste recurrencia, bórrala
      await api.deleteRecurring(recurringId);
      setRecurringId(undefined);
    }

    // 3) Volver al listado
    navigate('/transacciones');
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
        <div className="bg-myGray/50 rounded-2xl px-3 py-6 md:px-24 md:py-10 mt-5">
          <TipoTransacciones onTipoChange={handleTipoChange} />
          {errors.categoria && (
            <span className="text-red-500 text-sm ml-6 block">
              {errors.categoria}
            </span>
          )}

          <CategoriaTransacciones
            tipoSeleccionado={tipoSeleccionado}
            setCategoriaId={setCategoriaId}
            initialCategoryId={categoriaId}
          />
          {errors.categoria && (
            <span className="text-red-500 text-sm ml-6 block">
              {errors.categoria}
            </span>
          )}

          <TituloTransacciones
            value={titulo}
            onChange={handleTituloChange}
          />
          {errors.titulo && (
            <span className="text-red-500 text-sm ml-6 block">
              {errors.titulo}
            </span>
          )}

          <MontoTransacciones
            value={monto}
            onChange={handleMontoChange}
          />
          {errors.monto && (
            <span className="text-red-500 text-sm ml-6 block">
              {errors.monto}
            </span>
          )}

          <FechaTransacciones
            value={fecha}
            onChange={setFecha}
          />

          <NotaTransacciones
            value={nota}
            onChange={setNota}
          />

          <RecurrenteTransacciones
            initialRule={recurrenceRule}
            onChange={setRecurrenceRule}
          />
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
