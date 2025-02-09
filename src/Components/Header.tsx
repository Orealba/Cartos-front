import { BotonesHeader } from './Botones/BotonesHeader';
import { MyCalendar } from './Calendar/MyCalendar';
export const Header = () => {
  return (
    <>
      <div>
        <div>
          <BotonesHeader></BotonesHeader>
        </div>
        <div className="flex justify-center mt-15">
          <MyCalendar></MyCalendar>
        </div>
      </div>
    </>
  );
};
