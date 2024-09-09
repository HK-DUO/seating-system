import CurrentTime from "./CurrentTime";
import CurrentSeat from "./CurrentSeat";
import "../styles/SideBar.css"
import SeatInfo from "./SeatInfo";
import {useDialog} from "../hooks/useDialog";
import { room1 } from '../models/seatModel';

type PropsType = {
  selectRoom?: number;
  selectSeat?: number;
  room: {
    totalSeats: number,
    restSeats: number,
    rows: {
      row: number,
      seats: { num: number, line: number, state: boolean, disableSeats: boolean }[]
    }[];
  };
};

function SideBar({selectRoom, selectSeat, room}: PropsType) {
  const {alert, prompt, inPrompt, outPrompt} = useDialog();

  const reserve = () => {
    room.rows.forEach((item, index) => {
      item.seats.forEach(async(item, index) => {
        if(selectSeat == item.num){
          if(item.state == false){
            alert('오류', "이미 사용중인 좌석입니다.");
          } else {
            let ok = false;
            while (!ok) {
              await inPrompt(String(selectRoom), String(selectSeat)).then(async (res: any) => {
                if(res) {
                  if (res.name == '') {
                    await alert('오류', '이름을 입력하세요.');
                  } else if (res.number == '') {
                    await alert('오류', '전화번호를 입력하세요.');
                  } else {
                    await alert('예약완료', '좌석예약이 완료되었습니다.');
                    ok = true;
                  }
                }
                  else {
                  ok = true
                }
              });
            }}
        }
      });
    })
  }


  const out = () =>{
    room.rows.forEach((item, index) => {
      item.seats.forEach(async(item, index) => {
        if(selectSeat == item.num){
          if(item.state !== false){
            alert("오류", "사용중인 좌석이 아닙니다.")
          } else {
            outPrompt(String(selectRoom), String(selectSeat)).then(async (res: any) => {})
          }
        }
      })
    })
  }


  return <div className="side-bar">
    <CurrentTime />
    <CurrentSeat selectSeat={selectSeat} restSeat={room.restSeats} totalSeat={room.totalSeats} roomNum={selectRoom} />
    <div>
      <button onClick={reserve}>예약
      </button>
      <button>퇴실
      </button>
      <div>
        <button onClick={() => {
          prompt('연장', '연장은 기본 사용시간의 2시간 증가합니다.\n연장을 통해 제한없이 이용가능합니다.').then((res) => console.log(res));
        }}>연장
        </button>
        <button onClick={out}>퇴실요청
        </button>
      </div>
    </div>
    <SeatInfo />
  </div>;
}

export default SideBar;
