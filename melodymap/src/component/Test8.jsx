import React from "react";
import { useNavigate } from "react-router-dom";
import { useTest } from "../context/TestContext";
import TestProgress from "./TestProgress";
import "../css/Test.css";
import SideBar from "./SideBar";

const Test8 = () => {
  const navigate = useNavigate();
  const { addSelection } = useTest();
  const currentStep = 8;
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
        <h1 className="question">Q 08.</h1>
        <div className="content">
          여행 장소를 고를 때,
          <br /> 가장 중요하게 고려하는 요소는?
        </div>
        <div className="info">
          <button onClick={() => handleButtonClick("L")} className="que1">
            에너지 넘치고 시끌벅적한 여행지
          </button>
          <button onClick={() => handleButtonClick("Q")} className="que2">
            조용하고 평화로운 여행지
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test8;
