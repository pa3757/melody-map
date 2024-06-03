import React from "react";
import { useNavigate } from "react-router-dom";
import { useTest } from "../context/TestContext";
import TestProgress from "./TestProgress";
import "../css/Test.css";
import SideBar from "./SideBar";
const Test7 = () => {
  const navigate = useNavigate();
  const { addSelection } = useTest();
  const currentStep = 7;
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
        <h1 className="question">Q 07.</h1>
        <div className="content">
          나의 여행 스타일은? <br />
        </div>
        <div className="info">
          <button onClick={() => handleButtonClick("A")} className="que1">
            온김에 이것저것 다 해봐야지 ! <br />
            안에만 있으면 뭐해~
          </button>
          <button onClick={() => handleButtonClick("W")} className="que2">
            움직이는건 힘들어,,
            <br /> 쉬어가는 힐링여행이 최고!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test7;
