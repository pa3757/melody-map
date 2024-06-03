import React from "react";
import { useNavigate } from "react-router-dom";
import { useTest } from "../context/TestContext";
import TestProgress from "./TestProgress";
import "../css/Test.css";
import SideBar from "./SideBar";

const Test6 = () => {
  const navigate = useNavigate();
  const { addSelection } = useTest();
  const currentStep = 6;
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
        <h1 className="question">Q 06.</h1>
        <div className="content">
          생각만 해도 즐거운
          <br /> 여행가는 날! <br />
          당신의 목적은?
        </div>
        <div className="info">
          <button onClick={() => handleButtonClick("O")} className="que1">
            답답한 도시를 떠나 자연 경치를 보면서 힐링!
          </button>
          <button onClick={() => handleButtonClick("D")} className="que2">
            여행은 맛집을 찾아 다니면서 먹스타그램 하는거지!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test6;
