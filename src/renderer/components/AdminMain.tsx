import "../styles/AdminMain.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LOG_DTO } from "../../main/data/type/Dto.type";
import { ResponseEntity } from "../../main/data/class/Response.class";


function AdminMain() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchDate, setSearchDate] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [logs, setLogs] = useState<LOG_DTO[]>([]);
  const logsPerPage = 10;

  // 데이터 로딩 함수
  const loadLogs = async () => {
    console.log("loadLogs 실행");
    try {
      const logs = await window.electron.viewAllLog() as ResponseEntity<LOG_DTO[]>;
      console.log(logs.data);
      setLogs(logs.data);
    } catch (error) {
      console.error('Failed to load logs:', error);
    }
  };

  useEffect(() => {
    console.log("admin-main: log - userEffect");
    loadLogs();
  }, []);

  // 검색 필터
  const filteredLogs = logs.filter(
    log =>
      (searchDate === "" || new Date(log.timestamp).toISOString().slice(0, 10) === searchDate) &&
      (searchPhone === "" || log.phoneNumber.includes(searchPhone))
  );

  // 페이지에 맞는 로그 데이터 자르기
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleAppClose = () => {
    // Request the main process to close the app
    window.electron.requestAppClose();
  };

  return (
    <div className="admin-main">
      {/* 검색 섹션 */}
      <div className="search-section">
        <label>날짜 검색:</label>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <label>전화번호 검색:</label>
        <input
          type="text"
          placeholder="전화번호를 입력하세요"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
        />
      </div>
      <div className="log-table">
        <table>
          <thead>
          <tr>
            <th>로그 ID</th>
            <th>열람실</th>
            <th>좌석</th>
            <th>기능</th>
            <th>유저 닉네임</th>
            <th>유저 전화번호</th>
            <th>시간</th>
            <th>날짜</th>
          </tr>
          </thead>
          <tbody>
          {currentLogs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.room}</td>
              <td>{log.seat}</td>
              <td>{log.function}</td>
              <td>{log.nickname}</td>
              <td>{log.phoneNumber}</td>
              <td>{new Date(log.timestamp).toISOString().slice(0, 10)}</td>
              <td>{new Date(log.timestamp).toLocaleTimeString()}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      {/* 페이지네이션 */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          이전 페이지
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          다음 페이지
        </button>
      </div>
      <div>
        {/* Admin-only close button */}
        <button onClick={handleAppClose}>앱 종료</button>
      </div>
    </div>
  );
}

export default AdminMain;
