import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import AdminSetting from "../components/AdminSetting";
import AdminLog from "../components/AdminLog";
import AdminUser from "../components/AdminUser";
import '../styles/AdminRouter.css'
import AdminNav from "../components/AdminNav";
import AdminMain from "../components/AdminMain";

function AdminRouter() {

  const location = useLocation();
  console.log(location.pathname)

  return (
    <div className="admin-router">
      <h1>관리자 모드</h1>
      <div>
        <AdminNav />
        <Routes>
          <Route path="" element={<AdminSetting />} />
          <Route path="log" element={<AdminMain />} />
          <Route path="user" element={<AdminUser />}/>
        </Routes>
      </div>
    </div>
  );
}

export default AdminRouter;