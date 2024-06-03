import React from "react";
import { useNavigate } from "react-router-dom";
import { useTest } from "../context/TestContext";
import TestProgress from "./TestProgress";
import "../css/Test.css";
import SideBar from "./SideBar";

const Test3 = () => {
  const navigate = useNavigate();
  const { addSelection } = useTest();
  const currentStep = 3;
  const totalSteps = 10;

  const handleButtonClick = (selection) => {
    addSelection(selection);
    navigate(`/test${currentStep + 1}`);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <SideBar />
        <TestProgress currentStep={currentStep} totalSteps={totalSteps} />
        <h1 className="question">Q 03.</h1>
        <div className="content">
          동전이 들어가면 사랑에 성공한다는 분수대에 도착 이때 당신의 생각은?
        </div>
        <div className="info">
          <button onClick={() => handleButtonClick("T")} className="que1">
            저거 동전 다 모으면 얼마지? 관리소에서 회수해 가는건가?...
          </button>
          <button onClick={() => handleButtonClick("F")} className="que2">
            우와.. 낭만적이다 꼭 한 번에 성공해야지!!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test3;
