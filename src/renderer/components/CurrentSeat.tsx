import "../styles/CurrentSeat.css"

type PropsType = {
  props?: {
    roomNum: number
    totalSeat: number;
    restSeat: number
    selectSeat?: number;
  };
}

function CurrentSeat({props}: PropsType) {
  return <div className="current-seat">
    <span>실시간 좌석현황</span>
    <p><label>열람실 :</label><span>{props?.roomNum}열람실</span></p>
    <p><label>총 좌석 :</label><span>{props?.totalSeat}석</span></p>
    <p><label>잔여좌석 :</label><span>{props?.restSeat}석</span></p>
    <p><label>선택좌석 :</label><span>{props?.selectSeat ? `${props?.selectSeat}좌석` : "없음"}</span></p>
  </div>;
}

export default CurrentSeat;
