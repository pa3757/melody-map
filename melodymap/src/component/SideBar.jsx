import React, { useState } from "react";
import "../css/sidebar.css";
import { useNavigate } from "react-router-dom";
import { useTest } from "../context/TestContext";
import Modal from "./Modal";

const SideBar = () => {
  const navigate = useNavigate();
  const { resetChoice } = useTest();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const checkLogin = () => {
    if (sessionStorage.getItem("userID")) {
      navigate("/travelboard");
    } else {
      setModalMessage("로그인이 필요합니다");
      setIsModalOpen(true);
      setTimeout(() => navigate("/login"), 1000); // 1초 후에 메인 페이지로 이동
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userID");
    resetChoice();
    setModalMessage("로그아웃 되었습니다");
    setIsModalOpen(true);
    setTimeout(() => navigate("/"), 1000); // 1초 후에 메인 페이지로 이동
  };

  const goBack = () => {
    navigate(-1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="sidebar">
      {sessionStorage.getItem("userID") ? (
        <>
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => navigate("/mypage")}>My</button>
          <button onClick={checkLogin}>Review</button>
          <button onClick={goBack}>Back</button>
        </>
      ) : (
        <>
          <button onClick={() => navigate("/")}>Home</button>
          <button
            onClick={() => {
              resetChoice();
              navigate("/login");
            }}
          >
            Login
          </button>
          <button
            onClick={() => {
              resetChoice();
              navigate("/join");
            }}
          >
            Join
          </button>

          <button onClick={checkLogin}>Review</button>
          <button onClick={goBack}>Back</button>
        </>
      )}
      <Modal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
    </div>
  );
};

export default SideBar;
