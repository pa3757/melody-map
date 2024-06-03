import React, { useEffect, useRef } from "react";
import "../css/TestProgress.css";

const TestProgress = ({ currentStep, totalSteps }) => {
  const progressRef = useRef(null);

  useEffect(() => {
    if (progressRef.current) {
      // 애니메이션을 초기화하고 자연스럽게 진행되도록 합니다.
      progressRef.current.style.transition = "none";
      progressRef.current.style.width = "0";
      setTimeout(() => {
        progressRef.current.style.transition = "width 0.7s ease-in-out";
        progressRef.current.style.width =
          (currentStep / totalSteps) * 100 + "%";
      }, 50);
    }
  }, [currentStep, totalSteps]);

  return (
    <div className="progress-bar">
      <div
        className="progress"
        ref={progressRef}
      >{`${currentStep}/${totalSteps}`}</div>
    </div>
  );
};

export default TestProgress;
