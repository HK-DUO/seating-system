
import { EXPIRED_RESERVATION_DTO, RESERVATION_COUNT_DTO, RESERVED_SEAT_DTO } from "../type/Dto.type";
import { connect } from "./Data.repo";
import { reservationQuery } from "../query/Reservation.query";
import { RESERVATION } from "../type/Entity.type";


const db = connect();

function create_reservation(user_id: number, seat_id: number,reservation_time:string) {

  const stmt = db.prepare(reservationQuery.create);
  const result = stmt.run(user_id, seat_id,reservation_time);

  return Number(result.lastInsertRowid);
}

function count_reservation(room_id:number){

  const stmt = db.prepare(reservationQuery.count);
  let result = stmt.get(room_id) as RESERVATION_COUNT_DTO | undefined;

  return result ? result.available_seat_count : 0;
}

function delete_reservation(user_id:number){

  const stmt = db.prepare(reservationQuery.delete);
  stmt.run(user_id);
}

function find_reserved_seat_id_by_user_id(user_id:number){

  const stmt = db.prepare(reservationQuery.checkSeat);
  let result = stmt.get(user_id) as RESERVED_SEAT_DTO;

  return result.seat_id;
}

function update_reservation_end(user_id:number,hours:string){

  const stmt = db.prepare(reservationQuery.extend);
  return stmt.run(hours,user_id)
}

function ask_checkout(seat_id:number,minutes:string){

  const stmt = db.prepare(reservationQuery.askCheckout);
  return stmt.run(minutes,seat_id)
}

function find_expired_reservations(){

  return db.prepare(reservationQuery.expired).all() as EXPIRED_RESERVATION_DTO[];
}

function find_user_id_by_seat_id(seat_id:number){

  const stmt = db.prepare(reservationQuery.find_user_id);
  const result= stmt.get(seat_id) as {user_id:number};
  return result.user_id;
}

function find_end_time(user_id:number){

  const stmt=db.prepare(reservationQuery.find_end_time);
  let result = stmt.get(user_id) as {reservation_end:string}
  return result.reservation_end;

}

function find_all_reservation() {

  const stmt = db.prepare(reservationQuery.find_all);
  return stmt.all() as RESERVATION[]
}

export const reservationRepo={
  delete: delete_reservation,
  create: create_reservation,
  count: count_reservation,
  find_seat_id_by_user_id: find_reserved_seat_id_by_user_id,
  update_end_time: update_reservation_end,
  ask_checkout: ask_checkout,
  find_expired:find_expired_reservations,
  find_user_id:find_user_id_by_seat_id,
  find_end_time:find_end_time,
  find_all:find_all_reservation,

}
