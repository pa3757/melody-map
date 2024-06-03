import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTest } from "../context/TestContext";
import TestProgress from "./TestProgress";
import axios from "axios";
import "../css/Test.css";
import SideBar from "./SideBar";
import LoadingModal from "./LoadingModal"; // 로딩 모달 컴포넌트 임포트

const Test10 = () => {
  const navigate = useNavigate();
  const { choice, addSelection } = useTest();
  const currentStep = 10;
  const totalSteps = 10;
  const [sleep, setSleep] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const sendDataToServer = async (choice) => {
    setIsLoading(true); // 서버 요청 전 로딩 상태 활성화
    try {
      const response = await axios.post(
        "https://jo07xi8kmg.execute-api.ap-northeast-2.amazonaws.com",
        {
          choice: choice,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "spring.cloud.function.definition": "getChoice",
          },
        }
      );

      navigate("/Result", {
        state: {
          music: response.data.music,
          place: response.data.places,
          sleep: sleep,
        },
      });
    } catch (error) {
      console.error("데이터 요청 중 오류 발생:", error);
    } finally {
      setIsLoading(false); // 서버 요청 후 로딩 상태 비활성화
    }
  };

  useEffect(() => {
    // 마지막 페이지에서만 서버로 데이터 전송
    if (choice.length === 10) {
      sendDataToServer(choice);
    }
  }, [choice, navigate]);

  const handleButtonClick = (selection, sleepOption) => {
    addSelection(selection);
    setSleep(sleepOption);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <SideBar />
        <TestProgress currentStep={currentStep} totalSteps={totalSteps} />
        <h1 className="question">Q 10.</h1>
        <div className="content">
          여행 숙소를 선택하자!
          <br /> 당신의 취향은?
        </div>
        <div className="info">
          <button
            onClick={() => handleButtonClick("R", "motel")}
            className="que1"
          >
            잠만 자는건데 돈 아까워 대충 <br />
            자면 되지! 저렴한 곳으로 가자 !
          </button>
          <button
            onClick={() => handleButtonClick("G", "hotel")}
            className="que2"
          >
            잠은 그래도 편하게 자야지! <br />
            호텔로 가자 ~
          </button>
        </div>
      </div>
      <LoadingModal isOpen={isLoading} /> {/* 로딩 모달 컴포넌트 추가 */}
    </div>
  );
};

export default Test10;
