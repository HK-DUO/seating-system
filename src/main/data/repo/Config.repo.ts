import { connect } from "./Data.repo";
import { Config } from "../type/Entity.type";
import { configQuery } from "../query/Config.query";
import { hashingPW } from "../service/Data.service";

const db =connect();

function find_config(){

  const stmt=db.prepare(configQuery.find);
  return stmt.get() as Config;
}


function update_all(reservation_time:number,extend_time:number,ask_checkout_time:number){

  const stmt = db.prepare(configQuery.update_all);
  return stmt.run(reservation_time,extend_time,ask_checkout_time);
}

async function update_password(password:string){

  const stmt = db.prepare(configQuery.update_password);
  let hashedPassword = await hashingPW(password);
  return stmt.run(hashedPassword);
}

function update_reservation_time(hours:number){

  const stmt = db.prepare(configQuery.update_reservation);
  stmt.run(hours);
}

function update_extend_time(hours:number){

  const stmt = db.prepare(configQuery.update_extend);
  stmt.run(hours);
}

function update_ask_checkout_time(minutes:number){

  const stmt = db.prepare(configQuery.update_ask_checkout);
  stmt.run(minutes);
}

export const configRepo={
  find:find_config,
  update_reservation:update_reservation_time,
  update_extend:update_extend_time,
  update_ask_checkout:update_ask_checkout_time,
  update_password:update_password,
  update_all:update_all,

}
