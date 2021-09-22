import React from "react";
import "./css/Slide.css";

function Slide({ item }) {
  return (
    <div className="slide" style={{ backgroundImage: `url(${item})` }}></div>
  );
}

export default Slide;
