import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "./SideBar";

const Resultshare = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const choice = searchParams.get("choice");
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const mbtiCharacteristics = {
    INTP: {
      text: "사색적 여행가",
      color: "#3f3f3f",
      tags: "#..생각중 #상상더하기",
      description:
        "철학, 사색, 아이디어에 목마른 여행가! 생각할 수 있게 하는 여행지로 향해 사색에 빠지는걸 좋아하는 타입",
    },
    INTJ: {
      text: "전략적 여행가",
      color: "#e63e4f",
      tags: "#전시회 #자연의 아름다움 #고앵이최고",
      description:
        "계획 세우는 것부터 시작해서 여행가기 전부터 기빨리는.. 그치만 여행을 떠나면 누구보다 알차게 놀고 오는 여행가!",
    },
    INFP: {
      text: "꿈꾸는 여행가",
      color: "#ec96ef",
      tags: "#나두좋아 #소품샵좋아",
      description:
        "갈까말까 .. 집이 최고지만 어쩌다 이끌려 가버린 여행! 그러나 도착하면 행복해하는 귀염뽀작한 여행가",
    },
    INFJ: {
      text: "따뜻한 여행가",
      color: "#ccb1de",
      tags: "#나만의시간 #둘만의시간",
      description:
        "조용하게 놀다오는게 좋아 ! 여행의 마무리는 포근한 침대에서 영화보면서 잠들기 !",
    },
    ENTP: {
      text: "탐험적 여행가",
      color: "#d6c7b9",
      tags: "#핫플 #일단출발 #여행은쇼핑",
      description:
        "여기 핫플은 어디지? 새로운 곳을 가도 기가막히게 핫한 곳을 찾아다니는 여행가!",
    },
    ENTJ: {
      text: "완벽주의 여행가",
      color: "#b3eaa6",
      tags: "#성공적인여행 #이게나야 #패키지여행가능",
      description:
        "여행떠나기 전부터 모든 계획을 세워둔 여행가! 맛집 브레이크 타임, 휴무 체크는 필수! 사실 플랜 C까지 세워둔건 안 비밀! 내 여행은 완벽해야해😎",
    },
    ENFP: {
      text: "신나는 여행가",
      color: "#d4f29c",
      tags: "#나는야 #럭키여행가 #원영적사고",
      description:
        "꺄아 너무신나 ! 어디로 갈까? 발길이 닿는 곳으로 가자! 무인도에 떨어져도 여행할 수 있는 당신은 럭키비키잖앙💜",
    },
    ENFJ: {
      text: "온화한 여행가",
      color: "#f99fae",
      tags: "#모두의여행 #배려의아이콘",
      description:
        "여행에서는 모두를 배려하며 온화하게 이끄는 여행가! 친구들의 행복이 내 행복!",
    },
    ISTP: {
      text: "피곤한 여행가",
      color: "#48518f",
      tags: "#대충살자 #귀찮아 #그래도너만좋다면갈게",
      description:
        "'귀찮아..숙소에 있고싶다..' 라고 생각하지만 의외로 잘 돌아다니는 여행가. 옆에서 누가 쫑알거리면 가긴 가준다 ! 애인한정 다정다감한 당신",
    },
    ISTJ: {
      text: "철저한 여행가",
      color: "#9d9c97",
      tags: "#주도면밀 #용의주도 #실패없는여행",
      description:
        "꼼꼼하게 플랜을 세운후 지킨다 ! 하나부터 열까지 챡챡! 한달 전부터 모든 플랜을 세워둔다! (변수까지도 예상한다!)",
    },
    ISFP: {
      text: "감성적인 여행가",
      color: "#fff06d",
      tags: "#예술감성 #감성충만",
      description:
        "자연과 예술을 사랑하는 여행가! 아름다운 경치와 예술작품을 감상하며 감성 충전!",
    },
    ISFJ: {
      text: "따스한 여행가",
      color: "#81b2ff",
      tags: "#따뜻한사람 #다정다감",
      description:
        "의견을 모아모아 모두가 만족할만한 곳들로 간다 ! 모두가 좋아할만한 곳이 어딜까? 꼼꼼하게 계획을 세워주는 우리의 수호천사!",
    },
    ESTP: {
      text: "시원한 여행가",
      color: "#a9ebd6",
      tags: "#액티비티 #흥미진진",
      description:
        "역동적이고 모험을 즐기는 여행가! 어디서든 재미있고 시원한 액티비티를 찾아낸다",
    },
    ESTJ: {
      text: "지도적인 여행가",
      color: "#ffbf96",
      tags: "#호불호 #싫은건안해 #좋은건해!",
      description:
        "계획은 기본! 내가 좋아하는걸로 가득 채운 여행이 좋아 ! 나랑 같이 가면 재밌을걸? 나를 따르라!",
    },
    ESFP: {
      text: "사교적인 여행가",
      color: "#9fd8f9",
      tags: "#파티피플 #햅삐 #핫플",
      description:
        "친구들과 함께 떠나는 여행이 좋아! 사람들 많이 모인곳이 어디지? 재밌겠다 가보자!",
    },
    ESFJ: {
      text: "친화적인 여행가",
      color: "#faee9d",
      tags: "#꺄앙 #죠아죠아",
      description:
        "리액션이 좋고 새로운 사람들도 잘 사귀는 여행가! 여행지에서 처음 만난 사람도 내 친구가 될수 있어!",
    },
  };

  const sendDataToServer = async (choice) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://jo07xi8kmg.execute-api.ap-northeast-2.amazonaws.com",
        {
          choice: choice,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "spring.cloud.function.definition": "getChoice",
          },
        }
      );
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (choice) {
      sendDataToServer(choice);
    }
  }, [choice]);

  const renderTitle = () => {
    const key = Object.keys(mbtiCharacteristics).find((key) =>
      choice.includes(key)
    );
    if (key) {
      return (
        <h1 className="d1R">
          당신은
          <br />
          <span
            className="recoR"
            style={{ color: mbtiCharacteristics[key].color }}
          >
            {mbtiCharacteristics[key].text}
          </span>
        </h1>
      );
    }
    return null;
  };

  const distributeMusic = (musicArray, placeArray) => {
    const chunkSize = 5;
    return placeArray.map((place, index) => {
      const start = index * chunkSize;
      return {
        ...place,
        music: musicArray.slice(start, start + chunkSize),
      };
    });
  };

  const placesWithMusic =
    data?.music && data?.places ? distributeMusic(data.music, data.places) : [];

  const TagTitle = () => {
    const key = Object.keys(mbtiCharacteristics).find((key) =>
      choice.includes(key)
    );
    if (key) {
      return (
        <div className="tag-title">
          <p>{mbtiCharacteristics[key].tags}</p>
          <p>{mbtiCharacteristics[key].description}</p>
          <b>※사진을 클릭하면 세부정보와</b>
          <br />
          <b>&nbsp;&nbsp;&nbsp;음악추천을 받을 수 있어요!</b>
          <br />
          <br />
        </div>
      );
    }
    return null;
  };

  const renderPoiTags = (tags) => {
    if (typeof tags === "string") {
      // 문자열을 배열로 변환
      try {
        tags = JSON.parse(tags.replace(/'/g, '"'));
      } catch (error) {
        console.error("Error parsing tags:", error);
        tags = [];
      }
    }

    if (!Array.isArray(tags)) return "";

    const displayedTags = tags.slice(0, 5);
    const additionalTags = tags.length > 5 ? "..." : "";

    return displayedTags.join(", ") + additionalTags;
  };

  return (
    <div className="containerR">
      <div className="wrapperR">
        <SideBar />
        <div className="contentR">
          {renderTitle()}
          {TagTitle()}
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {placesWithMusic &&
            placesWithMusic
              .slice(0, showRecommendation ? placesWithMusic.length : 1)
              .map((place, index) => (
                <div className="image-wrapperR" key={index}>
                  <div className="center1R">
                    <button className="musicR">
                      <img
                        src={place.img_rname}
                        alt="Main Image"
                        className="imageR"
                      />
                    </button>
                    <div className="explain0R">
                      <p className="explain1R">
                        {renderPoiTags(place.poi_tag)}
                      </p>
                      <p className="explain2R">{place.poi_name}</p>
                    </div>
                  </div>
                </div>
              ))}
          <button
            className="reco2R"
            onClick={() => setShowRecommendation(!showRecommendation)}
          >
            {showRecommendation ? "숨기기" : "+ 더보기"}
          </button>
          <button className="reco2R" onClick={() => navigate("/")}>
            나도추천받기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resultshare;
