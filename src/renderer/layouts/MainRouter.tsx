import { HashRouter, Route, Routes } from 'react-router-dom';
import AdminRouter from './AdminRouter';
import { SeatMain, SideMenu, InquireMain } from '@/components';

function MainRouter() {
  return (
    <HashRouter>
      <SideMenu />
      <div className="w-[1040px] h-full p-[40px]">
        <Routes>
          <Route path="/" element={<SeatMain />} />
          <Route path="/suggest" element={<InquireMain />} />
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default MainRouter;
