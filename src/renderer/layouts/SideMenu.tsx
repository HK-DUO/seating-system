import { Link, useNavigate } from "react-router-dom";
import "../styles/SideMenu.css";
import {YuseonIc} from "../assets/svg";
import TestButton from "../components/TestButton";
import { useEffect, useState } from "react";
import { useDialog } from "../hooks/useDialog";
import { Config } from "../../main/data/type/Entity.type";
import { ResponseEntity } from "../../main/data/class/Response.class";
import { checkingPassword } from "../../main/data/controller/Data.controller";


function SideMenu() {
  const { prompt, alert } = useDialog();

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


  const handleLogoClick = async () => {
    if (isKey4Pressed && isKeyRPressed) {
      let ok = false;
      while (!ok) {
        await prompt('관리자모드', '비밀번호').then(async (res) => {
          // let adminPassword;
          let result = await window.electron.checkingPassword(res?res:"")
          if (res) {
            if (result.data) {
              navigate('/admin');
              ok = true;
            } else {
              await alert('오류', '비밀번호 오류');
            }
          } else {
            ok = true;
          }
          // await window.electron.viewConfig().then((res)=> {
          //   adminPassword = res.data.password;
          // })
          // if (res) {
          //   if (res == adminPassword) {
          //     navigate('/admin');
          //     ok = true;
          //   } else {
          //     await alert('오류', '비밀번호 오류');
          //   }
          // } else {
          //   ok = true;
          // }
        });
      }
    } else {
      console.log(
        'You must hold both the "4" and "r" keys while clicking the logo!',
      );
    }
  };

  return (
    <nav className="side-menu">
      <h1>
        <img src={YuseonIc} alt="yuseong-icon" onClick={handleLogoClick} />
        <span>노은도서관</span>
      </h1>
      <div>
        <TestButton />
        <Link to="">좌석예약</Link>
        <Link to="/suggest">문의사항</Link>
      </div>
    </nav>
  );
}

export default SideMenu;
