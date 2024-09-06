import React from "react";

type PropsType = {
  type: number;
  seatNum?: number;
  setSeatNum: any;
};

function RoomLayout({type, setSeatNum, seatNum}: PropsType) {
  return <div>
    <button onClick={() => setSeatNum(1)}>1번좌석</button>
    <button onClick={() => setSeatNum(2)}>2번좌석</button>
  </div>;
}

export default RoomLayout;
