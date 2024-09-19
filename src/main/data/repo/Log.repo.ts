import { connect } from "./Data.repo";
import { logQuery } from "../query/Log.query";
import { reservationQuery } from "../query/Reservation.query";
import { LOG } from "../type/Entity.type";


function create_log(seat_id:number, persist_user_id:number, feature:string) {

  const db = connect();

  const stmt = db.prepare(logQuery.create);
  const result = stmt.run(seat_id, persist_user_id,feature);

  return Number(result.lastInsertRowid);
}



function find_all_log(){
  const db = connect();
  const stmt = db.prepare(logQuery.find_all);
  return stmt.all() as LOG[]
}

export const logRepo={
  create:create_log,
  find_all:find_all_log,
}


