import Database from "better-sqlite3";
import path from "path";
import { createTableQuery, initDataQuery, resetDataQuery } from "../query/Init.query";
import { INIT_SEAT_DTO } from "../type/Dto.type";
import { hashingPW } from "../service/Data.service";
import { app } from "electron";


export function connect() {
  // return Database(
  //   path.join(__dirname, '../../../../', 'release/app', 'database.db'),
  //   { verbose: console.log, fileMustExist: true },
  // );
  return Database(
    path.join(app.getAppPath(), '../', 'database.db'),
    { verbose: console.log, fileMustExist: true },
  );
}



export async function init_data(seats:INIT_SEAT_DTO[]){

  const db = connect();

  db.exec(initDataQuery.reading_room_1);
  db.exec(initDataQuery.reading_room_2);
  db.exec(initDataQuery.admin)

  let stmt1 = db.prepare(initDataQuery.config);
  stmt1.run(await hashingPW("admin"))

  let stmt2 = db.prepare(initDataQuery.seat);

  let insertInitData = db.transaction((seats) => {
    for (const seat of seats) {
      stmt2.run(seat.seat_id, seat.room_id, seat.seat_num, seat.seat_status, seat.is_special);
    }
  });

  insertInitData(seats);
}


type seat_info={
  room_id:number,seat_num:number
}
const prioritySeats:seat_info[]=[
  {room_id:1, seat_num:56},
  {room_id:1, seat_num:57},
  {room_id:2, seat_num:126},
  {room_id:2, seat_num:127},
  {room_id:2, seat_num:128},
]

export function update_priority(){
  const db = connect();
  let stmt=db.prepare(initDataQuery.priority)
  //노약자석 업데이트
  for(const seat of prioritySeats){
    stmt.run(seat.room_id,seat.seat_num);
  }
}

export function init_table() {

  const db = connect();

  db.exec(createTableQuery.reservation);
  db.exec(createTableQuery.seat);
  db.exec(createTableQuery.user);
  db.exec(createTableQuery.reading_room);
  db.exec(createTableQuery.persist_user);
  db.exec(createTableQuery.log)
  db.exec(createTableQuery.config)
}

export function deleteData(){
  const db = connect();

  db.exec(resetDataQuery.delete_reservation);
  db.exec(resetDataQuery.reset_reservation_sequence);
  db.exec(resetDataQuery.delete_user);
  db.exec(resetDataQuery.reset_user_sequence);
}

export function resetSeat(){
  const db = connect();
  db.exec(resetDataQuery.reset_seat_data);
}




























