import {
  connect,
  init_data,
  init_table
} from "../repo/Data.repo";
import { initSeat, toConvertRowDtos } from "../service/Data.service";
import { FeatureTranslations, LOG_DTO, READING_ROOM_DTO } from "../type/Dto.type";
import { seatRepo } from "../repo/Seat.repo";
import { reservationRepo } from "../repo/Reservation.repo";
import { userRepo } from "../repo/User.repo";
import { persistUserRepo } from "../repo/PersistUser.repo";
import { logRepo } from "../repo/Log.repo";
import { configRepo } from "../repo/Config.repo";

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
    logRepo.create(seat_id,persistUserRepo.find_id(name,phone_number),"reservation")

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

  if(seatRepo.find(seat_id).ask_checkout_flag){
    seatRepo.update_ask_checkout_flag(seat_id,0);
  }

  reservationRepo.delete(user.user_id);
  let result = userRepo.delete(user.user_id);

  seatRepo.update_status(seat_id,"available")

  //로그
  logRepo.create(seat_id, persistUserRepo.find_id(name,phone_number),"manual-checkOut")

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
  logRepo.create(reservationRepo.find_seat_id_by_user_id(user.user_id), persistUserRepo.find_id(name,phone_number),"extend")

  return result.changes>0;
}

//퇴실요청 기능
export function askCheckOut(seat_id:number,name:string,phone_number:string){

  //이미 퇴실요청중일때
  if(seatRepo.find(seat_id).ask_checkout_flag){
    console.log("이미 퇴실요청이 들어온 좌석입니다.")
    return false;
  }

  let result = reservationRepo.ask_checkout(seat_id,"+2 minutes");
  seatRepo.update_ask_checkout_flag(seat_id,1);
  if(!persistUserRepo.is_exist(name,phone_number)){
    persistUserRepo.create(name, phone_number);
  }
  let persist_user_id = persistUserRepo.find_id(name,phone_number);
  logRepo.create(seat_id, persist_user_id,"ask-CheckOut")

  return result.changes>0;
}


//자동 퇴실기능
export function autoCheckOut(): void {

  const db = connect();

  const expiredReservations = reservationRepo.find_expired();

  db.transaction(() => {

    for (const reservation of expiredReservations) {

      if(seatRepo.find(reservation.seat_id).ask_checkout_flag){
        seatRepo.update_ask_checkout_flag(reservation.seat_id,0)

      }
      seatRepo.update_status(reservation.seat_id,"available")
      reservationRepo.delete(reservation.user_id)
      let user = userRepo.find(reservation.user_id);
      userRepo.delete(reservation.user_id);
      //로그
      logRepo.create(reservation.seat_id, persistUserRepo.find_id(user.name,user.phone_number),"auto-CheckOut")
    }

  })();

  console.log(`${expiredReservations.length}개 좌석이 자동퇴실되었습니다.`);
}

//로그 조회
export function viewAllLog(){
  const logs = logRepo.find_all();
  let log_dtos:LOG_DTO[]=[]
  for(const log of logs){

    let seat = seatRepo.find(log.seat_id);
    let user=persistUserRepo.find(log.persist_user_id)
    log_dtos.push({
      id:log.log_id,
      room:seat.room_id,
      seat:seat.seat_num,
      function:FeatureTranslations[log.feature as keyof typeof FeatureTranslations] || log.feature,
      timestamp:log.created_at,
      nickname:user.name,
      phoneNumber:user.phone_number,
    })
  }
  return log_dtos;
}

export function viewConfig(){
  return configRepo.find();
}

export function updateConfig(reservation_time:number,extend_time:number,ask_checkout_time:number){
  return configRepo.update_all(reservation_time,extend_time,ask_checkout_time);
}
