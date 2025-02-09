import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Components/Calendar/MyCalendar.css';
import dayjs from 'dayjs';

export const MyCalendar = () => {
  const localizer = dayjsLocalizer(dayjs);

  const montosCalendario = [
    {
      start: dayjs('2025-02-01'),
      montosEnElCalendario: '3,86€',
    },
  ];
  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={montosCalendario}
      />
    </div>
  );
};
