export type SEAT={
  seat_id:number;
  room_id:number;
  seat_num:number;
  seat_status:string;
  is_priority:number;
  ask_checkout_flag:number;
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
  created_at:string;
  feature:string;
}

export type CONFIG={
  config_id:number;
  reservation_time:number;
  extend_time:number;
  ask_checkout_time:number;
  password:string;
}

export type INQUIRY={
  inquiry_id:number;
  persist_user_id:number;
  title:string;
  content:string;
  created_at:string;
}
