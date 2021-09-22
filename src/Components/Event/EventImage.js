import React from "react";
import "./css/EventImage.css";

function EventImage({ data }) {
  return (
    <div className="eventscreen_image_container">
      <img src={data} className="eventscreen_image" />
    </div>
  );
}

export default EventImage;
