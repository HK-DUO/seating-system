import {
  connect, deleteData,
  init_data,
  init_table, resetSeat, update_priority
} from "../repo/Data.repo";
import { checkingPW, initSeat, toConvertRowDtos } from "../service/Data.service";
import { FeatureTranslations, LOG_DTO, READING_ROOM_DTO, USER_ID_DTO } from "../type/Dto.type";
import { seatRepo } from "../repo/Seat.repo";
import { reservationRepo } from "../repo/Reservation.repo";
import { userRepo } from "../repo/User.repo";
import { persistUserRepo } from "../repo/PersistUser.repo";
import { logRepo } from "../repo/Log.repo";
import { configRepo } from "../repo/Config.repo";
import { ResponseEntity } from "../class/Response.class";
import { inquiryQuery } from "../query/Inquiry.query";
import { inquiryRepo } from "../repo/Inquiry.repo";

//테이블,좌석 초기화
export function init(){

  init_table();
  init_data(initSeat()).then(()=>update_priority());
  return new ResponseEntity("초기화 성공",200)
}

//데이터 리셋
export function reset(){
  deleteData();
  resetSeat();
  update_priority();
  configRepo.update_all(2,1,30)
  configRepo.update_password("admin")
  logRepo.create(1, persistUserRepo.find_id("admin","000-0000-0000"),"data-reset")

  return new ResponseEntity("리셋 성공",200)
}

export async function checkingPassword(password:string):Promise<ResponseEntity<boolean>> {

  let hashedPassword = configRepo.find().password;

  let result = await checkingPW(password,hashedPassword)

  return new ResponseEntity(result,result ?200:400)
}



//실시간 좌석보기 기능
export function viewReadingRoom(room_id:number):ResponseEntity<READING_ROOM_DTO>{

  let seats = seatRepo.find_all(room_id);
  let available_count = reservationRepo.count(room_id)
  const result = {
    selectRoom: room_id,
      room: {
    totalSeats: seats.length,
      restSeats: available_count,
      rows: toConvertRowDtos(seats, room_id)
  }
  }as READING_ROOM_DTO
  console.log(result);
  return new ResponseEntity(result,200)
}

//예약기능
export function checkIn(name: string, phone_number: string, seat_id: number){

  if (!seatRepo.is_available(seat_id)) {
    console.error("좌석이 이미 예약된 좌석입니다.");
    return new ResponseEntity("예약 오류",400,"이미 예약된 좌석입니다.");
  }

  if(userRepo.is_exist(phone_number)){
    return new ResponseEntity("예약 오류",400,"이미 예약된 전화번호입니다.");
  }

  if (!persistUserRepo.is_exist(name, phone_number)) {
    persistUserRepo.create(name, phone_number);
  }
  //여기서 user_id가 진짜 user_id가 아니다. create 하면 열의 순서가 나오는것이기때문에 따로 찾아야된다.
  userRepo.create(name, phone_number);
  let user_id_dto = userRepo.find_user_id(name,phone_number) as USER_ID_DTO;
  let time = "+" + configRepo.find().reservation_time.toString() + " hours";
  let reservation_id = reservationRepo.create(user_id_dto.user_id, seat_id, time);

  seatRepo.update_status(seat_id, "reserved")

  //로그남기기
  logRepo.create(seat_id, persistUserRepo.find_id(name, phone_number), "reservation")
  return new ResponseEntity(reservation_id,200,"입실이 완료되었습니다.");
}

export function deleteAllUser(){

  userRepo.delete_all()
  return new ResponseEntity(true,200,"모든 사용자 삭제 완료");
}

export function checkOutForce(seat_id:number){
  let user_id = reservationRepo.find_user_id(seat_id);
  //seat_id로 유저아이디찾고
  //입실삭제하고
  //유저삭제하고
  //좌석상태변경하기
  //로그남기기
}


//수동 퇴실기능
export function checkOut(name:string,phone_number:string){

  let user = userRepo.find_user_id(name,phone_number);

  if(!user){
    return new ResponseEntity(false,400,"이용중인 사용자가 아닙니다.");
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

  return new ResponseEntity(result.changes>0,200,"퇴실 완료되었습니다.");
}

//연장기능
export function extend(name:string,phone_number:string){

  let user = userRepo.find_user_id(name,phone_number);

  if(!user){
    return new ResponseEntity(false,400,"이용중인 사용자가 아닙니다.");
  }

  const end_time = new Date(reservationRepo.find_end_time(user.user_id)).getTime()
  const now = new Date().getTime()

  //연장에 제한두기
  if(end_time-now>(60*60*1000)){
    return new ResponseEntity(false,400,"퇴실 1시간전부터 연장이 가능합니다.");
  }

  let time = "+"+configRepo.find().extend_time.toString()+" hours";
  let result = reservationRepo.update_end_time(user.user_id,time);

  let seat_id = reservationRepo.find_seat_id_by_user_id(user.user_id);

  if(seatRepo.find(seat_id).ask_checkout_flag){
    seatRepo.update_ask_checkout_flag(seat_id,0)
  }
  //로그
  logRepo.create(seat_id, persistUserRepo.find_id(name,phone_number),"extend")
  return new ResponseEntity(result.changes>0,200,"연장되었습니다.");
}

//퇴실요청 기능
export function askCheckOut(seat_id:number,name:string,phone_number:string){

  //이미 퇴실요청중일때
  if(seatRepo.find(seat_id).ask_checkout_flag){
    console.log("이미 퇴실요청이 들어온 좌석입니다.")
    return new ResponseEntity(false,400,"퇴실요청 중복 오류");
  }

  let time = "+"+configRepo.find().ask_checkout_time.toString()+" minutes";
  let result = reservationRepo.ask_checkout(seat_id,time);
  seatRepo.update_ask_checkout_flag(seat_id,1);
  if(!persistUserRepo.is_exist(name,phone_number)){
    persistUserRepo.create(name, phone_number);
  }
  let persist_user_id = persistUserRepo.find_id(name,phone_number);
  logRepo.create(seat_id, persist_user_id,"ask-CheckOut")

  return new ResponseEntity(result.changes>0,200,"퇴실요청이 완료되었습니다.");
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
  return new ResponseEntity(log_dtos,200);
}

export function viewConfig(){
  return new ResponseEntity(configRepo.find());
}

export function updateConfig(reservation_time:number,extend_time:number,ask_checkout_time:number){
  let result = configRepo.update_all(reservation_time,extend_time,ask_checkout_time);
  return new ResponseEntity(result.changes>0,200);
}

//설정 초기화
export function initConfig(){
  let result = configRepo.update_all(2,1,30);
  return new ResponseEntity(result.changes>0,200);
}

//문의사항 만들기
export function createInquiry(name:string,phone_number:string,title:string,content:string){
  if(!persistUserRepo.is_exist(name,phone_number)){
    persistUserRepo.create(name, phone_number);
  }
  let persist_user_id = persistUserRepo.find_id(name,phone_number);

  inquiryRepo.create(persist_user_id,title,content);

  //로그
  logRepo.create(1,persist_user_id,"inquiry");
  return new ResponseEntity("문의사항 전달완료",200,"문의사항이 등록되었습니다.");
}

//문의사항 전체 보기
export function viewAllInquiry(){
  let inquiries = inquiryRepo.find_all();
  return new ResponseEntity(inquiries,200);
}
