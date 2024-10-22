import { Route, Routes } from 'react-router-dom';
import {
  AdminNav,
  AdminSetting,
  AdminLog,
  AdminUser,
} from '@/components/index';
import '@/styles/AdminRouter.css';

function AdminRouter() {
  return (
    <div className="admin-router">
      <h1>관리자 모드</h1>
      <div>
        <AdminNav />
        <Routes>
          <Route path="" element={<AdminSetting />} />
          <Route path="log" element={<AdminLog />} />
          <Route path="user" element={<AdminUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminRouter;
