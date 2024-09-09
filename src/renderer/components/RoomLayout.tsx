import React from "react";

import Seat from './Seat';

type PropsType = {
  type: number;
  seatNum?: number;
  setSeatNum: any;
  room?: {
    type: number;
    totalSeats: number,
    restSeats: number,
    rows: {
      row: number,
      seats: { num: number, line: number, state: boolean, disableSeats: boolean }[]
    }[];
  };
};

function RoomLayout({type, setSeatNum, seatNum, room}: PropsType) {

  const room1Layout = room?.rows?.map((item, index) => (
    <li key={index} className={`${item.row % 2 == 0 ? 'mb-[116px]' : ''} flex`}>
      {item.seats.map((item, index) =>
        (<div key={index}>
          <Seat type={1} num={item.num} line={item.line} state={item.state} key={index} disableSeats={item.disableSeats}
                seatNum={seatNum} setSeatNum={setSeatNum} />
        </div>))}
    </li>
  ));

  const room2Layout = room?.rows?.map((item, index) => (
    <li key={index} className={`${item.row % 2 == 0 ? 'mb-[10px]' : ''} flex`}>
      {item.seats.map((item, index) =>
        (<div key={index}>
          <Seat type={2} num={item.num} line={item.line} state={item.state} key={index} disableSeats={item.disableSeats}
                seatNum={seatNum} setSeatNum={setSeatNum} />
        </div>))}
    </li>
  ));


  return <div>
    <ul>
      {room && (type == 1 ? room1Layout : room2Layout)}
    </ul>
  </div>;
}

export default RoomLayout;
