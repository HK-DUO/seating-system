
import { connect } from "./Data.repo";
import { USER_ID_DTO } from "../type/Dto.type";
import { userQuery } from "../query/User.query";


function create_user(name:string,phone_number:string){

  const db=connect();

  const stmt = db.prepare(userQuery.create);
  let result = stmt.run(name, phone_number);

  return Number(result.lastInsertRowid);
}

function delete_all_user(){

  const db=connect();

  db.exec(userQuery.deleteAll)
}

function find_user_id(name:string,phone_number:string){

  const db = connect();

  const stmt=db.prepare(userQuery.check);

  return stmt.get(name,phone_number) as USER_ID_DTO | undefined;
}

function delete_user(user_id:number){

  const db = connect();

  const stmt = db.prepare(userQuery.delete);
  return stmt.run(user_id);
}

export const userRepo={
  create:create_user,
  delete:delete_user,
  delete_all:delete_all_user,
  find_user_id:find_user_id,
}
