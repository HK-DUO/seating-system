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
import { persistUserRepo } from "../repo/PersistUser.repo";
import { logRepo } from "../repo/Log.repo";

//테이블,좌석 초기화
export function init(){
  init_table();
  init_data(initSeat());
}


//실시간 좌석보기 기능
export function viewReadingRoom(room_id:number):READING_ROOM_DTO{

  let seats = seatRepo.find_all(room_id);
  let available_count = reservationRepo.count(room_id)
  return {
    selectRoom: room_id,
    room: {
      totalSeats: seats.length,
      restSeats: available_count,
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


    if(!persistUserRepo.is_exist(name,phone_number)){
      persistUserRepo.create(name, phone_number);
    }

    let user_id = userRepo.create(name, phone_number);

    let reservation_id = reservationRepo.create(user_id, seat_id);

    seatRepo.update_status(seat_id,"reserved")

    //로그남기기
    logRepo.create(seat_id,persistUserRepo.find(name,phone_number),"reservation")

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

  //로그
  logRepo.create(seat_id, persistUserRepo.find(name,phone_number),"manual-checkOut")

  return result.changes>0;
}

//연장기능
export function extend(name:string,phone_number:string){

  let user = userRepo.find_user_id(name,phone_number);

  if(!user){
    return false;
  }
  let result = reservationRepo.update_end_time(user.user_id,'+1 hours');

  //로그
  logRepo.create(reservationRepo.find_seat_id_by_user_id(user.user_id), persistUserRepo.find(name,phone_number),"extend")

  return result.changes>0;
}

//퇴실요청 기능
export function askCheckOut(seat_id:number){

  let result = reservationRepo.ask_checkout(seat_id,"+2 minutes");

  let userId = reservationRepo.find_user_id(seat_id);
  let user = userRepo.find(userId);

  //로그
  //로그 여기에 당한 사람의 persistUserId가 아닌 한 사람의 아이디를 넣어야됨. 지금은 한사람은 입력하지 않으니까
  //만약 한사람 넣으면 요청할때 회원등록되도록 추가로직 필요
  logRepo.create(seat_id, persistUserRepo.find(user.name,user.phone_number),"ask-CheckOut")

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
      let user = userRepo.find(reservation.user_id);
      userRepo.delete(reservation.user_id);
      //로그
      logRepo.create(reservation.seat_id, persistUserRepo.find(user.name,user.phone_number),"auto-CheckOut")
    }

  })();

  console.log(`${expiredReservations.length}개 좌석이 자동퇴실되었습니다.`);
}
