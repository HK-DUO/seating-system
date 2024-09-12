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
  num:number;
  line:number;
  state:boolean;
  disableSeats:boolean;
}


