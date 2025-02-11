import { BotonesHeader } from './Botones/BotonesHeader';
import { MyCalendar } from './Calendar/MyCalendar';
import { BotonAgregar } from './Botones/BotonAgregar';

export const Header = () => {
  return (
    <>
      <div>
        <div className="w-full flex justify-center mt-30 ">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8  ">
            <BotonesHeader />
          </div>
        </div>
        <div>
          <div className="bg-myGray/50 rounded-2xl px-8 sm:px-8 md:px-20 lg:px-30 py-4 sm:py-6 md:py-8 lg:py-10 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
            <MyCalendar></MyCalendar>
            <div className="w-full flex justify-end mt-6 ml-7 sm:ml-8 md:ml-[5rem] lg:ml-[4rem]">
              <BotonAgregar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
