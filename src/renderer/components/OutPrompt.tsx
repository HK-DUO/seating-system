import {getCurrentTime} from "../utils/getTime";
import "../styles/OutPrompt.css";

type PropsType = {
  onClickOk:()=>void
  onClickCancel:()=>void
  roomNum:string
  seatNum:string
}

function OutPrompt({seatNum, roomNum, onClickCancel, onClickOk}: PropsType) {
  return <div className="outPrompt">
    <h1>{"퇴실요청"}</h1>
    <div>
      <label>열람실</label><input value={`제 ${roomNum} 열람실`} disabled={true}/>
    </div>
    <div>
      <label>좌석</label><input value={`${seatNum}번`} disabled={true}/>
    </div>
    <div>
      <label>공석시간</label><input value={getCurrentTime()} disabled={true}/>
    </div>
    <p>{"이용자가 자동 퇴실 시간전에 연장시 퇴실요청은 자동 취소됩니다\n해당시간이 지난 후 자동공석처리됩니다.\n공석 처리시간에 맞춰 예약을 진행해주셔야 됩니다.\n이용자가 있는 자리를 고의적으로 자주 퇴실 요청하실 경우 이용시 패널티가 부여됩니다.\n빈자리, 자리맡아두기 등의 자리만 퇴실요청을 부탁드립니다."}</p>
    <div>
      <button onClick={onClickCancel}>취소</button>
      <button onClick={onClickOk}>확인</button>
    </div>
  </div>;
}

export default OutPrompt;
