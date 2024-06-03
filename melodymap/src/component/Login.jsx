import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import SideBar from "./SideBar";
import Login_Btn from "./Login_Btn";

const Login = () => {
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      document.getElementById("loginButton").click();
    }
  };

  return (
    <div className="container5">
      <div className="wrapper5">
        <div className="content5">
          <SideBar />
          <h1 className="login5">LOGIN</h1>
          <input
            className="input15"
            type="text"
            placeholder="ID를 입력해주세요"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <br />
          <input
            className="input25"
            type="password"
            placeholder="PW를 입력해주세요"
            value={userPW}
            onChange={(e) => setUserPW(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div>
            <button className="button15" onClick={() => navigate("/Join")}>
              회원가입
            </button>
            <Login_Btn userID={userID} userPW={userPW} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
