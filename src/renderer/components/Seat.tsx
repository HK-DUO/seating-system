type PropsType = {
  type:number;
  row:number;
  num: number;
  line: number;
  state: boolean;
  disableSeats: boolean;
  seatNum?: number;
  setSeatNum: any;
};

function Seat({type,row, num, line, state, disableSeats, seatNum,  setSeatNum }: PropsType) {
  return <div
    className={`h-[34px] px-[6px] border-black/60 border cursor-pointer hover:bg-blue
    ${type == 1 ? `w-[50px] ${line % 3 == 0 && `${row == 8 ? 'ml-[50px]' : 'mr-[50px]'}`}` : `w-[60px] ${line % 3 == 0 && 'mr-[110px]'}`}
    ${(state ? seatNum == num ? 'bg-blue' : 'bg-light-blue' : seatNum == num ? 'bg-blue' : 'bg-red')}`}
    onClick={() => {
      setSeatNum(num);
    }}>
    <span className="text-[12px]">{num}</span>
    {disableSeats && <span>장애인석</span>}
  </div>;
}

export default Seat;
