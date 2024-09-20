
const createReservationTableQuery:string = "CREATE TABLE IF NOT EXISTS Reservation (reservation_id INTEGER PRIMARY KEY AUTOINCREMENT, seat_id INTEGER NOT NULL,user_id INTEGER NOT NULL,reservation_start DATETIME DEFAULT (datetime('now','localtime')),reservation_end DATETIME DEFAULT (datetime('now','localtime','+2 hours')),FOREIGN KEY (seat_id) REFERENCES Seat(seat_id),FOREIGN KEY (user_id) REFERENCES User(user_id))"
const createSeatTableQuery:string="CREATE TABLE IF NOT EXISTS Seat (seat_id INTEGER PRIMARY KEY AUTOINCREMENT, room_id INTEGER NOT NULL, seat_num INTEGER NOT NULL, seat_status VARCHAR(255) NOT NULL, is_special BOOLEAN DEFAULT FALSE, FOREIGN KEY (room_id) REFERENCES ReadingRoom(room_id))"
const createReadingRoomTableQuery:string= "CREATE TABLE IF NOT EXISTS ReadingRoom (room_id INTEGER PRIMARY KEY AUTOINCREMENT,room_name VARCHAR(255) NOT NULL,total_num_of_seat INTEGER NOT NULL)"
const createUserTableQuery:string = "CREATE TABLE IF NOT EXISTS User (user_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL UNIQUE)"
const createPersistUserTableQuery:string = "CREATE TABLE IF NOT EXISTS PersistUser (persist_user_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL,created_at DATETIME DEFAULT (datetime('now','localtime')), UNIQUE(name,phone_number) )"
const createLogTableQuery:string="CREATE TABLE IF NOT EXISTS Log (log_id INTEGER PRIMARY KEY AUTOINCREMENT, seat_id INTEGER NOT NULL,persist_user_id INTEGER NOT NULL,feature VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT (datetime('now','localtime')),FOREIGN KEY (seat_id) REFERENCES Seat(seat_id),FOREIGN KEY (persist_user_id) REFERENCES PersistUser(persist_user_id))"
const createConfigTableQuery:string="CREATE TABLE IF NOT EXISTS Config (config_id INTEGER PRIMARY KEY AUTOINCREMENT, reservation_time INTEGER NOT NULL,extend_time INTEGER NOT NULL,ask_checkout_time INTEGER NOT NULL)"
export const createTableQuery={
  reservation:createReservationTableQuery,
  seat:createSeatTableQuery,
  reading_room:createReadingRoomTableQuery,
  user:createUserTableQuery,
  persist_user:createPersistUserTableQuery,
  log:createLogTableQuery,
  config:createConfigTableQuery
}

const initReadingRoomData1:string="INSERT into ReadingRoom(room_id,room_name,total_num_of_seat) VALUES(1,'제 1열람실',84)"
const initReadingRoomData2:string="INSERT into ReadingRoom(room_id,room_name,total_num_of_seat) VALUES(2,'제 2열람실',128)"
const initSeatData:string ="INSERT INTO Seat (seat_id, room_id, seat_num, seat_status, is_special) VALUES (?, ?, ?, ?, ?)"
const initConfigData:string="INSERT into Config(reservation_time,extend_time,ask_checkout_time) VALUES(2,1,30)"

export const initDataQuery={
  reading_room_1:initReadingRoomData1,
  reading_room_2:initReadingRoomData2,
  seat:initSeatData,
  config:initConfigData
}









