import Database from "better-sqlite3";
import path from "path";
import { createTableQuery, initDataQuery, reservationQuery, seatQuery, userQuery, viewQuery } from "./Data.query";
import { SEAT } from "../type/Entity.type";
import { INIT_SEAT_DTO, SEAT_STATUS_DTO } from "../type/Dto.type";
import { formatDateForSQLite } from "./Data.service";


export function connect() {
  return Database(
    path.join(__dirname, '../../../', 'release/app', 'database.db'),
    { verbose: console.log, fileMustExist: true },
  );
}


export function initData(seats:INIT_SEAT_DTO[]){
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

export function initTable() {

  const db = connect();

  db.exec(createTableQuery.reservation);
  db.exec(createTableQuery.seat);
  db.exec(createTableQuery.user);
  db.exec(createTableQuery.reading_room);
}

export function viewAllSeats(id:number):SEAT[]{
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

export function delete_user(){
  const db=connect();
  db.exec(userQuery.delete)
}

export function create_reservation(user_id: number, seat_id: number) {
  const db = connect();

  const insertReservationStmt = db.prepare(reservationQuery.create);

  let now = new Date();
  let start = formatDateForSQLite(now);
  let end = formatDateForSQLite(new Date(now.getTime() + 2 * 60 * 60 * 1000));

  const info = insertReservationStmt.run(user_id, seat_id, start, end);

  // Return the reservation_id (auto-generated)
  return Number(info.lastInsertRowid);
}

export function isSeatAvailable(seat_id: number): boolean {
  const db = connect();

  const stmt = db.prepare(seatQuery.isAvailable);

  const seat = stmt.get(seat_id) as SEAT_STATUS_DTO|undefined;
  console.log(seat)
  // Check if seat exists and is available
  return seat !==undefined && seat.seat_status=== 'available';
}

export function updateSeatStatus(seat_id:number,seat_status:string){
  const db = connect();

  const stmt = db.prepare(seatQuery.updateStatus)

  stmt.run(seat_status,seat_id);
}


