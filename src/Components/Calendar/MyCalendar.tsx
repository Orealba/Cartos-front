import { Calendar, dayjsLocalizer, ToolbarProps } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MyCalendar.css';
import dayjs from 'dayjs';

interface EventoCalendario {
  id: number;
  title: string; // Este será el monto en euros
  start: Date;
  end: Date;
}

export const MyCalendar = () => {
  const localizer = dayjsLocalizer(dayjs);

  const eventos: EventoCalendario[] = [
    {
      id: 1,
      title: '35€',
      start: new Date(), // Fecha actual
      end: new Date(), // Fecha actual
    },
    {
      id: 2,
      title: '50€',
      start: new Date(new Date().setDate(new Date().getDate() + 1)), // Mañana
      end: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
    {
      id: 3,
      title: '75€',
      start: new Date(2024, 1, 28), // 28 de febrero 2024
      end: new Date(2024, 1, 28),
    },
  ];

  const messages = {
    today: 'Hoy',
    previous: 'Anterior',
    next: 'Siguiente',
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
        defaultDate={new Date(2024, 1, 1)}
        eventPropGetter={() => ({
          style: {
            backgroundColor: 'transparent',
            color: 'var(--my-yellow)',
            border: 'none',
            fontWeight: 'bold',
          },
        })}
      />
    </div>
  );
};
