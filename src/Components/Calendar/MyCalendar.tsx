import { Calendar, dayjsLocalizer, ToolbarProps } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MyCalendar.css';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useEffect, useState, useRef } from 'react';
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

type MyCalendarProps = {
  limiteDiario: number;
};
export const MyCalendar = ({ limiteDiario }: MyCalendarProps) => {
  const [eventos, setEventos] = useState<EventoCalendario[]>([]);
  const localizer = dayjsLocalizer(dayjs);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [visibleDate, setVisibleDate] = useState<Date>(new Date());
  const lastKey = useRef<string>('');

  useEffect(() => {
    if (!token) return;

    const startDate = dayjs(visibleDate).startOf('month').toISOString();
    const endDate = dayjs(visibleDate).endOf('month').toISOString();
    const key = `${startDate}|${endDate}|completedOnly`;

    if (lastKey.current === key) return; // ✅ evita segundo pase de StrictMode
    lastKey.current = key;

    const api = apiClient(token);

    api
      .get(
        `/api/calendar/transactions?startDate=${startDate}&endDate=${endDate}&includePending=false&includeCompleted=true`,
      )
      .then((response: any[]) => {
        if (!response) return;

        const transaccionesAgrupadas: Record<string, number> = {};
        response.forEach((trans: any) => {
          const k = dayjs(trans.date).format('YYYY-MM-DD');
          transaccionesAgrupadas[k] =
            (transaccionesAgrupadas[k] ?? 0) + trans.amount;
        });

        const eventosAgrupados = Object.entries(transaccionesAgrupadas).map(
          ([k, total], idx) => {
            const fecha = dayjs(k, 'YYYY-MM-DD').toDate();
            const n = Number(total);
            return {
              id: idx,
              title: `${Number.isInteger(n) ? n : n.toFixed(2)}€`,
              start: fecha,
              end: fecha, // ← igual que tenías
              name: 'Total del día',
              resource: { total: n },
            };
          },
        );

        setEventos(eventosAgrupados);
      })
      .catch(console.error);
  }, [token, visibleDate]);

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
    navigate(`/agregar-editar-transaccion/${event.id}`);
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
        date={visibleDate} // ← NUEVO: fecha controlada
        onNavigate={(newDate) => setVisibleDate(newDate)} // ← NUEVO: actualiza mes visible
        onSelectEvent={handleSelectEvent}
        tooltipAccessor={(event) => event.name || 'Sin título'}
        eventPropGetter={(event) => {
          const esMayorAlLimite = event.resource.total > limiteDiario;
          return {
            className: esMayorAlLimite ? 'evento-superado' : 'evento-normal',
          };
        }}
      />
    </div>
  );
};
