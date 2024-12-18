export type READING_ROOM_DTO = {
  selectRoom?: number;
  room: {
    totalSeats: number;
    restSeats: number;
    rows: ROW_DTO[];
  };
};

export type ROW_DTO = {
  row: number;
  seats: SEAT_DTO[];
};

export type SEAT_DTO = {
  id: number;
  num: number;
  line: number;
  state: boolean;
  disableSeats: boolean;
  end_time: string | null;
};

export type INIT_SEAT_DTO = {
  room_id: number;
  seat_num: number;
  seat_status: string;
  is_special: number;
};

export type SEAT_STATUS_DTO = {
  seat_status: string;
};

export type RESERVATION_COUNT_DTO = {
  available_seat_count: number;
};

export type RESERVED_SEAT_DTO = {
  seat_id: number;
};

export type EXPIRED_RESERVATION_DTO = {
  seat_id: number;
  user_id: number;
  reservation_id: number;
};

export type USER_ID_DTO = {
  user_id: number;
};

export type PERSIST_USER_EXIST_DTO = {
  userExists: number;
};

export type USER_EXIST_DTO = {
  userExists: number;
};

export type LOG_DTO = {
  id: number;
  room: number;
  seat: number;
  function: string;
  timestamp: string;
  nickname: string;
  phoneNumber: string;
};

export enum FeatureTranslations {
  'ask-CheckOut' = '퇴실요청',
  'auto-CheckOut' = '자동퇴실',
  'extend' = '연장',
  'manual-checkOut' = '수동퇴실',
  'reservation' = '예약',
  'inquiry'='문의',
  'data-reset'='데이터 초기화'
}
