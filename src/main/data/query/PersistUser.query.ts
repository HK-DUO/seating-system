

const createPersistUserQuery:string="insert into PersistUser(name,phone_number) values(?,?)"
const findPersistUserQuery:string="SELECT * FROM PersistUser WHERE persist_user_id = ?"
const ExistPersistUserQuery:string="SELECT EXISTS(SELECT persist_user_id FROM PersistUser WHERE name = ? AND phone_number = ?) as userExists"

export const persistUserQuery={
  create:createPersistUserQuery,
  find:findPersistUserQuery,
  exist:ExistPersistUserQuery
}
