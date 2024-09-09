import SideBar from "./SideBar";
import {useState} from "react";
import RoomLayout from "./RoomLayout";
import "../styles/SeatMain.css";
import { room1 } from '../models/seatModel';


function SeatMain(){
  const [roomNum, setRoomNum] = useState<number>(1);
  const [seatNum, setSeatNum] = useState<number>();


  return <div className="seat-main">
    <div>
      <div>
        <button onClick={() => setRoomNum(1)} className={roomNum == 1 ? 'bg-blue text-white' : 'bg-lightBlue'}>제1열람실
        </button>
        <button onClick={() => setRoomNum(2)} className={roomNum == 2 ? 'bg-blue text-white' : 'bg-lightBlue'}>제2열람실
        </button>
      </div>
      <RoomLayout type={roomNum} seatNum={seatNum} setSeatNum={setSeatNum} room={room1} />
    </div>
    <SideBar room={room1} selectRoom={roomNum} selectSeat={seatNum} />
  </div>;
}

export default SeatMain;
