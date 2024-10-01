// Loading.js
import React from "react";
import "./Loading.css"; // Create this CSS file for styling

const Loading = ({ progress }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-popup">
        <div className="loading-bar" style={{ width: `${progress}%` }} />
        <div className="loading-text">{progress}%</div>
        <p className="loading-message">Uploading...</p>
      </div>
    </div>
  );
};

export default Loading;
