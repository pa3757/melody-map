import React from "react";
import { useNavigate } from "react-router-dom";

import "../css/Test.css";
import CourseBtn from "./Course_Btn";
import SideBar from "./SideBar";

const CourseRecom = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="wrapper">
        <SideBar />
        <div>
          <h1>여행지 선택</h1>
          <CourseBtn course_region={"강진"} />
          <CourseBtn course_region={"고흥"} />
          <CourseBtn course_region={"광양"} />
          <br />
          <CourseBtn course_region={"구례"} />
          <CourseBtn course_region={"나주"} />
          <CourseBtn course_region={"담양"} />
          <br />
          <CourseBtn course_region={"목포"} />
          <CourseBtn course_region={"무안"} />
          <CourseBtn course_region={"보성"} />
          <br />
          <CourseBtn course_region={"순천"} />
          <CourseBtn course_region={"신안"} />
          <CourseBtn course_region={"여수"} />
          <br />
          <CourseBtn course_region={"영광"} />
          <CourseBtn course_region={"영암"} />
          <CourseBtn course_region={"완도"} />
          <br />
          <CourseBtn course_region={"장흥"} />
          <CourseBtn course_region={"진도"} />
          <CourseBtn course_region={"하동"} />
          <br />
          <CourseBtn course_region={"함평"} />
          <CourseBtn course_region={"해남"} />
          <CourseBtn course_region={"화순"} />
        </div>
      </div>
    </div>
  );
};

export default CourseRecom;
