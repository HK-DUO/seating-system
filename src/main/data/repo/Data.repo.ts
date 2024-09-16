import Database from "better-sqlite3";
import path from "path";
import { createTableQuery, initDataQuery } from "../query/Init.query";
import { INIT_SEAT_DTO } from "../type/Dto.type";


export function connect() {
  return Database(
    path.join(__dirname, '../../../../', 'release/app', 'database.db'),
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





























