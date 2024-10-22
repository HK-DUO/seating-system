import { connect } from "./Data.repo";
import { logQuery } from "../query/Log.query";
import { LOG } from "../type/Entity.type";




const db =connect();

function create_log(seat_id:number, persist_user_id:number, feature:string) {

  const stmt = db.prepare(logQuery.create);
  const result = stmt.run(seat_id, persist_user_id,feature);

  return Number(result.lastInsertRowid);
}



function find_all_log(){

  const stmt = db.prepare(logQuery.find_all);
  return stmt.all() as LOG[]
}

export const logRepo={
  create:create_log,
  find_all:find_all_log,
}


