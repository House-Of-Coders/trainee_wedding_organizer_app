import React, { useRef, useState, useEffect } from "react";
import "./css/Imageslider.css";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import Slide from "../Common Components/Slide";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

function Imageslider({ items, slideno }) {
  const [current, setCurrent] = useState(0);

  console.log(items);

  const handleRight = () => {
    current === items?.length - 1
      ? setCurrent(0)
      : setCurrent((current) => current + 1);
  };

  const handleLeft = () => {
    current === 0
      ? setCurrent(items.length - 1)
      : setCurrent((current) => current - 1);
  };

  return (
    <div className="slide_container">
      <div className="arrow arrow_left">
        <div
          className="arrow_div left_arrow_div"
          onClick={() => handleLeft()}
          id="active_arrow"
        >
          <ArrowBackIos className="arrow_icon" />
        </div>
      </div>
      {items?.map((item, index) => (
        <div
          className={
            current === index ? "imageslide activeslide" : "imageslide"
          }
        >
          {index === current && <img src={item} className="image" />}
        </div>
      ))}
      <div className="arrow arrow_right">
        <div
          className="arrow_div right_arrow_div"
          onClick={() => handleRight()}
          id="active_arrow"
        >
          <ArrowForwardIos className="arrow_icon" />
        </div>
      </div>
      {slideno && (
        <div className="slinenocontainer">
          {items?.map((item, index) => {
            return (
              <FiberManualRecordIcon
                className="round"
                onClick={() => setCurrent(index)}
                id={index === current ? "current" : "non-current"}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Imageslider;
