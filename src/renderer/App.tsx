import React, { useEffect } from "react";
import MainRouter from "./layouts/MainRouter";
import "./styles/App.css"
import DialogProvider from "./layouts/DialogProvider";

function App() {
  useEffect(() => {
    window.electron.notifyCloseDenied(() => {
      alert("앱을 종료할 수 없습니다. 관리자 페이지에서만 가능합니다.");
    });
  }, []);
  return (
    <div className="App">
      <DialogProvider>
       <MainRouter/>
      </DialogProvider>
    </div>
  );
}

export default App;
