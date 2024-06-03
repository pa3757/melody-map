import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal"; // 모달 컴포넌트 가져오기

const Login_Btn = ({ userID, userPW }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://jo07xi8kmg.execute-api.ap-northeast-2.amazonaws.com",
        {
          UserID: userID,
          UserPW: userPW,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "spring.cloud.function.definition": "login",
          },
        }
      );
      if (response.data) {
        // 로그인 성공 시 수행할 동작
        sessionStorage.setItem("userID", response.data.UserID);
        setModalMessage("로그인 성공");
        setModalOpen(true);
        setTimeout(() => navigate("/"), 1000); // 1초 후에 메인 페이지로 이동
      } else {
        // 로그인 실패 시 수행할 동작
        setModalMessage("로그인 실패: " + response.data);
        setModalOpen(true);
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      setModalMessage("로그인 중 오류가 발생했습니다.");
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button id="loginButton" className="button25" onClick={handleLogin}>
        로그인
      </button>
      <Modal isOpen={modalOpen} message={modalMessage} onClose={closeModal} />
    </>
  );
};

export default Login_Btn;
