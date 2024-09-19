
const createLogQuery:string="INSERT INTO Log (seat_id, persist_user_id, feature) VALUES (?, ?, ?)"
const findAllLogQuery:string="SELECT * FROM Log"
export const logQuery={
  create:createLogQuery,
  find_all:findAllLogQuery
}
