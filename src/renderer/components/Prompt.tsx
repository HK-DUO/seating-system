import {useState} from "react";
import "../styles/Prompt.css"

type PropsType = {
  message: string;
  subMessage: string,
  onClickOk: (input: object) => void,
  onClickCancel: () => void
}

function Prompt({message, subMessage, onClickOk, onClickCancel}: PropsType) {
  const [value, setValue] = useState({
    name:"",
    number: "",
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


  return <div className="prompt">
    <h1>{message}</h1>
    <div>
      <label>이름</label>
      <input value={value.name} name="name" onChange={onChange}/>
    </div>
    <div>
      <label>전화번호</label>
      <input value={value.number} name="number" onKeyDown={handleKeyDown} onChange={onChange}/>
    </div>
    <p>{subMessage}</p>
    <div>
      <button onClick={onClickCancel}>취소</button>
      <button onClick={()=>onClickOk(value)}>확인</button>
    </div>
  </div>;
}

export default Prompt;
