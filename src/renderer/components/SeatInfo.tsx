function SeatInfo(){
  return <div className="w-full h-[60px] mt-[20px] rounded-md bg-white p-[6px]">
    <div className="flex items-center">
      <div className="w-[40px] h-[16px] mr-[10px] bg-light-blue"/>
      <span>- 사용가능</span>
    </div>
    <div className="flex items-center">
      <div className="w-[40px] h-[16px] mr-[10px] bg-red"/>
      <span>- 사용불가</span>
    </div>
  </div>;
}

export default SeatInfo;
