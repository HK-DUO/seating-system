
const findConfigQuery:string="SELECT * FROM Config WHERE config_id = 1"
const updateReservationTimeQuery:string="UPDATE Config SET reservation_time = ? WHERE config_id = 1"
const updateExtendTimeQuery:string="UPDATE Config SET extend_time = ? WHERE config_id = 1"
const updateAskCheckoutTimeQuery:string="UPDATE Config SET ask_checkout_time = ? WHERE config_id = 1"
const updateAllQuery:string="UPDATE Config SET reservation_time = ?,extend_time = ?,ask_checkout_time = ? WHERE config_id = 1"
const updatePasswordQuery:string="UPDATE Config SET password = ? WHERE config_id = 1"
export const configQuery={
  find:findConfigQuery,
  update_reservation:updateReservationTimeQuery,
  update_extend:updateExtendTimeQuery,
  update_ask_checkout:updateAskCheckoutTimeQuery,
  update_password:updatePasswordQuery,
  update_all:updateAllQuery,

}
