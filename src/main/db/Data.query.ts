

const createReservationTableQuery:string = "CREATE TABLE Reservation (reservation_id INT AUTO_INCREMENT PRIMARY KEY, seat_id INT NOT NULL,user_id INT NOT NULL,reservation_start DATETIME NOT NULL,reservation_end DATETIME NOT NULL,FOREIGN KEY (seat_id) REFERENCES Seat(seat_id),FOREIGN KEY (user_id) REFERENCES User(user_id))"
const createSeatTableQuery:string="CREATE TABLE Seat (seat_id INT AUTO_INCREMENT PRIMARY KEY, room_id INT NOT NULL, seat_num VARCHAR(255) NOT NULL, seat_status VARCHAR(255) NOT NULL, is_special BOOLEAN DEFAULT FALSE, FOREIGN KEY (room_id) REFERENCES ReadingRoom(room_id))"
const createReadingRoomTableQuery:string= "CREATE TABLE ReadingRoom (room_id INT AUTO_INCREMENT PRIMARY KEY,room_name VARCHAR(255) NOT NULL,total_num_of_seat INT NOT NULL)"
const createUserTableQuery:string = "CREATE TABLE User (user_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL UNIQUE)"


const initReadingRoomData1:string="insert into ReadingRoom(room_id,room_name,total_num_of_seat) values(1,'제 1열람실',84)"
const initReadingRoomData2:string="insert into ReadingRoom(room_id,room_name,total_num_of_seat) values(2,'제 2열람실',128)"
const initSeatData:string ="INSERT INTO Seat (seat_id, room_id, seat_num, seat_status, is_special) VALUES (?, ?, ?, ?, ?)"

const viewAllSeat:string="SELECT * from Seat where seat_id=?"
const viewReadingRoom:string="SELECT * FROM Seat where room_id = @id"


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



