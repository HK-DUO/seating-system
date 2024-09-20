import React, { useState, useEffect } from 'react';
function TestButton() {

  type TODO = {
    id?: number;
    title: string;
    date: string;
    status: number;
  };

  const init = () => {
    window.electron.init();
  };


  const onView = async (id:number) => {
    const result =  await window.electron.viewReadingRoom(id);
    console.log(result);
  };


  const onDelete = async () => {
    await window.electron.deleteUser();
  }

  const onAskCheckout = async (seat_id:number,name:string,phone_number:string) => {
    await window.electron.askCheckout(seat_id,name,phone_number);
  }


  return (
    <div>
      <button className="w-full h-[40px] bg-white" onClick={init}>
        초기화
      </button>
      <button className="w-full h-[40px] bg-white" onClick={() => onView(1)}>
        조회 테스트
      </button>
      <button className="w-full h-[40px] bg-white" onClick={() => onDelete()}>
        유저리셋
      </button>
      <button className="w-full h-[40px] bg-white" onClick={() => onAskCheckout(6,"test","010-1212-1212")}>
        퇴실요청
      </button>
    </div>
  );
}

export default TestButton;
