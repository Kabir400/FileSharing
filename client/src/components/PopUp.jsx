import React from "react";

const PopUp = ({ msg }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-popup">
        <p className="loading-message">{msg}</p>
      </div>
    </div>
  );
};

export default PopUp;
