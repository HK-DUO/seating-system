import { initData, initTable, viewAllSeats } from "./Data.repo";
import { initSeat, toConvertRowDtos } from "./Data.service";
import { READING_ROOM_DTO } from "../type/dtoType";


export function init(){
  initTable();
  initData(initSeat());
}


export function viewReadingRoom(id:number):READING_ROOM_DTO{

  let seats = viewAllSeats(id);

  return {
    selectRoom: id,
    room: {
      totalSeats: seats.length,
      restSeats: 0,
      rows: toConvertRowDtos(seats, id)
    }
  }
}
