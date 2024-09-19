import { BrowserRouter, HashRouter, Route, Router, Routes } from 'react-router-dom';
import SeatMain from "../components/SeatMain";
import SideMenu from "./SideMenu";
import React from "react";
import InquireMain from '../components/InquireMain';
import AdminMain from "../components/AdminMain";

function MainRouter() {
  return <HashRouter>
    <SideMenu />
    <div className="w-[1040px] h-full p-[40px]">
      <Routes>
        <Route path="" element={<SeatMain />} />
        <Route path="suggest" element={<InquireMain />} />
        <Route path="admin" element={<AdminMain />} />
      </Routes>
    </div>
  </HashRouter>
}

export default MainRouter;
