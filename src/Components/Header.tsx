import { BotonesHeader } from './Botones/BotonesHeader';
import { MyCalendar } from './Calendar/MyCalendar';
import { BotonAgregar } from './Botones/BotonAgregar';
export const Header = () => {
  return (
    <>
      <div>
        <div>
          <BotonesHeader></BotonesHeader>
        </div>
        <div>
          <div className="flex justify-center mt-15">
            <MyCalendar></MyCalendar>
          </div>
          <div className="w-full flex justify-end mt-6 ml-7 sm:ml-8 md:ml-[5rem] lg:ml-[4rem]">
            <BotonAgregar />
          </div>
        </div>
      </div>
    </>
  );
};
