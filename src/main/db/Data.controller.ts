import {
  connect,
  create_reservation,
  create_user,
  delete_user,
  initData,
  initTable,
  isSeatAvailable, updateSeatStatus,
  viewAllSeats
} from "./Data.repo";
import { formatDateForSQLite, initSeat, toConvertRowDtos } from "./Data.service";
import { READING_ROOM_DTO } from "../type/Dto.type";


export function init(){
  initTable();
  initData(initSeat());
}


export function viewReadingRoom(id:number):READING_ROOM_DTO{

  let seats = viewAllSeats(id);

  return {
    selectRoom: id,
    room: {
      totalSeats: seats.length,
      restSeats: 0,
      rows: toConvertRowDtos(seats, id)
    }
  }
}

export function createReservation(name: string, phone_number: string, seat_id: number) {
  const db = connect();
  const transaction = db.transaction(() => {

    let seatAvailable = isSeatAvailable(seat_id);
    if (!seatAvailable) {
      console.error("Seat is either invalid or already reserved.");
      throw new Error("Seat is either invalid or already reserved.");
    }
    let user_id = create_user(name, phone_number);

    let reservation_id = create_reservation(user_id, seat_id);

    updateSeatStatus(seat_id,"reserved")

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
  delete_user()
}
