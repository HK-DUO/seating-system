import { connect } from "./Data.repo";
import { seatQuery } from "../query/Seat.query";
import { Config, SEAT } from "../type/Entity.type";
import { configQuery } from "../query/Config.query";
import { persistUserQuery } from "../query/PersistUser.query";


function find_config(){
  const db = connect();

  const stmt=db.prepare(configQuery.find);
  let result = stmt.get() as Config;
  console.log(result);
  return result;
}

function update_all(reservation_time:number,extend_time:number,ask_checkout_time:number){
  const db = connect();
  const stmt = db.prepare(configQuery.update_all);
  stmt.run(reservation_time,extend_time,ask_checkout_time);
}

function update_reservation_time(hours:number){
  const db=connect();
  const stmt = db.prepare(configQuery.update_reservation);

  stmt.run(hours);
}

function update_extend_time(hours:number){
  const db=connect();
  const stmt = db.prepare(configQuery.update_extend);

  stmt.run(hours);
}

function update_ask_checkout_time(minutes:number){
  const db=connect();
  const stmt = db.prepare(configQuery.update_ask_checkout);

  stmt.run(minutes);
}

export const configRepo={
  find:find_config,
  update_reservation:update_reservation_time,
  update_extend:update_extend_time,
  update_ask_checkout:update_ask_checkout_time,
  update_all:update_all,

}
