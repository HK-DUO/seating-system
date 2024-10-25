import { connect } from "./Data.repo";
import { logQuery } from "../query/Log.query";
import { inquiryQuery } from "../query/Inquiry.query";
import { INQUIRY, LOG } from "../type/Entity.type";


const db =connect();

function create_inquiry(persist_user_id:number, title:string,content:string) {

  const stmt = db.prepare(inquiryQuery.create);
  const result = stmt.run(persist_user_id,title,content);

  return Number(result.lastInsertRowid);
}

function find_all_inquiry(){

  const stmt = db.prepare(logQuery.find_all);
  return stmt.all() as INQUIRY[]
}

export const inquiryRepo={
  create:create_inquiry,
  find_all:find_all_inquiry,
}
