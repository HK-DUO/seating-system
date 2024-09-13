export type READING_ROOM_DTO={
  selectRoom?:number;
  room:{
    totalSeats:number;
    restSeats:number;
    rows:ROW_DTO[];
  };
}

export type ROW_DTO={
  row:number,
  seats:SEAT_DTO[]
}

export type SEAT_DTO={
  id:number;
  num:number;
  line:number;
  state:boolean;
  disableSeats:boolean;
}

export type INIT_SEAT_DTO={
  room_id:number;
  seat_num:number;
  seat_status:string;
  is_special:number;
}

export type SEAT_STATUS_DTO={
  seat_status:string;
}

export type RESERVATION_COUNT_DTO={
  reserved_seat_count:number;
}

