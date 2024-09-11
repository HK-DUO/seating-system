function TestButton() {
  type TODO = {
    id?: number;
    title: string;
    date: string;
    status: number;
  };

  const testTodo: TODO = {
    id: 1,
    title: 'hello',
    date: 'dkd',
    status: 1,
  };

  const onCreate = () => {
    window.electron.createTable();
  };

  const onSaveTest = () => {
    window.electron.insertTODO(testTodo);
  };

  const onCheck = async () => {
    await console.log(window.electron.getOneTODO(1));
  };

  const test = () => {
    window.test.ipcRenderer.testMessage('testMessage !');
  };

  return (
    <div>
      <button className="w-full h-[40px] bg-white" onClick={test}>
        ipc 테스트
      </button>
      <button className="w-full h-[40px] bg-white" onClick={onCreate}>
        생성 테스트
      </button>
      <button className="w-full h-[40px] bg-white" onClick={onSaveTest}>
        삽입 테스트
      </button>
      <button className="w-full h-[40px] bg-white" onClick={onCheck}>
        조회 테스트
      </button>
    </div>
  );
}

export default TestButton;
