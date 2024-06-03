import React from "react";
import { useNavigate } from "react-router-dom";
import { useTest } from "../context/TestContext";
import TestProgress from "./TestProgress";
import "../css/Test.css";
import SideBar from "./SideBar";

const Test9 = () => {
  const navigate = useNavigate();
  const { addSelection } = useTest();
  const currentStep = 9;
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
        <h1 className="question">Q 09.</h1>
        <div className="content">
          친구들과 여행 계획을
          <br /> 세우려고 한다. <br />
          선호하는 일정은?
        </div>
        <div className="info">
          <button onClick={() => handleButtonClick("B")} className="que1">
            난 집 아닌 곳에서 못자.. 당일치기로 가자
          </button>
          <button onClick={() => handleButtonClick("X")} className="que2">
            모든 에너지를 쏟아서 놀고 와야지 1박2일 고고!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test9;
