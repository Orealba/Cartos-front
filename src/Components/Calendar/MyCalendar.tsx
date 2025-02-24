import { Calendar, dayjsLocalizer, ToolbarProps } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MyCalendar.css';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useEffect, useState } from 'react';
import { apiClient } from '../../services/api';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

dayjs.locale('es');

interface EventoCalendario {
  id: number;
  title: string;
  start: Date;
  end: Date;
  name: string;
  resource: any;
}

export const MyCalendar = () => {
  const [eventos, setEventos] = useState<EventoCalendario[]>([]);
  const localizer = dayjsLocalizer(dayjs);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const cargarTransacciones = async () => {
      try {
        const api = apiClient(token);
        const startDate = dayjs().startOf('month').toISOString();
        const endDate = dayjs().endOf('month').toISOString();

        const response = await api.get(
          `/api/calendar/transactions?startDate=${startDate}&endDate=${endDate}&includePending=false&includeCompleted=true`,
        );

        if (response) {
          setEventos(
            response.map((trans: any) => ({
              id: trans.transactionId,
              title: `${trans.amount}€`,
              start: new Date(trans.date),
              end: new Date(trans.date),
              name: trans.name,
              resource: trans,
            })),
          );
        }
      } catch (error) {
        console.error('Error al cargar transacciones:', error);
      }
    };

    cargarTransacciones();
  }, [token]);

  const messages = {
    today: 'Hoy',
    previous: 'Anterior',
    next: 'Siguiente',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    allDay: 'Todo el día',
    noEventsInRange: 'No hay eventos en este rango.',
    showMore: (total: number) => `+ Ver más (${total})`,
  };

  const components = {
    toolbar: (props: ToolbarProps<EventoCalendario>) => (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button
            type="button"
            onClick={() => props.onNavigate('PREV')}>
            {messages.previous}
          </button>
          <button
            type="button"
            onClick={() => props.onNavigate('TODAY')}>
            {messages.today}
          </button>
          <button
            type="button"
            onClick={() => props.onNavigate('NEXT')}>
            {messages.next}
          </button>
        </span>
        <span className="rbc-toolbar-label">{props.label}</span>
      </div>
    ),
  };

  const handleSelectEvent = (event: any) => {
    navigate(`/transactions/edit/${event.id}`);
  };

  return (
    <div className="w-full max-w-none">
      <Calendar
        localizer={localizer}
        events={eventos}
        messages={messages}
        views={['month']}
        defaultView="month"
        components={components}
        className="min-h-[37.5rem] md:min-h-[25rem] sm:min-h-[18.75rem]"
        style={{ width: '100%' }}
        defaultDate={new Date()}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={() => ({
          style: {
            backgroundColor: 'transparent',
            color: 'var(--my-yellow)',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
          },
        })}
        tooltipAccessor={(event) => event.name}
      />
    </div>
  );
};
