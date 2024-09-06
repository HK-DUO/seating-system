import {Link} from "react-router-dom";
import "../styles/SideMenu.css";
import {YuseonIc} from "../assets/svg";
import TestButton from "../components/TestButton";


function SideMenu() {
  return <nav className="side-menu">
    <h1>
      <img src={YuseonIc} alt="yuseong-icon" /><span>노은도서관</span>
    </h1>
    <div>
      <TestButton />
      <Link to="">좌석예약</Link>
      <Link to="/suggest">문의사항</Link>
    </div>
  </nav>;
}

export default SideMenu;
