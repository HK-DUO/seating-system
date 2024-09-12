import Database from "better-sqlite3";
import path from "path";
import { createTableQuery, initDataQuery, viewQuery } from "./Data.query";
import { SEAT } from "../type/tableType";


export function connect() {
  return Database(
    path.join(__dirname, '../../../', 'release/app', 'database.db'),
    { verbose: console.log, fileMustExist: true },
  );
}


export function initData(seats:SEAT[]){
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
const stm=db.prepare(viewQuery.reading_room);
return stm.all({id})as SEAT[];
}



