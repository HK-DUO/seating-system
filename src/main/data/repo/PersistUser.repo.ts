import { connect } from "./Data.repo";
import { persistUserQuery } from "../query/PersistUser.query";
import { PERSIST_USER_EXIST_DTO } from "../type/Dto.type";
import { PERSIST_USER } from "../type/Entity.type";


const db=connect();

function is_exist(name:string,phone_number:string){

  const stmt = db.prepare(persistUserQuery.exist);
  let result = stmt.get(name, phone_number) as PERSIST_USER_EXIST_DTO

  return result.userExists===1;
}

function find_persist_user(user_id:number){

  const stmt = db.prepare(persistUserQuery.find);
  return stmt.get(user_id) as PERSIST_USER
}

function find_persist_user_id(name:string,phone_number:string){


  const stmt = db.prepare(persistUserQuery.find_id);
  let result = stmt.get(name, phone_number) as { persist_user_id:number }

  return result.persist_user_id;
}
function create_persist_user(name:string,phone_number:string){

  const stmt = db.prepare(persistUserQuery.create);
  let result = stmt.run(name, phone_number);
  return Number(result.lastInsertRowid);
}

export const persistUserRepo={
  is_exist:is_exist,
  create:create_persist_user,
  find:find_persist_user,
  find_id:find_persist_user_id
}
