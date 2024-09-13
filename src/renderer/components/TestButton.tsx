function TestButton() {
  type TODO = {
    id?: number;
    title: string;
    date: string;
    status: number;
  };

  const testTodo: TODO = {
    id: 1,
    title: 'hello',
    date: 'dkd',
    status: 1,
  };

  const init = () => {
    window.electron.init();
  };


  const onView = async (id:number) => {
    const result =  await window.electron.viewReadingRoom(id);
    console.log(result);
  };

  const checkIn = async (name:string,phone_number:string,seat_id:number) => {
    const result =  await window.electron.checkIn(name,phone_number,seat_id);
    console.log(result);
  };

  const checkOut = async(name:string,phone_number:string)=>{
    let result = await window.electron.checkOut(name,phone_number);
    console.log(result);
  }

  const onDelete = async () => {
    await window.electron.deleteUser();
  }

  // const test = () => {
  //   window.test.ipcRenderer.testMessage('testMessage !');
  // };

  return (
    <div>
      {/*<button className="w-full h-[40px] bg-white" onClick={test}>*/}
      {/*  ipc 테스트*/}
      {/*</button>*/}
      <button className="w-full h-[40px] bg-white" onClick={init}>
        초기화
      </button>
      <button className="w-full h-[40px] bg-white" onClick={() => onView(2)}>
        조회 테스트
      </button>
<<<<<<< HEAD
      <button className="w-full h-[40px] bg-white" onClick={() => onReservation("tdf", "010-124-4fds371",7)}>
        유저 생성 테스트
=======
      <button className="w-full h-[40px] bg-white" onClick={() => checkIn("tdf", "0210-124-4fds378", 1)}>
        예약 테스트
      </button>
      <button className="w-full h-[40px] bg-white" onClick={() => checkOut("tdf", "0210-124-4fds378")}>
        퇴실 테스트
>>>>>>> 0b41c04 (feat/db: 열람실 퇴실기능 구현)
      </button>
      <button className="w-full h-[40px] bg-white" onClick={() => onDelete()}>
        유저 전체삭제 테스트
      </button>
    </div>
  );
}

export default TestButton;
