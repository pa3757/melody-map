import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/reviewdetail.css";
import SideBar from "./SideBar";

const ReviewDetail = () => {
  const location = useLocation();
  const entry = location.state;
  const navigate = useNavigate();

  if (!entry) {
    return <div>해당 후기를 찾을 수 없습니다.</div>;
  }

  // entry.content가 null 또는 undefined인 경우 빈 문자열로 설정
  const content = entry.content || "";

  // 줄바꿈 문자를 <br> 태그로 변환
  const formattedContent = content.replace(/\n/g, "<br>");

  return (
    <div className="containerRD">
      <div className="wrapperRD">
        <SideBar />
        <div className="contentRD">
          <div className="headerRD">
            <p className="titleRD">{entry.title}</p>
            <p className="nameRD">작성자: {entry.author}</p>
          </div>
          <div className="lineRD"></div>
          <div>
            {entry.imageUrls &&
              entry.imageUrls.length > 0 &&
              entry.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={decodeURIComponent(url)}
                  alt={`Review ${index}`}
                  style={{ height: "100px", width: "100px", margin: "10px" }}
                />
              ))}
          </div>
          <div className="reviewRD">
            <div
              style={{
                fontSize: "12px",
                fontWeight: 100,
                fontFamily: "Malgun Gothic",
                textAlign: "left",
              }}
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
            <button onClick={() => navigate("/travelboard")} className="saveRD">
              목록보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
