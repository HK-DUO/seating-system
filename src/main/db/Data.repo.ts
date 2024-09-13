import Database from "better-sqlite3";
import path from "path";
import { createTableQuery, initDataQuery, reservationQuery, seatQuery, userQuery, viewQuery } from "./Data.query";
import { SEAT } from "../type/Entity.type";
import { INIT_SEAT_DTO, RESERVATION_COUNT_DTO, SEAT_STATUS_DTO } from "../type/Dto.type";
import { formatDateForSQLite } from "./Data.service";


export function connect() {
  return Database(
    path.join(__dirname, '../../../', 'release/app', 'database.db'),
    { verbose: console.log, fileMustExist: true },
  );
}


export function init_data(seats:INIT_SEAT_DTO[]){
  const db = connect();
  db.exec(initDataQuery.reading_room_1);
  db.exec(initDataQuery.reading_room_2);
  let stmt = db.prepare(initDataQuery.seat);
  let insertInitData = db.transaction((seats) => {
    for (const seat of seats) {
      stmt.run(seat.seat_id, seat.room_id, seat.seat_num, seat.seat_status, seat.is_special);
    }
  });
  insertInitData(seats);
}

export function init_table() {

  const db = connect();

  db.exec(createTableQuery.reservation);
  db.exec(createTableQuery.seat);
  db.exec(createTableQuery.user);
  db.exec(createTableQuery.reading_room);
}

export function view_all_seats(id:number):SEAT[]{
const db=connect();
  try{
    const stmt=db.prepare(viewQuery.reading_room);
    return stmt.all({id})as SEAT[];
  }catch(error){
    console.error('Error fetching seat data:', error);
    return [];
  }
}

export function create_user(name:string,phone_number:string){
  const db=connect();
  const stmt = db.prepare(userQuery.create);
  let runResult = stmt.run(name, phone_number);
  return Number(runResult.lastInsertRowid);
}

export function delete_all_user(){
  const db=connect();
  db.exec(userQuery.deleteAll)
}

export function create_reservation(user_id: number, seat_id: number) {
  const db = connect();

  const insertReservationStmt = db.prepare(reservationQuery.create);

  const info = insertReservationStmt.run(user_id, seat_id);

  // Return the reservation_id (auto-generated)
  return Number(info.lastInsertRowid);
}

export function is_seat_available(seat_id: number): boolean {
  const db = connect();

  const stmt = db.prepare(seatQuery.isAvailable);

  const seat = stmt.get(seat_id) as SEAT_STATUS_DTO|undefined;
  console.log(seat)
  // Check if seat exists and is available
  return seat !==undefined && seat.seat_status=== 'available';
}

export function update_seat_status(seat_id:number,seat_status:string){
  const db = connect();

  const stmt = db.prepare(seatQuery.updateStatus)

  stmt.run(seat_status,seat_id);
}

export function count_reservation(room_id:number){

  const db = connect();
  const stmt = db.prepare(reservationQuery.count);

  let result = stmt.get(room_id) as RESERVATION_COUNT_DTO | undefined;

  return result ? result.reserved_seat_count : 0;
}

type USER_ID_DTO={
  user_id:number,
}

export function check_reserved_user(name:string,phone_number:string){
  const db = connect();
  const stmt=db.prepare(userQuery.check);


  let newVar = stmt.get(name,phone_number) as USER_ID_DTO ;
  console.log(newVar?.user_id)
  return stmt.get(name,phone_number) as USER_ID_DTO | undefined;

}

export function delete_user(user_id:number){
  const db = connect();
  const stmt = db.prepare(userQuery.delete);
  let result = stmt.run(user_id);

  return result;
}

export function delete_reservation(user_id:number){
  const db = connect();
  const stmt = db.prepare(reservationQuery.delete);
  let result = stmt.run(user_id);
}

type RESERVED_SEAT_DTO={
  seat_id:number,
}

export function check_reserved_seat(user_id:number){
  const db = connect();
  const stmt = db.prepare(reservationQuery.checkSeat);
  let result = stmt.get(user_id) as RESERVED_SEAT_DTO;
  return result.seat_id;
}
