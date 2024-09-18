import { connect } from "./Data.repo";
import { logQuery } from "../query/Log.query";


function create_log(seat_id:number, persist_user_id:number, feature:string) {

  const db = connect();

  const stmt = db.prepare(logQuery.create);
  const result = stmt.run(seat_id, persist_user_id,feature);

  return Number(result.lastInsertRowid);
}
export const logRepo={
  create:create_log,
}
//유저아이디 찾고
//좌석찾고
//특징넣기
