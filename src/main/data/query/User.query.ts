

const createUserQuery:string="insert into USer(name,phone_number) values(?,?)"
const deleteAllUserQuery:string="DELETE FROM User"
const deleteUserQuery:string="DELETE FROM User WHERE user_id = ?"
const checkReservedUserQuery:string="SELECT user_id FROM User WHERE name = ? AND phone_number = ?"

export const userQuery={
  create:createUserQuery,
  deleteAll:deleteAllUserQuery,
  check:checkReservedUserQuery,
  delete:deleteUserQuery,
}
