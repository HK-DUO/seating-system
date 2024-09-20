type UserInfoType = {
  name: string;
  number: string;
};

type RoomInfoType = {
  totalSeats: number;
  restSeats: number;
  rows: {
    row: number;
    seats: {
      id: number;
      num: number;
      line: number;
      state: boolean;
      disableSeats: boolean;
    }[];
  }[];
};

export {UserInfoType, RoomInfoType}
