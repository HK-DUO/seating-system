import React, { useEffect } from 'react';
import MainRouter from './layouts/MainRouter';
import './styles/App.css';
import { useDialog } from './hooks/useDialog';
import prompt from './components/Dialog/Prompt';
import { ResType } from './types/resType';

function App() {
  const { alert, confirm } = useDialog();

  const [askDbReset, setAskDbReset] = React.useState(
    localStorage.getItem('askDbReset'),
  );

  useEffect(() => {
    window.electron.notifyCloseDenied(() => {
      alert('앱을 종료할 수 없습니다. 관리자 페이지에서만 가능합니다.');
    });
    if (!askDbReset) {
      resetDb();
    }
  }, []);

  const resetDb = async () => {
    await confirm(
      '데이터초기화',
      '데이터를 초기화하시겠습니까?\n앱이 종료될때까지 다시 묻지 않습니다.',
    ).then((res) => {
      if (res) {
        window.electron.reset().then(async (res: ResType<string>) => {
          if (res.code == 200) {
            await alert('데이터초기화', res.message).then(() => {
              localStorage.setItem('askDbReset', 'true');
              window.location.reload();
            });
          } else {
            await alert('데이터초기화', res.message).then(() => {
              localStorage.setItem('askDbReset', 'true');
            });
          }
        });
      } else {
        localStorage.setItem('askDbReset', 'true');
      }
    });
  };

  return (
    <div className="App">
      <MainRouter />
    </div>
  );
}

export default App;
