import { SEAT } from "../type/Entity.type";
import { connect } from "./Data.repo";
import { SEAT_STATUS_DTO } from "../type/Dto.type";
import { seatQuery } from "../query/Seat.query";


const db=connect();

function find_all_seats(id:number):SEAT[]{

  try{
    const stmt=db.prepare(seatQuery.findAll);
    return stmt.all({id})as SEAT[];
  }catch(error){
    console.error('Error fetching seat data:', error);
    return [];
  }
}

function is_seat_available(seat_id: number): boolean {

  const stmt = db.prepare(seatQuery.isAvailable);
  const seat = stmt.get(seat_id) as SEAT_STATUS_DTO|undefined;

  return seat !==undefined && seat.seat_status=== 'available';
}

function update_seat_status(seat_id:number,seat_status:string){

  const stmt = db.prepare(seatQuery.updateStatus)
  stmt.run(seat_status,seat_id);
}

function update_ask_checkout_flag(seat_id:number,ask_checkout_flag:number){

  const stmt = db.prepare(seatQuery.updateAskCheckoutFlag);
  stmt.run(ask_checkout_flag,seat_id);
}

function find_seat(seat_id:number){

  const stmt=db.prepare(seatQuery.find);
  return stmt.get(seat_id) as SEAT;
}
export const seatRepo={
  find:find_seat,
  find_all:find_all_seats,
  is_available:is_seat_available,
  update_status:update_seat_status,
  update_ask_checkout_flag:update_ask_checkout_flag,
}
