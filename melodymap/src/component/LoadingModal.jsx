import React from "react";
import "../css/modal.css";

const LoadingModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
