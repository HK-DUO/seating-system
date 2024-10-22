import React, { useState } from 'react';
import { getCurrentTime, getExitTime } from '@/utils/getTime';
import '@/styles/OutPrompt.css';
import { UserInfoType } from '@/types/InfoType';

type PropsType = {
  onClickOk: (input: UserInfoType) => void;
  onClickCancel: () => void;
  roomNum: string;
  seatNum: string;
};

function OutPrompt({ seatNum, roomNum, onClickCancel, onClickOk }: PropsType) {
  const [value, setValue] = useState<UserInfoType>({ name: '', number: '' });

  const onChange = (e: any) => {
    if (e.target.name == 'number') {
      let nonNumericRegex = /[^0-9-]/;
      if (e.target.value.length < 14 && !nonNumericRegex.test(e.target.value)) {
        setValue({ ...value, [e.target.name]: e.target.value });
      }
    } else {
      setValue({ ...value, [e.target.name]: e.target.value });
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key !== 'Backspace') {
      if (value.number.length == 3 || value.number.length == 8) {
        setValue({ ...value, number: e.target.value + '-' });
      }
    }
  };

  return (
    <div className="outPrompt">
      <h1>{'퇴실요청'}</h1>
      <div>
        <label>요청자이름</label>
        <input onChange={onChange} value={value.name} name="name" />
      </div>
      <div>
        <label>요청자전화번호</label>
        <input
          onChange={onChange}
          value={value.number}
          onKeyDown={handleKeyDown}
          name="number"
        />
      </div>
      <div>
        <label>열람실</label>
        <input value={`제 ${roomNum} 열람실`} disabled={true} />
      </div>
      <div>
        <label>좌석</label>
        <input value={`${seatNum}번`} disabled={true} />
      </div>
      <div>
        <label>공석시간</label>
        <input value={getExitTime(30)} disabled={true} />
      </div>
      <p>
        {
          '이용자가 자동 퇴실 시간전에 연장시 퇴실요청은 자동 취소됩니다\n해당시간이 지난 후 자동공석처리됩니다.\n공석 처리시간에 맞춰 예약을 진행해주셔야 됩니다.\n이용자가 있는 자리를 고의적으로 자주 퇴실 요청하실 경우 이용시 패널티가 부여됩니다.\n빈자리, 자리맡아두기 등의 자리만 퇴실요청을 부탁드립니다.'
        }
      </p>
      <div>
        <button onClick={onClickCancel}>취소</button>
        <button onClick={() => onClickOk(value)}>확인</button>
      </div>
    </div>
  );
}

export default OutPrompt;
