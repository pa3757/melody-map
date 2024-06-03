// 공유 함수들 정의
const { Kakao } = window;

// Kakao 공유 함수
const shareKakao = (choice) => {
  Kakao.Share.createCustomButton({
    container: "#kakaotalk-sharing-btn",
    templateId: 107894,
    templateArgs: {
      title: "제목 영역입니다.",
      description: "설명 영역입니다.",
      path: choice,
    },
  });
};

// NAVER 공유 함수
function shareNaver(choice) {
  const title = "당신의 취향대로 떠나는 특별한 여행지 추천";
  const url = `https://smhrd-melodymap.com/resultshare?choice=${choice}`;
  window.open(
    `https://share.naver.com/web/shareView?url=${url}&title=${title}`
  );
}

// Facebook 공유 함수
function shareFacebook(choice) {
  const title = "당신의 취향대로 떠나는 특별한 여행지 추천";
  const url = `https://smhrd-melodymap.com/resultshare?choice=${choice}`;
  window.open(
    `http://www.facebook.com/sharer/sharer.php?u=${url}&title=${title}`
  );
}

// Twitter 공유 함수
function shareTwitter(choice) {
  const text = "당신의 취향대로 떠나는 특별한 여행지 추천";
  const url = `https://smhrd-melodymap.com/resultshare?choice=${choice}`;
  window.open(`https://twitter.com/intent/tweet?text=${url}${text}`);
}

// Telegram 공유 함수
function shareTelegram(choice) {
  const text = "당신의 취향대로 떠나는 특별한 여행지 추천";
  const url = `https://smhrd-melodymap.com/resultshare?choice=${choice}`;
  window.open(`https://telegram.me/share/url?url=${url}&text=${text}`);
}

export { shareKakao, shareNaver, shareFacebook, shareTwitter, shareTelegram };
