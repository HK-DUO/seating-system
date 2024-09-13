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
      seats: { id:number, num: number, line: number, state: boolean, disableSeats: boolean }[]
    }[];
  };
};

function SideBar({selectRoom, selectSeat, room}: PropsType) {
  const {alert, prompt, inPrompt, outPrompt} = useDialog();

  const reserve = () => {
    if(selectSeat){room.rows.forEach((item, index) => {
      item.seats.forEach(async(item, index) => {
        if(selectSeat == item.num){
          if(!item.state){
            await alert('오류', "이미 사용중인 좌석입니다.");
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
                    let response = await window.electron.createReservation(res.name, res.number, item.id)
                    console.log(response)
                  }
                }
                else {
                  ok = true
                }
              });
            }}
        }
      });
    })}else {
      alert("오류", "좌석을 선택하세요.")
    }

  }

  const out = async () =>{
    let ok = false
    while(!ok){
      await prompt('퇴실').then(async (res: any) => {
        if(res){
          if (res.name == '') {
            await alert('오류', '이름을 입력하세요.');
          } else if (res.number == '') {
            await alert('오류', '전화번호를 입력하세요.');
          } else {
            await alert('퇴실', '좌석이 반납되었습니다.');
            ok = true
          }
        } else {
          ok = true
        }
      });}
  }

  const extend = async () => {
    let ok = false
    while(!ok){
      await prompt("연장").then(async (res: any) => {
        if(res){
          if (res.name == '') {
            await alert('오류', '이름을 입력하세요.');
          } else if (res.number == '') {
            await alert('오류', '전화번호를 입력하세요.');
          } else {
            await alert('연장', '이용시간 연장이 완료되었습니다.');
            ok = true
          }
        } else {
          ok = true
        }
      })
    }
  }

  const outRequest = () =>{
    if(selectSeat){room.rows.forEach((item, index) => {
      item.seats.forEach(async(item, index) => {
        if(selectSeat == item.num){
          if(item.state){
            alert("오류", "사용중인 좌석이 아닙니다.")
          } else {
            outPrompt(String(selectRoom), String(selectSeat)).then(async (res: any) => {})
          }
        }
      })
    })}else {
      alert("오류", "좌석을 선택하세요.")
    }
  }


  return <div className="side-bar">
    <CurrentTime />
    <CurrentSeat selectSeat={selectSeat} restSeat={room?.restSeats} totalSeat={room?.totalSeats} roomNum={selectRoom} />
    <div>
      <button onClick={reserve}>예약
      </button>
      <button onClick={out}>퇴실
      </button>
      <div>
        <button onClick={extend}>연장
        </button>
        <button onClick={outRequest}>퇴실요청
        </button>
      </div>
    </div>
    <SeatInfo />
  </div>;
}

export default SideBar;
