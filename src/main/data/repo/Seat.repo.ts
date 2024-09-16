import { SEAT } from "../type/Entity.type";
import { connect } from "./Data.repo";
import { SEAT_STATUS_DTO } from "../type/Dto.type";
import { seatQuery } from "../query/Seat.query";


function find_all_seats(id:number):SEAT[]{
  const db=connect();
  try{
    const stmt=db.prepare(seatQuery.findAll);
    return stmt.all({id})as SEAT[];
  }catch(error){
    console.error('Error fetching seat data:', error);
    return [];
  }
}

function is_seat_available(seat_id: number): boolean {
  const db = connect();

  const stmt = db.prepare(seatQuery.isAvailable);

  const seat = stmt.get(seat_id) as SEAT_STATUS_DTO|undefined;
  console.log(seat)
  // Check if seat exists and is available
  return seat !==undefined && seat.seat_status=== 'available';
}

function update_seat_status(seat_id:number,seat_status:string){
  const db = connect();

  const stmt = db.prepare(seatQuery.updateStatus)

  stmt.run(seat_status,seat_id);
}

export const seatRepo={
  find_all:find_all_seats,
  is_available:is_seat_available,
  update_status:update_seat_status,
}