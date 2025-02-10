import { Calendar, dayjsLocalizer, ToolbarProps } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MyCalendar.css';
import dayjs from 'dayjs';

export const MyCalendar = () => {
  const localizer = dayjsLocalizer(dayjs);

  const messages = {
    today: 'Hoy',
    previous: '< Anterior',
    next: 'Siguiente >',
  };

  const components = {
    toolbar: (props: ToolbarProps) => (
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
    <div className="w-full ">
      <Calendar
        localizer={localizer}
        messages={messages}
        views={['month']}
        defaultView="month"
        components={components}
        className="min-h-[37.5rem] md:min-h-[25rem] sm:min-h-[18.75rem]"
      />
    </div>
  );
};
