import { Link, useNavigate } from "react-router-dom";
import "../styles/SideMenu.css";
import {YuseonIc} from "../assets/svg";
import TestButton from "../components/TestButton";
import { useEffect, useState } from "react";


function SideMenu() {
  const [isKey4Pressed, setIsKey4Pressed] = useState(false);
  const [isKeyRPressed, setIsKeyRPressed] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '4') {
        setIsKey4Pressed(true);
      } else if (event.key.toLowerCase() === 'r') {
        setIsKeyRPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === '4') {
        setIsKey4Pressed(false);
      } else if (event.key.toLowerCase() === 'r') {
        setIsKeyRPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleLogoClick = () => {
    if (isKey4Pressed && isKeyRPressed) {
      console.log('비밀창 접속완료');
      navigate('/admin');
    } else {
      console.log('You must hold both the "4" and "r" keys while clicking the logo!');
    }
  };

  return <nav className="side-menu">
    <h1>
      <img src={YuseonIc} alt="yuseong-icon" onClick={handleLogoClick}/><span >노은도서관</span>
    </h1>
    <div>
      <TestButton />
      <Link to="">좌석예약</Link>
      <Link to="/suggest">문의사항</Link>
    </div>
  </nav>;
}

export default SideMenu;
