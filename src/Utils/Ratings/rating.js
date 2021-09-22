import React from "react";
import "./css/rating.css";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarHalfIcon from "@material-ui/icons/StarHalf";

function Rating({ rating }) {
  const fullstars = Math.floor(rating / 1);
  const halfstars = (rating / 0.5) % 2;
  const emptystars = Math.floor((5 - rating) / 1);

  return (
    <div className="rating">
      {Array(fullstars)
        .fill()
        .map((_, i) => {
          return <StarIcon className="rating_star" />;
        })}
      {Array(halfstars)
        .fill()
        .map((_, i) => {
          return <StarHalfIcon className="rating_star" />;
        })}
      {Array(emptystars)
        .fill()
        .map((_, i) => {
          return <StarBorderIcon className="rating_star" />;
        })}
    </div>
  );
}

export default Rating;
