import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/travelwrite.css";
import SideBar from "./SideBar";
import axios from "axios";
import s3 from "../awsConfig"; // 상대 경로로 awsConfig를 임포트합니다.
import Modal from "./Modal"; // 모달 컴포넌트를 임포트합니다.

const Travelwrite = () => {
  const [title, setTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const author = sessionStorage.getItem("userID");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevUrls) => [...prevUrls, ...filePreviews]);
  };

  const handleImageClick = (url) => {
    setReviewContent(
      (prevContent) =>
        `${prevContent}<img src="${url}" alt="Image" style="width:100%; max-width:400px;"/>`
    );
  };

  const uploadImagesToS3 = async (files) => {
    const uploadPromises = files.map((file) => {
      const params = {
        Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
        Key: `${Date.now()}_${file.name}`,
        Body: file,
        ContentType: file.type,
      };

      return s3.upload(params).promise();
    });

    try {
      const uploadResults = await Promise.all(uploadPromises);
      return uploadResults.map((result) => result.Location);
    } catch (error) {
      console.error("Error uploading images: ", error);
      throw new Error("Image upload failed");
    }
  };

  const handleSave = async () => {
    try {
      let imageUrls = [];
      if (imageFiles.length > 0) {
        imageUrls = await uploadImagesToS3(imageFiles);
      }

      const response = await axios.post(
        "https://jo07xi8kmg.execute-api.ap-northeast-2.amazonaws.com",
        {
          commentTitle: title,
          author: author,
          content: reviewContent,
          imageUrls: imageUrls,
          date: new Date().toLocaleDateString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "spring.cloud.function.definition": "addComment",
          },
        }
      );
      if (response.data) {
        setModalMessage("후기 작성 완료");
        setIsModalOpen(true);
      }
    } catch (error) {
      setModalMessage("후기 작성 중 오류 발생");
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (modalMessage === "후기 작성 완료") {
      navigate("/travelboard");
    }
  };

  return (
    <div className="containerT">
      <div className="wrapperT">
        <div className="contentT">
          <SideBar />
          <div style={{ width: "330px" }} className="marginT">
            <p className="boardT" style={{ width: "330px" }}>
              여행 후기 작성
            </p>
          </div>
          <div>
            <div className="titleT">
              <p className="titlep">제목</p>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="resultT">
              <p className="resultp">작성자 : </p>
              <p>{author}</p>
            </div>
            <div className="imageT">
              <p className="imagep">이미지</p>
              <input type="file" multiple onChange={handleImageChange} />
            </div>
            <div className="previewT">
              {previewUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`preview ${index}`}
                  style={{ width: "100px", height: "100px", margin: "5px" }}
                  onClick={() => handleImageClick(url)}
                />
              ))}
            </div>
            <div className="contentT">
              <p>후기 내용</p>
              <textarea
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                style={{ width: "330px", height: "330px" }}
              />
            </div>
            <button onClick={handleSave} className="saveT">
              저장
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Travelwrite;
