

const isSeatAvailableQuery:string="SELECT seat_status FROM Seat WHERE seat_id = ?"
const updateSeatStatusQuery:string="UPDATE Seat SET seat_status = ? WHERE seat_id = ?"
const updateAskCheckoutFlagQuery:string="UPDATE Seat SET ask_checkout_flag = ? WHERE seat_id = ?"

const findSeatQuery:string="SELECT * from Seat where seat_id=?"
const findAllSeatByRoomId:string="SELECT * FROM Seat where room_id = @id"

export const seatQuery={
  find:findSeatQuery,
  findAll:findAllSeatByRoomId,
  isAvailable:isSeatAvailableQuery,
  updateStatus:updateSeatStatusQuery,
  updateAskCheckoutFlag:updateAskCheckoutFlagQuery,
}
