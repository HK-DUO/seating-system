export type SEAT={
  seat_id:number;
  room_id:number;
  seat_num:number;
  seat_status:string;
  is_special:number;
}


export type READING_ROOM={
  room_id:number;
  room_name:string;
  total_num_of_seat:number;
}

export type RESERVATION={
  reservation_id:number;
  seat_id:number;
  user_id:number;
  reservation_start:string;
  reservation_end:string;
}

export type USER={
  user_id:number;
  name:string;
  phone_number:string;
}

export type PERSIST_USER={
  persist_user_id:number;
  name:string;
  phone_number:string;
}

export type LOG={
  log_id:number;
  seat_id:number;
  persist_user_id:number;
  time:string;
  feature:string;
}


