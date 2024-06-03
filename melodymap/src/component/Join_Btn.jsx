import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal"; // 모달 컴포넌트 가져오기

const Join_Btn = ({ userID, userPW, name, birthday, gender }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleJoin = async () => {
    try {
      const response = await axios.post(
        "https://jo07xi8kmg.execute-api.ap-northeast-2.amazonaws.com",
        {
          UserID: userID,
          UserPW: userPW,
          Name: name,
          Birthday: birthday,
          Gender: gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "spring.cloud.function.definition": "join",
          },
        }
      );
      if (response.data === "User joined successfully") {
        // 회원가입 성공 시 수행할 동작
        setModalMessage("회원가입 성공");
        setModalOpen(true);
        setTimeout(() => navigate("/"), 1000); // 1초 후에 메인 페이지로 이동
      } else {
        // 회원가입 실패 시 수행할 동작
        setModalMessage("회원가입 실패: " + response.data);
        setModalOpen(true);
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      setModalMessage("회원가입 중 오류가 발생했습니다.");
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button className="button16" onClick={handleJoin}>
        회원가입
      </button>
      <Modal isOpen={modalOpen} message={modalMessage} onClose={closeModal} />
    </>
  );
};

export default Join_Btn;
