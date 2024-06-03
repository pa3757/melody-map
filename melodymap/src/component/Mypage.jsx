import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/mypage.css";
import SideBar from "./SideBar";
import axios from "axios";

const Mypage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userMusic, setUserMusic] = useState([]);
  const [userPoi, setUserPoi] = useState([]);
  const userid = sessionStorage.getItem("userID");

  // 사용자 데이터를 가져오는 함수
  const scan = async () => {
    try {
      const res = await axios.post(
        "https://jo07xi8kmg.execute-api.ap-northeast-2.amazonaws.com",
        {
          UserID: userid,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "spring.cloud.function.definition": "scanUsers",
          },
        }
      );
      if (res.data) {
        const userMusicTemp = [];
        const userPoiTemp = [];
        res.data.UserResult.forEach((item, index) => {
          if (index % 2 === 0) {
            userMusicTemp.push(item);
          } else {
            userPoiTemp.push(item);
          }
        });
        setUserMusic(userMusicTemp.reverse());
        setUserPoi(userPoiTemp.reverse());
        setTotalPages(
          Math.ceil(Math.max(userMusicTemp.length, userPoiTemp.length))
        );
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    scan();
  }, []);

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="containermy">
      <div className="wrappermy">
        <SideBar />
        <div className="contentmy">
          <div className="mypageM">
            <p className="mypageTitle">나의 결과</p>
          </div>

          <div className="mypageinfo">
            <p className="recoM">추천받은 여행지</p>
            {userPoi[currentPage - 1] &&
              Array.isArray(userPoi[currentPage - 1]) &&
              userPoi[currentPage - 1].map((poi, index) => (
                <div key={index} className="poiItem">
                  <img
                    className="poiImage"
                    src={poi.img_rname}
                    alt={poi.poi_name}
                  />
                  <p className="poiText">
                    {poi.poi_region} : {poi.poi_name}
                  </p>
                </div>
              ))}
            <p className="recoM">추천받은 음악</p>
            {userMusic[currentPage - 1] &&
              Array.isArray(userMusic[currentPage - 1]) &&
              userMusic[currentPage - 1].map((music, index) => (
                <div key={index} className="musicItem">
                  <img
                    className="musicImage"
                    src={music.music_image}
                    alt={music.music_genre}
                    onClick={() => {
                      window.open(
                        `https://www.youtube.com/results?search_query=${music.music_singer} ${music.music_title}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                  />
                  <p className="musicText">
                    {music.music_singer} : {music.music_title}
                  </p>
                </div>
              ))}
          </div>

          <div className="pagination">
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                disabled={currentPage === page + 1}
                className="BtnM"
              >
                {page + 1}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            navigate("/travelwrite");
          }}
          className="writeM"
        >
          여행후기 쓰기
        </button>
      </div>
    </div>
  );
};

export default Mypage;
