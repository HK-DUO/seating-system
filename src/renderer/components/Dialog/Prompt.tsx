import { useState } from 'react';
import '@/styles/Prompt.css';

type PropsType = {
  message: string;
  subMessage: string;
  onClickOk: (input: string) => void;
  onClickCancel: () => void;
};

function Prompt({ message, subMessage, onClickOk, onClickCancel }: PropsType) {
  const [value, setValue] = useState('');

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className="prompt">
      <h1>{message}</h1>
      <div>
        <label>{subMessage}</label>
        <input type="password" value={value} name="name" onChange={onChange} />
      </div>
      <div>
        <button onClick={onClickCancel}>취소</button>
        <button onClick={() => onClickOk(value)}>확인</button>
      </div>
    </div>
  );
}

export default Prompt;
