import React from "react";
import Rating from "../../Utils/Ratings/rating";
import { Avatar } from "@material-ui/core";
import "./css/Review.css";

function Review({ data }) {
  return (
    <div className="review">
      <div className="review_top">
        <div className="review_top_left">
          <Avatar src={`http://localhost:5000/${data?.user?.profileImage}`} />
        </div>
        <div className="review_top_right">
          <h3 className="review_username">{data?.user?.name}</h3>
          <h3 className="review_date">{new Date(data?.date).toDateString()}</h3>
        </div>
      </div>
      <div className="review_bottom">
        <div className="rating">
          <Rating rating={data?.rating} /> {data?.rating}
        </div>
        <div className="rating_des">{data?.description}</div>
      </div>
    </div>
  );
}

export default Review;
