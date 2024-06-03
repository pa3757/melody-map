import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/travelboard.css";
import SideBar from "./SideBar";

const Btn9 = {
  background: "none",
  border: "none",
  fontsize: "18px",
  cursor: "pointer",
  marginbottom: "10px",
  fontweight: "bold",
  marginTop: "30px",
};

const TravelBoard = () => {
  const navigate = useNavigate();
  const [travelEntries, setTravelEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 7; // 페이지당 항목 수

  useEffect(() => {
    const fetchTravelEntries = async () => {
      try {
        const response = await axios.post(
          "https://jo07xi8kmg.execute-api.ap-northeast-2.amazonaws.com",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "spring.cloud.function.definition": "scanComment",
            },
          }
        );
        if (response.data) {
          const entries = response.data.map((item, index) => ({
            id: index,
            title: item.commentTitle,
            author: item.author,
            date: item.date,
            content: item.content,
            imageUrls: item.imageUrls,
          }));
          setTravelEntries(entries);
        }
      } catch (error) {
        console.error("Failed to fetch travel entries:", error);
      }
    };

    fetchTravelEntries();
  }, []);

  const getShortTitle = (title) => {
    return title && title.length > 8 ? title.slice(0, 8) + "..." : title;
  };

  const handleRowClick = (entry) => {
    navigate(`/reviewdetail/${entry.id}`, { state: entry });
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지에 표시할 항목 계산
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = travelEntries.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  // 페이지 번호 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(travelEntries.length / entriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container9">
      <div className="wrapper9">
        <SideBar />
        <div className="content9">
          <div>
            <p className="board9">여행 후기 게시판</p>
          </div>
          <div>
            <table className="table9">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>여행후기</th>
                  <th>작성자</th>
                  <th>작성일시</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "14px" }}>
                {currentEntries.map((entry, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(entry)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{indexOfFirstEntry + index + 1}</td>
                    <td>{getShortTitle(entry.title)}</td>
                    <td>{entry.author}</td>
                    <td>{entry.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={number === currentPage ? "active" : ""}
                  style={Btn9}
                >
                  {number}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                navigate("/travelwrite");
              }}
              className="write9"
            >
              글쓰기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelBoard;
