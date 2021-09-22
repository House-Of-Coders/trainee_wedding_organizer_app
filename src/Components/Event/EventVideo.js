import React from "react";
import "./css/EventVideo.css";

function EventVideo({ data }) {
  return (
    <video
      controls
      width="500"
      height="400"
      className="eventscreen_video"
      placeholder="https://images.unsplash.com/photo-1561424412-6c2125ecb1cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fyb3VzZWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
    >
      <source
        src={data}
        type="video/mp4"
        className="eventscreen_video_source"
      />
    </video>
  );
}

export default EventVideo;
