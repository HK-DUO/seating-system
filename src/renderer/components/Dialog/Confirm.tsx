type PropsType = {
  message: string;
  subMessage: string;
  onClickOk: () => void;
  onClickCancel: () => void;
};

function Confirm({ message, subMessage, onClickOk, onClickCancel }: PropsType) {
  return (
    <div className="min-w-[220px] bg-blue p-[20px]">
      <h1 className="text-[20px] font-[600] text-center">{message}</h1>
      <p className="mt-[20px] font-[400] whitespace-pre-line text-[14px]">
        {subMessage}
      </p>
      <div className="mt-[20px] flex justify-between items-center">
        <button
          className="w-[80px] p-[6px] rounded-md text-center bg-white"
          onClick={onClickCancel}
        >
          취소
        </button>
        <button
          className="w-[80px] p-[6px] rounded-md text-center bg-white"
          onClick={onClickOk}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default Confirm;
