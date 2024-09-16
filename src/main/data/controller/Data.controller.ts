import {
  connect,
  init_data,
  init_table
} from "../repo/Data.repo";
import { initSeat, toConvertRowDtos } from "../service/Data.service";
import { READING_ROOM_DTO } from "../type/Dto.type";
import { seatRepo } from "../repo/Seat.repo";
import { reservationRepo } from "../repo/Reservation.repo";
import { userRepo } from "../repo/User.repo";

//테이블,좌석 초기화
export function init(){
  init_table();
  init_data(initSeat());
}


//실시간 좌석보기 기능
export function viewReadingRoom(room_id:number):READING_ROOM_DTO{

  let seats = seatRepo.find_all(room_id);
  let reservation_count = reservationRepo.count(room_id)
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

//예약기능
export function checkIn(name: string, phone_number: string, seat_id: number) {
  const db = connect();
  const transaction = db.transaction(() => {

    let seatAvailable = seatRepo.is_available(seat_id);
    if (!seatAvailable) {
      console.error("좌석이 이미 예약된 좌석입니다.");
      throw new Error("좌석이 이미 예약된 좌석입니다.");
    }
    let user_id = userRepo.create(name, phone_number);

    let reservation_id = reservationRepo.create(user_id, seat_id);

    seatRepo.update_status(seat_id,"reserved")

    return reservation_id;
  })

  try {
    return transaction();
  } catch (error) {
    console.error("예약 과정중 오류", error);
    return null;
  }
}

export function deleteAllUser(){
  userRepo.delete_all()
}

//수동 퇴실기능
export function checkOut(name:string,phone_number:string){

  let user = userRepo.find_user_id(name,phone_number);

  if(!user){
    return false;
  }

  let seat_id = reservationRepo.find_seat_id_by_user_id(user.user_id);

  reservationRepo.delete(user.user_id);
  let result = userRepo.delete(user.user_id);

  seatRepo.update_status(seat_id,"available")
  return result.changes>0;
}

//연장기능
export function extend(name:string,phone_number:string){
  let user = userRepo.find_user_id(name,phone_number);
  if(!user){
    return false;
  }
  let result = reservationRepo.update_end_time(user.user_id,'+1 hours');

  return result.changes>0;
}

//퇴실요청 기능
export function askCheckOut(seat_id:number){
  let result = reservationRepo.ask_checkout(seat_id,"+2 minutes");
  return result.changes>0;
}


//자동 퇴실기능
export function autoCheckOut(): void {
  const db = connect();

  const expiredReservations = reservationRepo.find_expired();


  db.transaction(() => {

    for (const reservation of expiredReservations) {
      seatRepo.update_status(reservation.seat_id,"available")
      reservationRepo.delete(reservation.user_id)
      userRepo.delete(reservation.user_id);
    }

  })();
  //유저도 삭제하기
  console.log(`${expiredReservations.length}개 좌석이 자동퇴실되었습니다.`);
}
