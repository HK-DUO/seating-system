import bcrypt from "bcrypt";
import { SEAT } from "../type/Entity.type";
import { INIT_SEAT_DTO, ROW_DTO, SEAT_DTO } from "../type/Dto.type";


export function toConvertRowDtos(seats: SEAT[], id: number):ROW_DTO[]{
  let seatsPerRow:number = id==1 ? 11:8;

  const rowDtoArr:ROW_DTO[]=[];
  let seatDtoArr = toConvertSeatDtos(seats,id);
  for(let i=0;i<seats.length;i+=seatsPerRow){
    if(id==1&&Math.floor(i/seatsPerRow)+1==7){
      seatsPerRow-=2
    }
    const rowSeats=seatDtoArr.slice(i,i+seatsPerRow);
    rowDtoArr.push({
      row: id==1&&Math.floor(i/seatsPerRow)+1>7?Math.floor(i/seatsPerRow):Math.floor(i/seatsPerRow)+1,
      seats:rowSeats,
    })
  }
  return rowDtoArr;
}

function toConvertSeatDtos(seats:SEAT[],id:number):SEAT_DTO[]{
  let seatsPerRow:number = id==1 ? 11:8;
  const seat_dto: SEAT_DTO[]=[];
  for(const seat of seats){
    let tmp = seat.seat_num;
    if(id==1&&tmp>75){
      tmp+=2
    }
    seat_dto.push({
      id:seat.seat_id,
      num:seat.seat_num,
      line:tmp%seatsPerRow==0?seatsPerRow:tmp%seatsPerRow,
      state:seat.seat_status == 'available',
      disableSeats:seat.is_priority==1,
    })
  }
  return seat_dto;
}

export function initSeat(){
  const seats:INIT_SEAT_DTO[]=[];
  for (let i = 1; i <= 84; i++) {
    seats.push({
      // seat_id:i,
      room_id: 1,
      seat_num: i,
      seat_status: 'available',
      is_special: 0
    });
  }
  for(let i=1;i<=128;i++){
    seats.push({
      // seat_id:84+i,
      room_id:2,
      seat_num: i,
      seat_status: 'available',
      is_special: 0
    })
  }
  return seats;
}

export const hashingPW = async (password:string) => {
  const saltRounds = 10

  const salt = await bcrypt.genSalt(saltRounds)
  return await bcrypt.hash(password, salt);
}

export const checkingPW = async (resPassword:string,correctPassword:string) => {
  return await bcrypt.compare(resPassword, correctPassword);
}

