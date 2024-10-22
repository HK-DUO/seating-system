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
            type={type}
            row={index + 1}
            key={itemIndex}
            seatNum={seatNum}
            setSeatNum={setSeatNum}
            seat={item}
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
            type={type}
            row={index + 1}
            key={itemIndex}
            seatNum={seatNum}
            setSeatNum={setSeatNum}
            seat={item}
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
