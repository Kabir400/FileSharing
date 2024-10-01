import React from "react";
import { Link } from "react-router-dom";
function FileExpire() {
  return (
    <div className="hero-container">
      <p>Sorry! Looks like your file has expired!</p>
      <Link to={"/"} className="home-link">
        Go To Home
      </Link>
    </div>
  );
}

export default FileExpire;
