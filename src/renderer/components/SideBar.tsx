import CurrentTime from "./CurrentTime";
import CurrentSeat from "./CurrentSeat";
import "../styles/SideBar.css"
import SeatInfo from "./SeatInfo";
import {useDialog} from "../hooks/useDialog";

type PropsType = {
    currentSeat: {
      roomNum: number
      totalSeat: number;
      restSeat: number
      selectSeat?: number;
    };
}

function SideBar({currentSeat}: PropsType) {
  const {alert, prompt, inPrompt, outPrompt} = useDialog();


  return <div className="side-bar">
    <CurrentTime/>
    <CurrentSeat props={currentSeat}/>
    <div>
      <button onClick={() => {
        if (currentSeat.roomNum && currentSeat.selectSeat) {
          inPrompt(String(currentSeat.roomNum), String(currentSeat.selectSeat),
          )
            .then((res) => console.log(res));
        } else alert("오류", "좌석을 선택하세요")
      }}>예약
      </button>
      <button
        onClick={() => {
          prompt("퇴실", "퇴실 후 좌석을 다시 이용하기 위해선 재예약이 필요합니다.\n퇴실 시 본인 좌석 정리,정돈").then((res) => console.log(res))
        }}>퇴실
      </button>
      <div>
        <button onClick={() => {
          prompt("연장", "연장은 기본 사용시간의 2시간 증가합니다.\n연장을 통해 제한없이 이용가능합니다.").then((res) => console.log(res));
        }}>연장
        </button>
        <button
          onClick={() => {
            if (currentSeat.roomNum && currentSeat.selectSeat) {
              outPrompt(String(currentSeat.roomNum), String(currentSeat.selectSeat)).then((res) => console.log(res));
            } else alert("오류", "좌석을 선택하세요");
          }}>퇴실요청
        </button>
      </div>
    </div>
    <SeatInfo/>
  </div>;
}

export default SideBar;
