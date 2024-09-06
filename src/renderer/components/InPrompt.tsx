import React, {useState} from "react";
import {getCurrentTime, getPlusTime} from "../utils/getTime";
import "../styles/InPrompt.css"


type PropsType = {
  roomNum:string;
  seatNum:string;
  onClickOk: (input:object) => void,
  onClickCancel: () => void
}

function InPrompt({roomNum, seatNum, onClickOk, onClickCancel}: PropsType) {
  const [value, setValue] = useState({name: "", number: ""})

  const onChange = (e: any) => {
    if(e.target.name == "number"){
      let nonNumericRegex = /[^0-9-]/;
      if(e.target.value.length < 14 && !nonNumericRegex.test(e.target.value)) {
        setValue({...value, [e.target.name]: e.target.value});
      }
    } else {
      setValue({...value, [e.target.name]: e.target.value});
    }
  }

  const handleKeyDown = (e: any) => {
    if(e.key !== "Backspace") {
      if (value.number.length == 3 || value.number.length == 8) {
        setValue({...value, number: e.target.value + "-"});
      }
    }
  }

  return <div className="inPrompt">
    <h1>일일 이용증 발급</h1>
    <div><label>이름</label><input value={value.name} onChange={onChange} name="name"/></div>
    <div><label>전화번호</label><input value={value.number} name="number" onKeyDown={handleKeyDown} onChange={onChange}/></div>
    <div><label>열람실</label><input value={`제 ${roomNum} 열람실`} disabled={true}/></div>
    <div><label>좌석</label><input value={`${seatNum}번`} disabled={true}/></div>
    <div><label>이용시간</label><input value={`${getCurrentTime()} ~ ${getPlusTime()}`} disabled={true}/></div>
    <p>{"퇴실 요청시 해당 전화번호로 연장요청 문자가 발송됩니다.\n연장하지 않을 경우 시간이 지나거나 퇴실요청시 공석처리됨을 유의하시기 바랍니다.\n열람실 내부 및 복도 정숙 유지\n귀중품(금품) 분실,도난 주의(지갑, 휴대폰, MP3, 전자수첩 등)\n퇴실 시 본인 좌석 정리,정돈"}</p>
    <div>
      <button onClick={onClickCancel}>취소</button>
      <button onClick={() => onClickOk(value)}>확인</button>
    </div>
  </div>;
}

export default InPrompt;
