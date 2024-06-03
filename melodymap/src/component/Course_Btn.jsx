import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CourseBtn = ({ course_region }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const CourseScan = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "https://jo07xi8kmg.execute-api.ap-northeast-2.amazonaws.com",
        {
          Course_region: course_region,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "spring.cloud.function.definition": "scanCourses",
          },
        }
      );
      if (res.data) {
        navigate("/coursepreview", { state: { data: res.data } });
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [course_region, navigate]);

  return (
    <>
      <button
        onClick={CourseScan}
        style={{
          backgroundColor: "white",
          color: "black",
          fontSize: "large",
          fontWeight: "400",
          border: "1px solid #05e3eb",
          width: "80px",
          height: "40px",
          borderRadius: "10px",
          cursor: "pointer",
          margin: "10px",
        }}
        disabled={loading}
      >
        {loading ? "Loading..." : course_region}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default CourseBtn;
