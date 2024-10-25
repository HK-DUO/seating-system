import '@/styles/AdminLog.css';
import { useEffect, useState } from 'react';
import { LogInfoType } from '@/types/InfoType';
import { ResType } from '@/types/resType';
import { useDialog } from '@/hooks/useDialog';

function AdminLog() {
  const { alert } = useDialog();

  const [value, setValue] = useState({
    pageNation: 1,
    date: '',
    number: '',
  });
  const [logData, setLogData] = useState<LogInfoType[]>([]);
  const logsPerPage = 10;

  useEffect(() => {
    window.electron.viewAllLog().then(async (res: ResType<LogInfoType[]>) => {
      if (res.code == 200) {
        console.log(res.data);
        setLogData(res.data);
      } else {
        await alert('오류', res.message);
      }
    });
  }, []);

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

  const filteredLogData = logData?.filter(
    (log) =>
      (value.date === '' ||
        new Date(log.timestamp).toISOString().slice(0, 10) === value.date) &&
      (value.number === '' || log.phoneNumber.includes(value.number)),
  );

  const indexOfLastLog = value.pageNation * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogData?.slice(indexOfFirstLog, indexOfLastLog);

  const totalPages = Math.ceil(filteredLogData.length / logsPerPage);
  const handleNextPage = () => {
    if (value.pageNation < totalPages)
      setValue({ ...value, pageNation: value.pageNation + 1 });
  };

  const handlePrevPage = () => {
    if (value.pageNation > 1)
      setValue({ ...value, pageNation: value.pageNation - 1 });
  };

  // const logDataList =

  return (
    <div className={'admin-log'}>
      <div className={'admin-log-filter'}>
        <div>
          <label>날짜</label>
          <input
            onChange={(e) => onChange(e)}
            value={value.date}
            name={'date'}
            type={'date'}
          />
        </div>
        <div>
          <label>전화번호</label>
          <input
            onChange={(e) => onChange(e)}
            onKeyDown={handleKeyDown}
            value={value.number}
            name={'number'}
          />
        </div>
      </div>
      <div className={'admin-log-list'}>
        <ul>
          <li>로그 ID</li>
          <li>열람실</li>
          <li>좌석</li>
          <li>기능</li>
          <li>유저 닉네임</li>
          <li>유저 전화번호</li>
          <li>시간</li>
          <li>날짜</li>
        </ul>
        <ul>
          {currentLogs.map((log) => (
            <li>
              <span>{log.id}</span>
              <span>{log.room}</span>
              <span>{log.seat}</span>
              <span>{log.function}</span>
              <span>{log.nickname}</span>
              <span>{log.phoneNumber}</span>
              <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
              <span>{new Date(log.timestamp).toISOString().slice(0, 10)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={'admin-log-pagination'}>
        <div>
          <button onClick={() => handlePrevPage()}>이전페이지</button>
          <label>{`${value.pageNation}/${totalPages}`}</label>
          <button onClick={() => handleNextPage()}>다음페이지</button>
        </div>
      </div>
    </div>
  );
}

export default AdminLog;
