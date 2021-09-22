import React, { useRef, useState, useEffect } from "react";
import "./css/Normalslider.css";
import { ArrowBackIos } from "@material-ui/icons";
import { ArrowForwardIos } from "@material-ui/icons";

function Silder({ data, slidewidth, ChildComponent }) {
  const [isOverflow, setIsOverflow] = useState(false);
  const [currentposition, setCurrentposition] = useState(0);
  const [widthgap, setWidthgap] = useState(0);
  const slider = useRef(null);
  const slider_container = useRef(null);

  useEffect(() => {
    if (slider?.current?.offsetWidth < slider_container?.current?.offsetWidth) {
      setIsOverflow(true);
      setWidthgap(
        slider_container?.current?.offsetWidth - slider?.current?.offsetWidth
      );
    }
  }, [data]);

  const handleClick = (side) => {
    if (side === "right" && currentposition < widthgap) {
      if (widthgap - currentposition > slidewidth) {
        slider_container.current.style.transform = `translateX(${-(
          currentposition + slidewidth
        )}px)`;
        setCurrentposition((currentposition) => currentposition + slidewidth);
      } else {
        slider_container.current.style.transform = `translateX(${-widthgap}px)`;
        setCurrentposition(widthgap);
      }
    } else if (side === "left" && currentposition >= 0) {
      if (currentposition > slidewidth) {
        slider_container.current.style.transform = `translateX(${
          slidewidth - currentposition
        }px)`;
        setCurrentposition((currentposition) => currentposition - slidewidth);
      } else {
        slider_container.current.style.transform = `translateX(${0}px)`;
        setCurrentposition(0);
      }
    }
  };

  return (
    <div className="slider" ref={slider}>
      {isOverflow && (
        <div className="arrow arrow_left">
          <div
            className="arrow_div left_arrow_div"
            onClick={() => handleClick("left")}
            id={currentposition <= 0 ? "disable_arrow" : "active_arrow"}
          >
            <ArrowBackIos className="arrow_icon" />
          </div>
        </div>
      )}
      <div className="slider_container" ref={slider_container}>
        {data?.map((data) => (
          <ChildComponent data={data} />
        ))}
      </div>
      {isOverflow && (
        <div className="arrow arrow_right">
          <div
            className="arrow_div right_arrow_div"
            onClick={() => handleClick("right")}
            id={currentposition >= widthgap ? "disable_arrow" : "active_arrow"}
          >
            <ArrowForwardIos className="arrow_icon" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Silder;
