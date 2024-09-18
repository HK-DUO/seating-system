import React, { useState, useEffect } from 'react';
function TestButton() {

  const [isKey4Pressed, setIsKey4Pressed] = useState(false);
  const [isKeyRPressed, setIsKeyRPressed] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '4') {
        setIsKey4Pressed(true);
      } else if (event.key.toLowerCase() === 'r') {
        setIsKeyRPressed(true);
      }
    };

    // Keyup event listener for resetting the key states
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === '4') {
        setIsKey4Pressed(false);
      } else if (event.key.toLowerCase() === 'r') {
        setIsKeyRPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleLogoClick = () => {
    if (isKey4Pressed && isKeyRPressed) {
      console.log('비밀창 접속완료');
    } else {
      console.log('You must hold both the "4" and "r" keys while clicking the logo!');
    }
  };
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

  const onAskCheckout = async (seat_id:number) => {
    await window.electron.askCheckout(seat_id);
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
      <button className="w-full h-[40px] bg-white" onClick={() => onAskCheckout(6)}>
        퇴실요청
      </button>
      <button className="w-full h-[40px] bg-white" onClick={() => handleLogoClick()}>
        관리자창
      </button>
    </div>
  );
}

export default TestButton;
