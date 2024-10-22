import '@/styles/CurrentSeat.css';

type PropsType = {
  roomNum?: number;
  totalSeat?: number;
  restSeat?: number;
  selectSeat?: number;
};

function CurrentSeat({ roomNum, totalSeat, selectSeat, restSeat }: PropsType) {
  return (
    <div className="current-seat">
      <span>실시간 좌석현황</span>
      <p>
        <label>열람실 :</label>
        <span>{roomNum}열람실</span>
      </p>
      <p>
        <label>총 좌석 :</label>
        <span>{totalSeat}석</span>
      </p>
      <p>
        <label>잔여좌석 :</label>
        <span>{restSeat}석</span>
      </p>
      <p>
        <label>선택좌석 :</label>
        <span>{selectSeat ? `${selectSeat}좌석` : '없음'}</span>
      </p>
    </div>
  );
}

export default CurrentSeat;
