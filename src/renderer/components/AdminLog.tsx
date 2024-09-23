import "../styles/AdminLog.css"
import { useEffect, useState } from "react";

function AdminLog() {

  const [value, setValue] = useState({
    date:"",
    number:""
  })

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


  return (
    <div className={'admin-log'}>
      <div className={'admin-log__filter'}>
        <div>
          <label>날짜</label>
          <input onChange={(e)=>onChange(e)} value={value.date} name={"date"} type={'date'} />
        </div>
        <div>
          <label>전화번호</label>
          <input onChange={(e)=>onChange(e)} onKeyDown={handleKeyDown} value={value.number} name={"number"} />
        </div>
      </div>
      <div className={'admin-log__list'}>리스트 레이아웃</div>
      <div className={'admin-log__pagination'}>
        <div>
          <button>이전페이지</button>
          <label>{'1/2'}</label>
          <button>다음페이지</button>
        </div>
      </div>
    </div>
  );
}

export default AdminLog;
