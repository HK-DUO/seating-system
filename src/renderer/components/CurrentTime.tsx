import {getCurrentTime} from "../utils/getTime";
import {useState} from "react";


function CurrentTime() {
  const today = new Date();

  const [time, setTime] = useState(getCurrentTime());

  setInterval(() => {
    setTime(getCurrentTime());
  },1);

  return <div className="w-full h-[100px] flex justify-center items-center text-white text-[36px] font-[700]">
    <span>{time}</span>
  </div>
}


export default CurrentTime;
