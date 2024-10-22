import { connect } from "./Data.repo";
import { USER_EXIST_DTO, USER_ID_DTO } from "../type/Dto.type";
import { userQuery } from "../query/User.query";
import { USER } from "../type/Entity.type";



const db=connect();

function create_user(name:string,phone_number:string){

  const stmt = db.prepare(userQuery.create);
  let result = stmt.run(name, phone_number);

  return Number(result.lastInsertRowid);
}

function delete_all_user(){

  db.exec(userQuery.deleteAll)
}

function find_user_id(name:string,phone_number:string){

  const stmt=db.prepare(userQuery.check);

  return stmt.get(name,phone_number) as USER_ID_DTO | undefined;
}

function delete_user(user_id:number){

  const stmt = db.prepare(userQuery.delete);
  return stmt.run(user_id);
}

function find_user(user_id:number){

  const stmt = db.prepare("select * from user where user_id=?");
  return stmt.get(user_id) as USER;
}
function is_exist(phone_number:string){

  const stmt = db.prepare(userQuery.exist);
  let result = stmt.get(phone_number) as USER_EXIST_DTO

  return result.userExists===1;
}
export const userRepo={
  create:create_user,
  delete:delete_user,
  delete_all:delete_all_user,
  find_user_id:find_user_id,
  find:find_user,
  is_exist:is_exist,
}
