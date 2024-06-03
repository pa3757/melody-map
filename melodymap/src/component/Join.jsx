import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/join.css";
import SideBar from "./SideBar";
import Join_Btn from "./Join_Btn";

const Join = () => {
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [userPW, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirth] = useState("");
  const [gender, setGender] = useState("");

  return (
    <div className="container6">
      <div className="wrapper6">
        <div className="content6">
          <SideBar />
          <h1 className="member6">회원가입</h1>
          <div className="center6">
            <div className="inputContainer6">
              <label htmlFor="idInput" className="labelText6">
                아이디
              </label>
              <input
                id="idInput"
                className="input16"
                type="text"
                placeholder="ID를 입력해주세요"
                value={userID} // 변경된 필드 이름
                onChange={(e) => setUserID(e.target.value)} // 변경된 필드 이름
              />
            </div>

            <div className="inputContainer6">
              <label htmlFor="passwordInput" className="labelText6">
                비밀번호
              </label>
              <input
                id="passwordInput"
                className="input16"
                type="password"
                placeholder="PW를 입력해주세요"
                value={userPW}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="inputContainer6">
              <label htmlFor="nameInput" className="labelText6">
                이름
              </label>
              <input
                id="nameInput"
                className="input16"
                type="text"
                placeholder="이름을 입력해주세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="inputContainer6">
              <label htmlFor="birthInput" className="labelText6">
                생년월일
              </label>
              <input
                id="birthInput"
                className="input16"
                type="text"
                placeholder="생년월일 8글자 입력 (Ex-19960548)"
                value={birthday}
                onChange={(e) => setBirth(e.target.value)}
              />
            </div>

            <div
              className="inputContainer6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <label
                htmlFor="genderInput"
                className="labelText6"
                style={{ marginRight: "10px" }}
              >
                성별 선택
              </label>
              <div>
                <label htmlFor="male">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  남성
                </label>
                <label htmlFor="female">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  여성
                </label>
              </div>
            </div>
          </div>

          <div>
            <Join_Btn
              userID={userID}
              userPW={userPW}
              name={name}
              birthday={birthday}
              gender={gender}
            />
            <button className="button26" onClick={() => navigate(-1)}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
