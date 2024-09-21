import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import '../styles/AdminNav.css';

function AdminNav(){
  const location = useLocation();

  return <div className={"admin-nav"}>
    <Link to={"/admin"} className={location.pathname == "/admin" ? "bg-deep-blue" : "bg-blue"}>기본설정</Link>
    <Link to={"/admin/log"} className={location.pathname == "/admin/log" ? "bg-deep-blue" : "bg-blue"}>사용기록</Link>
    <Link to={"/admin/user"} className={location.pathname == "/admin/user" ? "bg-deep-blue" : "bg-blue"}>이용자설정</Link>
  </div>
}

export default AdminNav
