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
  find_all_seats
} from "./Data.repo";
import { formatDateForSQLite, initSeat, toConvertRowDtos } from "./Data.service";
import { READING_ROOM_DTO } from "../type/Dto.type";


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
  console.log("here")
  if(!user){
    return false;
  }
  console.log(user.user_id)
  let seat_id = find_reserved_seat_id_by_user_id(user.user_id);
  console.log("hello")
  delete_reservation(user.user_id);
  let result = delete_user(user.user_id);

  update_seat_status(seat_id,"available")
  // 예약도 삭제하기
  return result.changes>0;

}

