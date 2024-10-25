import '@/styles/AdminSetting.css';
import { useEffect, useState } from 'react';
import { useDialog } from '@/hooks/useDialog';
import { ResType } from '@/types/resType';

function AdminSetting() {
  const { alert } = useDialog();

  const [basicTime, setBasicTime] = useState({
    checkInTime: 1,
    extendTime: 1,
    askCheckOutTime: 1,
  });

  useEffect(() => {
    viewConfig();
  }, []);

  const viewConfig = async () => {
    await window.electron.viewConfig().then(
      async (
        res: ResType<{
          reservation_time: number;
          extend_time: number;
          ask_checkout_time: number;
        }>,
      ) => {
        if (res.code == 200) {
          setBasicTime({
            checkInTime: res.data.reservation_time,
            extendTime: res.data.extend_time,
            askCheckOutTime: res.data.ask_checkout_time,
          });
        } else {
          await alert(res.message);
        }
      },
    );
  };

  const onChange = (e: any) => {
    if (e.target.value >= 1 && e.target.value <= 3) {
      setBasicTime({ ...basicTime, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async () => {
    await window.electron
      .updateConfig(
        basicTime.checkInTime,
        basicTime.extendTime,
        basicTime.askCheckOutTime,
      )
      .then(async (res: ResType<any>) => {
        if (res.code == 200) {
          await alert('기본설절', res.message);
        } else {
          await alert('오류', res.message);
        }
      });
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
        <button onClick={viewConfig}>초기화</button>
        <button onClick={onSubmit}>적용</button>
      </div>
    </div>
  );
}

export default AdminSetting;
