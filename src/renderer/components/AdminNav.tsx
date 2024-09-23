import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDialog } from "../hooks/useDialog";
import '../styles/AdminNav.css';

function AdminNav(){
  const location = useLocation();
  const {confirm} = useDialog()

  const closeApp = async () =>{
    await confirm("종료", "정말 종료하시겠습니끼?").then((res)=>{
      if(res){
        localStorage.removeItem("askDbReset")
        window.electron.requestAppClose()
      }
    })
  }

  return <div className={"admin-nav"}>
    <Link to={"/admin"} className={location.pathname == "/admin" ? "bg-deep-blue" : "bg-blue"}>기본설정</Link>
    <Link to={"/admin/log"} className={location.pathname == "/admin/log" ? "bg-deep-blue" : "bg-blue"}>사용기록</Link>
    <Link to={"/admin/user"} className={location.pathname == "/admin/user" ? "bg-deep-blue" : "bg-blue"}>이용자설정</Link>
    <button onClick={closeApp}>앱종료</button>
  </div>
}

export default AdminNav
