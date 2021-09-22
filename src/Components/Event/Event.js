import React, { useEffect, useState } from "react";
import "./css/Event.css";
import axios from "axios";
import Slider from "../Extra Components/Normalsilder";
import Imageslider from "../Extra Components/Imageslider";
import EventImage from "./EventImage";
import EventVideo from "./EventVideo";
import { events } from "../../Assets/vendorsampledata";

function Event({ match }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(async () => {
    await axios
      .get(`http://localhost:5000/event/get-event/${match?.params?.event_id}`)
      .then((res) => {
        setData(res?.data?.event);
        setLoading(false);
      })
      .catch((err) => {
        setData(err?.response?.data);
        setLoading(false);
      });
  }, [match?.params?.event_id]);

  console.log(events[0]);

  return loading ? (
    <h1> Loading</h1>
  ) : (
    <div className="eventscreen">
      <Imageslider items={events[0]?.images} slideno={true} height={500} />
      <div className="eventscreen_content ">
        <div className="eventscreen_field">
          <h3 className="eventscreen_field_description">
            {events[0]?.description}
          </h3>
          <h3 className="eventscreen_field_date">
            Event Date : {events[0]?.date}
          </h3>
        </div>
        <div className="eventscreen_field">
          <h1 className="eventscreen_field_header ">Images</h1>
          <Slider
            ChildComponent={EventImage}
            data={events[0]?.images}
            slidewidth={600}
          />
        </div>
        <div className="eventscreen_field">
          <h1 className="eventscreen_field_header">Videos</h1>
          <Slider
            ChildComponent={EventVideo}
            data={events[0]?.videos}
            slidewidth={600}
          />
        </div>
      </div>
    </div>
  );
}

export default Event;
