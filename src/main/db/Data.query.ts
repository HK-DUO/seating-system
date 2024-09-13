

const createReservationTableQuery:string = "CREATE TABLE IF NOT EXISTS Reservation (reservation_id INTEGER PRIMARY KEY AUTOINCREMENT, seat_id INTEGER NOT NULL,user_id INTEGER NOT NULL,reservation_start DATETIME DEFAULT (datetime('now','localtime')),reservation_end DATETIME DEFAULT (datetime('now','+11 hours')),FOREIGN KEY (seat_id) REFERENCES Seat(seat_id),FOREIGN KEY (user_id) REFERENCES User(user_id))"
const createSeatTableQuery:string="CREATE TABLE IF NOT EXISTS Seat (seat_id INTEGER PRIMARY KEY AUTOINCREMENT, room_id INTEGER NOT NULL, seat_num INTEGER NOT NULL, seat_status VARCHAR(255) NOT NULL, is_special BOOLEAN DEFAULT FALSE, FOREIGN KEY (room_id) REFERENCES ReadingRoom(room_id))"
const createReadingRoomTableQuery:string= "CREATE TABLE IF NOT EXISTS ReadingRoom (room_id INTEGER PRIMARY KEY AUTOINCREMENT,room_name VARCHAR(255) NOT NULL,total_num_of_seat INTEGER NOT NULL)"
const createUserTableQuery:string = "CREATE TABLE IF NOT EXISTS User (user_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL UNIQUE)"


const initReadingRoomData1:string="insert into ReadingRoom(room_id,room_name,total_num_of_seat) values(1,'제 1열람실',84)"
const initReadingRoomData2:string="insert into ReadingRoom(room_id,room_name,total_num_of_seat) values(2,'제 2열람실',128)"
const initSeatData:string ="INSERT INTO Seat (seat_id, room_id, seat_num, seat_status, is_special) VALUES (?, ?, ?, ?, ?)"

const viewAllSeat:string="SELECT * from Seat where seat_id=?"
const viewReadingRoom:string="SELECT * FROM Seat where room_id = @id"

const createUserQuery:string="insert into USer(name,phone_number) values(?,?)"
const deleteAllUserQuery:string="DELETE FROM User"
const deleteUserQuery:string="DELETE FROM User WHERE user_id = ?"

const createReservationQuery:string="INSERT INTO Reservation (user_id, seat_id) VALUES (?, ?)"
const isSeatAvailableQuery:string="SELECT seat_status FROM Seat WHERE seat_id = ?"

const updateSeatStatusQuery:string="UPDATE Seat SET seat_status = ? WHERE seat_id = ?"

const countReservationAboutRoomQuery:string = "SELECT COUNT(*) AS reserved_seat_count FROM Seat WHERE room_id = ? AND seat_status = 'reserved'"
const checkReservedUserQuery:string="SELECT user_id FROM User WHERE name = ? AND phone_number = ?"
const deleteReservationQuery:string="DELETE FROM Reservation WHERE user_id = ?"
const checkReservedSeatQuery:string="SELECT seat_id FROM Reservation where user_id=?"

export const createTableQuery={
  reservation:createReservationTableQuery,
  seat:createSeatTableQuery,
  reading_room:createReadingRoomTableQuery,
  user:createUserTableQuery,
}

export const initDataQuery={
  reading_room_1:initReadingRoomData1,
  reading_room_2:initReadingRoomData2,
  seat:initSeatData
}

export const viewQuery={
  all:viewAllSeat,
  reading_room:viewReadingRoom,
}

export const userQuery={
  create:createUserQuery,
  deleteAll:deleteAllUserQuery,
  check:checkReservedUserQuery,
  delete:deleteUserQuery,
  // hasReservation:hasReservationQuery,
}

export const reservationQuery={
  create:createReservationQuery,
  count:countReservationAboutRoomQuery,
  delete:deleteReservationQuery,
  checkSeat:checkReservedSeatQuery,
}

export const seatQuery={
  isAvailable:isSeatAvailableQuery,
  updateStatus:updateSeatStatusQuery,
}



