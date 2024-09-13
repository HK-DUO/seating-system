import SideBar from "./SideBar";
import { useEffect, useState } from 'react';
import RoomLayout from "../layouts/RoomLayout";
import "../styles/SeatMain.css";


function SeatMain() {
  const [roomData, setRoomData] = useState<any>();

  const [roomNum, setRoomNum] = useState<number>(1);
  const [seatNum, setSeatNum] = useState<number>();

  useEffect(() => {
    onView(roomNum).then((res) => {
      console.log(res)
      setRoomData(res);
    });
  }, [roomNum]);

  const onView = async (num: number): Promise<any> => {
    setSeatNum(undefined);
    let res = await window.electron.viewReadingRoom(num);
    return res;
  };


  return <div className="seat-main">
    <div>
      <div>
        <button onClick={() => {
          setRoomNum(1);
        }} className={roomNum == 1 ? 'bg-blue text-white' : 'bg-lightBlue'}>제1열람실
        </button>
        <button onClick={() => {
          setRoomNum(2);
        }} className={roomNum == 2 ? 'bg-blue text-white' : 'bg-lightBlue'}>제2열람실
        </button>
      </div>
        <RoomLayout type={roomData?.selectRoom} seatNum={seatNum} setSeatNum={setSeatNum} room={roomData?.room} />
    </div>
    <SideBar room={roomData?.room} selectRoom={roomNum} selectSeat={seatNum} />
  </div>;
}

export default SeatMain;
