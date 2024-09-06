function TestButton() {

  const test = () => {
    window.test.ipcRenderer.testMessage("testMessage !")
  };

  return (
    <div>
      <button className="w-full h-[40px] bg-white" onClick={test}>테스트</button>
    </div>
  );
}

export default TestButton;
