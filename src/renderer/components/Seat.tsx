import { SeatInfoType } from '@/types/InfoType';
import { PrioritySeatIc } from '@/assets/svg';

type PropsType = {
  type?: number;
  row: number;
  seatNum?: number;
  setSeatNum: any;
  seat: SeatInfoType;
};

function Seat({ type, row, seatNum, setSeatNum, seat }: PropsType) {
  return (
    <div
      className={`h-[39.5px] px-[6px] border-black/60 border cursor-pointer hover:bg-blue flex flex-col items-center
    ${type == 1 ? `w-[50px] ${seat.line % 3 == 0 && `${row == 8 ? 'ml-[50px]' : 'mr-[50px]'}`}` : `w-[60px] ${seat.line % 3 == 0 && 'mr-[110px]'}`}
    ${seat.state ? (seatNum == seat.num ? 'bg-blue' : 'bg-light-blue') : seatNum == seat.num ? 'bg-blue' : 'bg-red'}
    ${seat.disableSeats && 'bg-red'}`}
      onClick={() => {
        setSeatNum(seat.num);
      }}
    >
      <span className="text-[14px] font-[600]">{seat.num}</span>
      {seat?.end_time && (
        <span className="text-[12px] text-center text-black/50">
          ~ {seat.end_time}
        </span>
      )}
      {seat.disableSeats && <img src={PrioritySeatIc} width={18} />}
    </div>
  );
}

export default Seat;
