import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/result.css";
import Modal from "./Modal"; // 모달 컴포넌트 임포트

const ResultSave = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { music, place } = location.state || {};
  const userID = sessionStorage.getItem("userID");

  // music과 place 데이터를 개별적으로 확인
  // console.log("Music Data:", music);
  // console.log("Place Data:", place);

  // music과 place 배열을 합쳐서 새로운 배열 생성
  const userResult = [music, place];

  const saveButtonStyle = {
    backgroundColor: "rgb(212, 241, 253)",
    width: "220px",
    height: "50px",
    fontSize: "24px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40px",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "40px",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const saveResult = async () => {
    try {
      const res = await axios.post(
        "https://jo07xi8kmg.execute-api.ap-northeast-2.amazonaws.com",
        {
          UserID: userID,
          userResult: userResult,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "spring.cloud.function.definition": "updateUserData",
          },
        }
      );
      if (res.data) {
        navigate("/mypage");
      } else {
      }
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <div>
      <button
        onClick={() => {
          if (userID) {
            saveResult();
          } else {
            setModalMessage("로그인이 필요합니다");
            setIsModalOpen(true);
          }
        }}
        style={saveButtonStyle}
      >
        결과 저장하기
      </button>
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default ResultSave;
