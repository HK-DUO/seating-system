import SideBar from "./SideBar";
import { useEffect, useState } from 'react';
import RoomLayout from "./RoomLayout";
import "../styles/SeatMain.css";
import { room1, room2 } from '../models/seatModel';


function SeatMain(){
  const [room, setRoom] = useState<any>()

  const [roomNum, setRoomNum] = useState<number>(1);
  const [seatNum, setSeatNum] = useState<number>();

  useEffect(() => {
    setRoom(room1)
  }, []);


  return <div className="seat-main">
    <div>
      <div>
        <button onClick={() => {
          setSeatNum(undefined)
          setRoomNum(1);
          setRoom(room1)
        }} className={roomNum == 1 ? 'bg-blue text-white' : 'bg-lightBlue'}>제1열람실
        </button>
        <button onClick={() => {
          setSeatNum(undefined)
          setRoomNum(2);
          setRoom(room2)
        }} className={roomNum == 2 ? 'bg-blue text-white' : 'bg-lightBlue'}>제2열람실
        </button>
      </div>
      <RoomLayout type={roomNum} seatNum={seatNum} setSeatNum={setSeatNum} room={room} />
    </div>
    <SideBar room={room} selectRoom={roomNum} selectSeat={seatNum} />
  </div>;
}

export default SeatMain;
