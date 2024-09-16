import { connect } from "./Data.repo";
import { userQuery } from "../query/User.query";
import { persistUserQuery } from "../query/PersistUser.query";


function is_exist(name:string,phone_number:string){

  const db=connect();

  const stmt = db.prepare(persistUserQuery.find);
  let result = stmt.run(name, phone_number);

  return result.changes>0
}

function create_persist_user(name:string,phone_number:string){

  const db=connect();

  const stmt = db.prepare(persistUserQuery.create);
  let result = stmt.run(name, phone_number);
  return Number(result.lastInsertRowid);
}

export const persistUserRepo={
  is_exist:is_exist,
  create:create_persist_user,
}
