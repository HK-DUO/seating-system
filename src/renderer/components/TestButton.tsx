import React, { useState, useEffect } from 'react';
function TestButton() {


  const init = () => {
    window.electron.init();
  };

  const viewConfig = async ()=>{
     await window.electron.viewConfig().then(async (res)=>console.log(res));
  }

  const updateConfig = async (reservation_time:number,extend_time:number,ask_checkout_time:number)=>{
    await window.electron.updateConfig(reservation_time,extend_time,ask_checkout_time).then(async (res)=>console.log(res));
  }

  return (
    <div>
      <button className="w-full h-[40px] bg-white" onClick={init}>
        초기화
      </button>
      <button className="w-full h-[40px] bg-white" onClick={viewConfig}>
        설정보기
      </button>
      <button className="w-full h-[40px] bg-white" onClick={()=>updateConfig(2,1,2)}>
        설정변경
      </button>
    </div>
  );
}

export default TestButton;
