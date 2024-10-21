import SideBar from "../components/SideBar";
import { useEffect, useState } from 'react';
import RoomLayout from "./RoomLayout";
import "../styles/SeatMain.css";
import { RoomInfoType } from "../types/InfoType";
import { READING_ROOM_DTO } from "../../main/data/type/Dto.type";
import { ResponseEntity } from "../../main/data/class/Response.class";


function SeatMain() {
  const [roomData, setRoomData] = useState<{selectRoom?:number, room?:RoomInfoType}>();

  const [roomNum, setRoomNum] = useState<number>(2);
  const [seatNum, setSeatNum] = useState<number>();

  useEffect(() => {
    onView(roomNum).then((res) => {
      console.log(res)
      setRoomData(res.data);
    });
  }, [roomNum]);

  const onView = async (num: number): Promise<any> => {
    setSeatNum(undefined);
    let res = await window.electron.viewReadingRoom(num) as ResponseEntity<READING_ROOM_DTO>;
    return res;
  };


  return <div className="seat-main">
    <div>
      <div>
        {/* <button onClick={() => { */}
        {/*   setRoomNum(1); */}
        {/* }} className={roomNum == 1 ? 'bg-blue text-white' : 'bg-light-blue'}>제1열람실 */}
        {/* </button> */}
        <button onClick={() => {
          setRoomNum(2);
        }} className={roomNum == 2 ? 'bg-blue text-white' : 'bg-light-blue'}>열람실
        </button>
      </div>
        <RoomLayout type={roomData?.selectRoom} seatNum={seatNum} setSeatNum={setSeatNum} room={roomData?.room} />
    </div>
    <SideBar room={roomData?.room} selectRoom={roomNum} selectSeat={seatNum} />
  </div>;
}

export default SeatMain;
