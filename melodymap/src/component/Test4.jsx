import React from "react";
import { useNavigate } from "react-router-dom";
import { useTest } from "../context/TestContext";
import TestProgress from "./TestProgress";
import "../css/Test.css";
import SideBar from "./SideBar";

const Test4 = () => {
  const navigate = useNavigate();
  const { addSelection } = useTest();
  const currentStep = 4;
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
        <h1 className="question">Q 04.</h1>
        <div className="content">
          점심시간이 되어 차를 <br /> 타고 맛집에 갈 예정이다
          <br /> 이때 당신의 생각은?
        </div>
        <div className="info">
          <button onClick={() => handleButtonClick("J")} className="que1">
            주차할 장소가 있는지 주변을 확인해봐야겠어.
          </button>
          <button onClick={() => handleButtonClick("P")} className="que2">
            일단 가서 자리 있는지 확인하지 뭐
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test4;
