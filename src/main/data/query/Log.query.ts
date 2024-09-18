
const createLogQuery:string="INSERT INTO Log (seat_id, persist_user_id, feature) VALUES (?, ?, ?)"

export const logQuery={
  create:createLogQuery
}
