import React from "react";
import { room1 } from '../models/seatModel';
import Seat from './Seat';

type PropsType = {
  type: number;
  seatNum?: number;
  setSeatNum: any;
};

function RoomLayout({type, setSeatNum, seatNum}: PropsType) {

  const room1Layout = room1.map((item, index) => (
    <li className={`${item.row % 2 == 0 ? 'mb-[10px]' : ''} flex`}>
      {item.seats.map((item, index) => Seat({
        num: item.num, line: item.line, state: item.state, disableSeats: item.disableSeats,
        seatNum: seatNum, setSeatNum: setSeatNum
      }))}
    </li>
  ));


  return <div>
   <ul>
     {type == 1 ? room1Layout : "2열람실 레이아웃"}
   </ul>
  </div>;
}

export default RoomLayout;
