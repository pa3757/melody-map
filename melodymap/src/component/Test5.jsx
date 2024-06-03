import React from "react";
import { useNavigate } from "react-router-dom";
import { useTest } from "../context/TestContext";
import TestProgress from "./TestProgress";
import "../css/Test.css";
import SideBar from "./SideBar";

const Test5 = () => {
  const navigate = useNavigate();
  const { addSelection } = useTest();
  const currentStep = 5;
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
        <h1 className="question">Q 05.</h1>
        <div className="content">
          햇빛이 뜨거운 여름 날씨, 흥미가 생기는
          <br /> 여행 코스는?
        </div>
        <div className="info">
          <button onClick={() => handleButtonClick("Z")} className="que1">
            이런 더운날에는 스포츠 레저가 최고지! 바다로 가자!
          </button>
          <button onClick={() => handleButtonClick("M")} className="que2">
            더운날에는 등산 한 번 하고 내려오는 길에 막걸리 한 잔 하는게 최고지!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test5;
