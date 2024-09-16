

const createPersistUserQuery:string="insert into PersistUser(name,phone_number) values(?,?)"
const findPersistUserQuery:string="SELECT persist_user_id FROM PersistUser WHERE name = ? AND phone_number = ?"

export const persistUserQuery={
  create:createPersistUserQuery,
  find:findPersistUserQuery
}
