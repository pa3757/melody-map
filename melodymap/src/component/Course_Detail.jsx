import React from "react";
import { useLocation } from "react-router-dom";
import "../css/Test.css";
import SideBar from "./SideBar";

const CourseDetail = () => {
  const location = useLocation();
  const { course } = location.state || {};
  console.log(course);

  // course 객체가 존재하는지 확인합니다.
  if (!course) {
    return (
      <div className="container">
        <div className="wrapper">
          <h1>No Course Data Available</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="wrapper">
        <SideBar />
        <h1>{course.courseName}</h1>
        <p>소요시간 : {course.courseTime}</p>
        <p>총 거리 : {course.courseDistance}</p>
        <p>코스 개요</p>
        <p>{course.courseInfo}</p>
        {course.courseDesc.map((desc, index) => (
          <div key={index}>
            <h3>{desc.coursePoi}</h3>
            <p>{desc.courseOutline}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;
