import React, { useState, useEffect } from 'react';
function TestButton() {


  const init = () => {
    window.electron.init();
  };
  const reset = () => {
    window.electron.reset();
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
      {/* <button className="w-full h-[40px] bg-white" onClick={reset}> */}
      {/*   데이터리셋 */}
      {/* </button> */}
    </div>
  );
}

export default TestButton;
