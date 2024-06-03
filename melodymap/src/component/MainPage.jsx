import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Main.css";
import SideBar from "./SideBar";
import { useTest } from "../context/TestContext";

const MainPage = () => {
  const navigate = useNavigate();
  const { resetChoice } = useTest();

  const startTest = () => {
    resetChoice();
    navigate("/test1");
    localStorage.removeItem("visited");
  };

  return (
    <div className="containerM">
      <div className="wrapperM">
        <div className="contentM">
          <SideBar />
          <div className="mainimgM">
            <img
              src={`${process.env.PUBLIC_URL}/image/Main.jpg`}
              alt="Main Image"
              className="imageM"
            />
          </div>
          <div className="infoM">
            <h1 className="fM">당신의 취향대로</h1>
            <h1 className="sM">떠나는 특별한</h1>
            <h1 className="dM">
              여행지 <span className="reco1M">추천</span>
            </h1>
          </div>
          <button onClick={startTest} className="start1M">
            시작하기
          </button>
          <button
            onClick={() => {
              navigate("/courserecom");
            }}
            className="start1M"
          >
            코스 추천 받기
          </button>
          <div className="pbuttonR">
            <br />
            <br />
            <footer>
              ※후기는 로그인 후 작성가능
              <br />
              ※테스트 중에는 Back을 누르지 마세요
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
