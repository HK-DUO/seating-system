const getCurrentTime = () => {
  const today = new Date();

  if(today.getMinutes() < 10){
    return today.getHours() + " : " + `0${today.getMinutes()}`;
  } else return today.getHours() + " : " + today.getMinutes();

};

const getExitTime = (plusMinutes:number) => {
  const today = new Date();

  today.setMinutes(today.getMinutes()+plusMinutes);

  if(today.getMinutes() < 10){
    return today.getHours() + " : " + `0${today.getMinutes()}`;
  } else return today.getHours() + " : " + today.getMinutes();
}

const getPlusTime = () => {
  const today = new Date();

  if(today.getMinutes() < 10){
    return ((today.getHours() <= 22) ?
      today.getHours() + 2
      : today.getHours() - 22) + " : " + `0${today.getMinutes()}`;
  } else return ((today.getHours() <= 22) ?
    today.getHours() + 2
    : today.getHours() - 22) + " : " + today.getMinutes();
}

export {getPlusTime, getCurrentTime,getExitTime};

