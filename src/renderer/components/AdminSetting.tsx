import "../styles/AdminSetting.css"
import { useEffect, useState } from "react";
import { useDialog } from "../hooks/useDialog";

function AdminSetting(){
  const {alert} = useDialog();

  const [basicTime, setBasicTime] = useState({
    checkInTime: 1,
    extendTime: 1,
    askCheckOutTime: 1,
  });

  useEffect(() => {
    viewConfig();
  }, []);

  const viewConfig = async ()=>{
    let res = await window.electron.viewConfig();
    setBasicTime({checkInTime: res.data.reservation_time, extendTime: res.data.extend_time, askCheckOutTime: res.data.ask_checkout_time})
  }

  const onChange = (e:any) => {
    if(e.target.value >= 1 && e.target.value <= 3) {
      setBasicTime({ ...basicTime, [e.target.name]: e.target.value });
    }
  }

  const onSubmit = async () => {
    let res = await window.electron.updateConfig(
      basicTime.checkInTime,
      basicTime.extendTime,
      basicTime.askCheckOutTime,
    );
    if (res.code == 200) {
      await alert('기본설정', '기본설정이 정상적으로 변경되었습니다.');
      await viewConfig();
    } else {
      await alert('오류', '기본설정 변경에 오류가 발생했습니다.');
    }
  };


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
          value={ basicTime.extendTime}
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
        <button onClick={viewConfig}>초기화</button>
        <button onClick={onSubmit}>적용</button>
      </div>
    </div>
  );
}

export default AdminSetting;
