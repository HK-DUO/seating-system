import { SEAT } from "../type/tableType";
import { ROW_DTO, SEAT_DTO } from "../type/dtoType";


export function toConvertRowDtos(seats: SEAT[], id: number):ROW_DTO[]{
  let seatsPerRow:number = id==1 ? 11:8;
  const rowDtoArr:ROW_DTO[]=[];
  let seatDtoArr = toConvertSeatDtos(seats,id);
  for(let i=0;i<seats.length;i+=seatsPerRow){
    const rowSeats=seatDtoArr.slice(i,i+seatsPerRow);
    rowDtoArr.push({
      row: Math.floor(i / seatsPerRow) + 1,
      seats:rowSeats,
    })
  }
  return rowDtoArr;
}

function toConvertSeatDtos(seats:SEAT[],id:number):SEAT_DTO[]{
  let seatsPerRow:number = id==1 ? 11:8;
  const seat_dto: SEAT_DTO[]=[];
  for(const seat of seats){
    seat_dto.push({
      num:parseInt(seat.seat_num),
      line:parseInt(seat.seat_num)%seatsPerRow==0?seatsPerRow:parseInt(seat.seat_num)%seatsPerRow,
      state:seat.seat_status == 'able',
      disableSeats:seat.is_special==1,
    })
  }
  return seat_dto;
}

export function initSeat(){
  const seats:SEAT[]=[];
  for (let i = 1; i <= 84; i++) {
    seats.push({
      seat_id:i,
      room_id: 1,
      seat_num: i.toString(),
      seat_status: 'available',
      is_special: 0  // All seats are not special
    });
  }
  for(let i=1;i<=128;i++){
    seats.push({
      seat_id:84+i,
      room_id:2,
      seat_num: i.toString(),
      seat_status: 'available',
      is_special: 0
    })
  }
  return seats;
}
