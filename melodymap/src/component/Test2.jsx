import React from "react";
import { useNavigate } from "react-router-dom";
import { useTest } from "../context/TestContext";
import TestProgress from "./TestProgress";
import "../css/Test.css";
import SideBar from "./SideBar";

const Test2 = () => {
  const navigate = useNavigate();
  const { addSelection } = useTest();
  const currentStep = 2;
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
        <h1 className="question">Q 02.</h1>
        <div className="content">
          기다리던 여행날!
          <br /> 벌써 잠들 시간이다. <br />
          당신의 선택은?
        </div>
        <div className="info">
          <button onClick={() => handleButtonClick("N")} className="que1">
            흠.. 일기예보는 괜찮았는데 비가 오지는 않겠지?
          </button>
          <button onClick={() => handleButtonClick("S")} className="que2">
            내일 재밌게 놀려면 바로 자야지!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test2;
