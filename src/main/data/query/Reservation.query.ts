

const createReservationQuery:string="INSERT INTO Reservation (user_id, seat_id) VALUES (?, ?)"
const countReservationAboutRoomQuery:string = "SELECT COUNT(*) AS reserved_seat_count FROM Seat WHERE room_id = ? AND seat_status = 'reserved'"
const deleteReservationQuery:string="DELETE FROM Reservation WHERE user_id = ?"
const checkReservedSeatQuery:string="SELECT seat_id FROM Reservation where user_id=?"
const extendReservationEndQuery:string="UPDATE Reservation SET reservation_end= datetime(reservation_end, ? ) WHERE user_id=?";
const askCheckoutReservationQuery:string="UPDATE Reservation SET reservation_end= datetime('now','localtime', ?) WHERE seat_id=?"
const autoCheckoutReservationQuery:string="DELETE FROM Reservation WHERE reservation_end < datetime('now', 'localtime')"
const findExpiredReservationQuery:string="SELECT seat_id,user_id,reservation_id FROM Reservation WHERE reservation_end < datetime('now', 'localtime')"


export const reservationQuery={
  create:createReservationQuery,
  count:countReservationAboutRoomQuery,
  delete:deleteReservationQuery,
  checkSeat:checkReservedSeatQuery,
  extend:extendReservationEndQuery,
  askCheckout:askCheckoutReservationQuery,
  autoCheckout:autoCheckoutReservationQuery,
  expired:findExpiredReservationQuery
}
