type PropsType = {
  num: number;
  line: number;
  state: boolean;
  disableSeats: boolean;
  seatNum?: number;
  setSeatNum: any;
};

function Seat({ num, line, state, disableSeats, seatNum,  setSeatNum }: PropsType) {
  return <div
    className={`w-[60px] h-[34px] px-[6px] border-black/60 border cursor-pointer hover:bg-blue  ${(state ? seatNum == num ? 'bg-blue' : 'bg-lightBlue' : seatNum == num ? 'bg-blue' : 'bg-red')} ${line % 3 == 0 ? 'mr-[100px]' : ''}`}
    onClick={() => {
      setSeatNum(num);
    }}>
    <span className="text-[12px]">{num}</span>
    {disableSeats && <span>장애인석</span>}
  </div>;
}

export default Seat;
