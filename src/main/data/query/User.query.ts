

const createUserQuery:string="insert into User(name,phone_number) values(?,?)"
const deleteAllUserQuery:string="DELETE FROM User"
const deleteUserQuery:string="DELETE FROM User WHERE user_id = ?"
const checkReservedUserQuery:string="SELECT user_id FROM User WHERE name = ? AND phone_number = ?"
const ExistUserQuery:string="SELECT EXISTS(SELECT user_id FROM User WHERE phone_number = ?) as userExists"

export const userQuery={
  create:createUserQuery,
  deleteAll:deleteAllUserQuery,
  check:checkReservedUserQuery,
  delete:deleteUserQuery,
  exist:ExistUserQuery,
}
