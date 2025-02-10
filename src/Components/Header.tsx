import { BotonesHeader } from './Botones/BotonesHeader';
import { MyCalendar } from './Calendar/MyCalendar';
import { BotonAgregar } from './Botones/BotonAgregar';
export const Header = () => {
  return (
    <>
      <div>
        <div className="w-full flex justify-center mt-30 sm:mt-28 md:mt-0 lg:mt-0 xl:mt-0 ">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8  ">
            <BotonesHeader />
          </div>
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
