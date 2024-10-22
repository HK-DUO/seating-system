type UserInfoType = {
  name: string;
  number: string;
};

type RoomInfoType = {
  totalSeats: number;
  restSeats: number;
  rows: {
    row: number;
    seats: SeatInfoType[];
  }[];
};

type SeatInfoType = {
  id: number;
  num: number;
  line: number;
  state: boolean;
  disableSeats: boolean;
  end_time: string | null;
};

type LogInfoType = {
  id: number;
  room: number;
  seat: number;
  function: string;
  timestamp: string;
  nickname: string;
  phoneNumber: string;
};

export { UserInfoType, RoomInfoType, SeatInfoType, LogInfoType };
