import "../styles/AdminSetting.css"
import { useState } from "react";
import { useDialog } from "../hooks/useDialog";

function AdminSetting(){
  const {alert} = useDialog();

  const [basicTime, setBasicTime] = useState({
    checkInTime: 2,
    extendTime: 1,
    askCheckOutTime: 1,
  });

  const onChange = (e:any) => {
    if(e.target.value >= 1 && e.target.value <= 3) {
      setBasicTime({ ...basicTime, [e.target.name]: e.target.value });
    }
  }

  const onSubmit = async ()=>{
    await alert("기본설정", "시간설정이 적용되었습니다.")
  }


  return (
    <div className={'admin-setting'}>
        <div>
          <label>기본 예약시간 변경</label>
          <input
            onChange={onChange}
            name={'checkInTime'}
            value={basicTime.checkInTime}
            type={'number'}
          />
        </div>
        <div>
          <label>기본 연장시간 변경</label>
          <input
            onChange={onChange}
            name={'extendTime'}
            value={basicTime.extendTime}
            type={'number'}
          />
        </div>
        <div>
          <label>퇴실요청 대기시간 변경</label>
          <input
            onChange={onChange}
            name={'askCheckOutTime'}
            value={basicTime.askCheckOutTime}
            type={'number'}
          />
        </div>
        <div>
          <button
            onClick={() =>
              setBasicTime({
                checkInTime: 2,
                extendTime: 1,
                askCheckOutTime: 1,
              })
            }
          >
            초기화
          </button>
          <button onClick={onSubmit}>적용</button>
        </div>
    </div>
  );
}

export default AdminSetting;
