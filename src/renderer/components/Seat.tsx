import { PrioritySeatIc } from '../assets/svg';

type PropsType = {
  type: number;
  row: number;
  num: number;
  line: number;
  state: boolean;
  disableSeats: boolean;
  seatNum?: number;
  setSeatNum: any;
  endTime: string | null;
};

function Seat({
  type,
  row,
  num,
  line,
  state,
  disableSeats,
  seatNum,
  setSeatNum,
  endTime,
}: PropsType) {
  return (
    <div
      className={`h-[39.5px] px-[6px] border-black/60 border cursor-pointer hover:bg-blue flex flex-col items-center
    ${type == 1 ? `w-[50px] ${line % 3 == 0 && `${row == 8 ? 'ml-[50px]' : 'mr-[50px]'}`}` : `w-[60px] ${line % 3 == 0 && 'mr-[110px]'}`}
    ${state ? (seatNum == num ? 'bg-blue' : 'bg-light-blue') : seatNum == num ? 'bg-blue' : 'bg-red'}
    ${disableSeats && 'bg-red'}`}
      onClick={() => {
        setSeatNum(num);
      }}
    >
      <span className="text-[14px] font-[600]">{num}</span>
      {endTime && (
        <span className="text-[12px] text-center text-black/50">
          ~ {endTime}
        </span>
      )}
      {disableSeats && <img src={PrioritySeatIc} width={18} />}
    </div>
  );
}

export default Seat;
