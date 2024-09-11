import "../styles/InquireMain.css"

function InquireMain() {
  return <div className="inquire-main">
    <div>
      <label>제목</label>
      <input placeholder="제목" type="text"/>
    </div>
    <div>
      <label>내용</label>
      <textarea placeholder="내용을 입력하세요"/>
    </div>
    <div>
      <button>등록</button>
    </div>
  </div>;
}

export default InquireMain;
