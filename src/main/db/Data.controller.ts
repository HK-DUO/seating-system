import {
  find_reserved_seat_id_by_user_id,
  find_user_id,
  connect, count_reservation,
  create_reservation,
  create_user,
  delete_all_user, delete_reservation, delete_user,
  init_data,
  init_table,
  is_seat_available, update_seat_status,
  find_all_seats, update_reservation_end, ask_checkout, auto_checkout
} from "./Data.repo";
import { formatDateForSQLite, initSeat, toConvertRowDtos } from "./Data.service";
import { READING_ROOM_DTO } from "../type/Dto.type";
import { RESERVATION } from "../type/Entity.type";


export function init(){
  init_table();
  init_data(initSeat());
}


export function viewReadingRoom(room_id:number):READING_ROOM_DTO{

  let seats = find_all_seats(room_id);
  let reservation_count = count_reservation(room_id)
  let restSeats= room_id==1 ? 84-reservation_count : 128-reservation_count;
  return {
    selectRoom: room_id,
    room: {
      totalSeats: seats.length,
      restSeats: restSeats,
      rows: toConvertRowDtos(seats, room_id)
    }
  }
}

export function checkIn(name: string, phone_number: string, seat_id: number) {
  const db = connect();
  const transaction = db.transaction(() => {

    let seatAvailable = is_seat_available(seat_id);
    if (!seatAvailable) {
      console.error("Seat is either invalid or already reserved.");
      throw new Error("Seat is either invalid or already reserved.");
    }
    let user_id = create_user(name, phone_number);

    let reservation_id = create_reservation(user_id, seat_id);

    update_seat_status(seat_id,"reserved")

    return reservation_id;
  })

  try {
    // Run the transaction and return the reservation ID
    return transaction();
  } catch (error) {
    console.error("Error during reservation process:", error);
    return null;  // Return null if there was an error (no reservation created)
  }
}

export function deleteAllUser(){
  delete_all_user()
}

export function checkOut(name:string,phone_number:string){

  let user = find_user_id(name,phone_number);

  if(!user){
    return false;
  }

  let seat_id = find_reserved_seat_id_by_user_id(user.user_id);

  delete_reservation(user.user_id);
  let result = delete_user(user.user_id);

  update_seat_status(seat_id,"available")
  // 예약도 삭제하기
  return result.changes>0;
}

//연장시 이름과 전화번호로 user_id 찾아낸후에 시간 늘리기
export function extend(name:string,phone_number:string){
  let user = find_user_id(name,phone_number);
  if(!user){
    return false;
  }
  let result = update_reservation_end(user.user_id,'+1 hours');

  return result.changes>0;
}

export function askCheckOut(seat_id:number){
  let result = ask_checkout(seat_id,"+2 minutes");
  return result.changes>0;
}

export function autoCheckout(){
  let result = auto_checkout();

  if(result.changes>0){
    console.log("자동 퇴실 함수에 의해 예약이 하나 삭제되었습니다.")

  }
}

export function handleExpiredReservations(): void {
  const db = connect();

  // Step 1: Find all expired reservations
  const expiredReservations = db.prepare(`
    SELECT seat_id FROM Reservation
    WHERE reservation_end < datetime('now', 'localtime')
  `).all() as RESERVATION[]

  // Step 2: Update the seat status to 'available' for each expired reservation
  const updateSeatStatus = db.prepare(`
    UPDATE Seat
    SET seat_status = 'available'
    WHERE seat_id = ?
  `);

  db.transaction(() => {

    for (const reservation of expiredReservations) {
      // Update the seat status for each seat tied to an expired reservation
      updateSeatStatus.run(reservation.seat_id);

      // delete_user(reservation.user_id)
    }

    // Step 3: Delete the expired reservations
    db.prepare(`
      DELETE FROM Reservation
      WHERE reservation_end < datetime('now', 'localtime')
    `).run();
  })();
  //유저도 삭제하기

  console.log(`${expiredReservations.length} reservations expired and seats freed.`);
}
