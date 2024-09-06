import {BrowserRouter, Route, Routes} from "react-router-dom";
import SeatMain from "../components/SeatMain";
import SuggestMain from "../components/SuggestMain";
import SideMenu from "./SideMenu";
import React from "react";

function MainRouter() {
  return <BrowserRouter>
    <SideMenu/>
    <div className="w-[1040px] h-full p-[40px]">
      <Routes>
        <Route path="/" element={<SeatMain/>}/>
        <Route path="/suggest" element={<SuggestMain/>}/>
      </Routes>
    </div>
  </BrowserRouter>
    ;
}

export default MainRouter;
