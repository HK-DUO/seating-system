import React, { useState, useEffect } from 'react';
function TestButton() {


  const init = () => {
    window.electron.init();
  };



  return (
    <div>
      <button className="w-full h-[40px] bg-white" onClick={init}>
        초기화
      </button>
    </div>
  );
}

export default TestButton;
