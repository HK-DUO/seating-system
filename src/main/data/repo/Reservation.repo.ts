
import { EXPIRED_RESERVATION_DTO, RESERVATION_COUNT_DTO, RESERVED_SEAT_DTO } from "../type/Dto.type";
import { connect } from "./Data.repo";
import { reservationQuery } from "../query/Reservation.query";


function create_reservation(user_id: number, seat_id: number) {
  const db = connect();

  const insertReservationStmt = db.prepare(reservationQuery.create);

  const info = insertReservationStmt.run(user_id, seat_id);

  return Number(info.lastInsertRowid);
}

function count_reservation(room_id:number){

  const db = connect();
  const stmt = db.prepare(reservationQuery.count);

  let result = stmt.get(room_id) as RESERVATION_COUNT_DTO | undefined;

  return result ? result.reserved_seat_count : 0;
}

function delete_reservation(user_id:number){
  const db = connect();
  const stmt = db.prepare(reservationQuery.delete);
  stmt.run(user_id);
}

function find_reserved_seat_id_by_user_id(user_id:number){
  const db = connect();
  const stmt = db.prepare(reservationQuery.checkSeat);
  let result = stmt.get(user_id) as RESERVED_SEAT_DTO;
  return result.seat_id;
}

function update_reservation_end(user_id:number,hours:string){
  const db = connect();
  const stmt = db.prepare(reservationQuery.extend);
  return stmt.run(hours,user_id)
}

function ask_checkout(seat_id:number,minutes:string){
  const db = connect();
  const stmt = db.prepare(reservationQuery.askCheckout);
  return stmt.run(minutes,seat_id)
}

function find_expired_reservations(){
  const db = connect();
  return db.prepare(reservationQuery.expired).all() as EXPIRED_RESERVATION_DTO[];
}

export const reservationRepo={
  delete: delete_reservation,
  create: create_reservation,
  count: count_reservation,
  find_seat_id_by_user_id: find_reserved_seat_id_by_user_id,
  update_end_time: update_reservation_end,
  ask_checkout: ask_checkout,
  find_expired:find_expired_reservations,

}
