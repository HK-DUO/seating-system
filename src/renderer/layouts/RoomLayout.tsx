import React from 'react';

import Seat from '../components/Seat';
import { RoomInfoType } from '../types/InfoType';

type PropsType = {
  type?: number;
  seatNum?: number;
  setSeatNum: any;
  room?: RoomInfoType;
};

function RoomLayout({ type, setSeatNum, seatNum, room }: PropsType) {
  const room1Layout = room?.rows?.map((item, index) => (
    <li
      key={index}
      className={
        item.row % 2 == 0
          ? `${item.row == 8 && 'mr-[150px]'} mb-[116px] flex flex-row-reverse`
          : 'flex'
      }
    >
      {item.seats.map((item, itemIndex) => (
        <div key={itemIndex}>
          <Seat
            type={1}
            row={index + 1}
            num={item.num}
            line={item.line}
            state={item.state}
            key={itemIndex}
            disableSeats={item.disableSeats}
            seatNum={seatNum}
            setSeatNum={setSeatNum}
          />
        </div>
      ))}
    </li>
  ));

  const room2Layout = room?.rows?.map((item, index) => (
    <li
      key={index}
      className={item.row % 2 == 0 ? 'mb-[11px] flex flex-row-reverse' : 'flex'}
    >
      {item.seats.map((item, itemIndex) => (
        <div key={itemIndex}>
          <Seat
            type={2}
            row={index + 1}
            num={item.num}
            line={item.line}
            state={item.state}
            key={itemIndex}
            disableSeats={item.disableSeats}
            seatNum={seatNum}
            setSeatNum={setSeatNum}
          />
        </div>
      ))}
    </li>
  ));

  return (
    <div>
      <ul>{room && (type == 1 ? room1Layout : room2Layout)}</ul>
    </div>
  );
}

export default RoomLayout;
