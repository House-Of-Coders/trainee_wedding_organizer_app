import React from "react";
import "./css/Event.css";
import { useHistory } from "react-router-dom";

function Event({ data }) {
  const history = useHistory();

  return (
    <div className="event">
      <img src={data?.images[0]} className="event_image" />
      <div className="event_details">
        <h1 className="event_title">{data?.title}</h1>
        <p className="event_description">
          {data?.description.length >= 150
            ? `${data?.description.substring(0, 100)}...`
            : data?.description}
        </p>
        <h4 className="event_date"> Held On : {data?.date}</h4>
        <button
          className="event_button button"
          onClick={() =>
            history.push("/buisnessprofile/event/614073b6e0ac1a8a1e486aa6")
          }
        >
          View More
        </button>
      </div>
    </div>
  );
}

export default Event;
