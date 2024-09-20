import CurrentTime from "./CurrentTime";
import CurrentSeat from "./CurrentSeat";
import "../styles/SideBar.css"
import SeatInfo from "./SeatInfo";
import {useDialog} from "../hooks/useDialog";
import { room1 } from '../models/seatModel';
import { RoomInfoType } from "../types/InfoType";

type PropsType = {
  selectRoom?: number;
  selectSeat?: number;
  room?: RoomInfoType
};

function SideBar({selectRoom, selectSeat, room}: PropsType) {
  const {alert, userPrompt, inPrompt, outPrompt} = useDialog();

  const reserve = async () => {
    if(selectSeat){room?.rows.forEach((item, index) => {
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
                    await window.electron.checkIn(res.name, res.number, item.id).then(async(res)=>{
                      if(res){
                        await alert("예약", "좌석예약이 완료되었습니다.")
                        ok = true
                        window.location.reload()
                      } else {
                        await alert("오류", "오류가 발생했습니다.")
                      }
                    })
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
      await alert("오류", "좌석을 선택하세요.")
    }

  }

  const out = async () =>{
    let ok = false
    while(!ok){
      await userPrompt('퇴실').then(async (res: any) => {
        if(res){
          if (res.name == '') {
            await alert('오류', '이름을 입력하세요.');
          } else if (res.number == '') {
            await alert('오류', '전화번호를 입력하세요.');
          } else {
           await window.electron.checkOut(res.name, res.number).then(async (res)=>{
             if(res == true){
               await alert("퇴실", "퇴실이 완료되었습니다")
               ok = true
               window.location.reload()
             } else {
               await alert("오류", "퇴실이 완료되지 않았습니다")
             }
           })
          }
        } else {
          ok = true
        }
      });}
  }

  const extend = async () => {
    let ok = false
    while(!ok){
      await userPrompt("연장").then(async (res: any) => {
        if(res){
          if (res.name == '') {
            await alert('오류', '이름을 입력하세요.');
          } else if (res.number == '') {
            await alert('오류', '전화번호를 입력하세요.');
          } else {
            await window.electron.extend(res.name,res.number).then(async (res: any) => {
              if(res){
                await alert('연장', '이용시간 연장이 완료되었습니다.');
                ok = true
                window.location.reload()
              }else{
                await alert('오류', '연장 오류.');
              }
            })
          }
        } else {
          ok = true
        }
      })
    }
  };

  const outRequest = async () =>{
    if(selectSeat){room?.rows.forEach((item, index) => {
      item.seats.forEach(async(item, index) => {
        if(selectSeat == item.num){
          if(item.state){
            alert("오류", "사용중인 좌석이 아닙니다.")
          } else {
            let ok = false
            while (!ok) {
              await outPrompt(String(selectRoom), String(selectSeat)).then(
                async (res: any) => {
                  if (res) {
                    if (res.name == '') {
                      await alert('오류', '이름을 입력하세요.');
                    }
                    if (res.name == '') {
                      await alert('오류', '전화번호를 입력하세요.');
                    } else {
                      await window.electron
                        .askCheckout(item.id, res.name, res.number)
                        .then(async (res: any) => {
                          if (res) {
                            await alert(
                              '퇴실요청',
                              '퇴실요청이 완료되었습니다.',
                            );
                            ok = true;
                          } else {
                            await alert(
                              '오류',
                              '퇴실요청이 완료되지 않았습니다.',
                            );
                          }
                        });
                    }
                  } else {
                    ok = true
                  }
                },
              );
            }
          }
        }
      })
    })}else {
      await alert("오류", "좌석을 선택하세요.")
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
