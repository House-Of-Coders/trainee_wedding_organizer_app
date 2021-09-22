import React from "react";
import "./css/Log.css";
import Bookings from "./Bookings";
import Calender from "./Calender";
import Suggestedvendors from "./Suggestedvendors";

function Log() {
  return (
    <div className="log">
      <div className="bookingsbox field">
        <h1 className="field_header">Your Bookings</h1>
        <Bookings token={localStorage.getItem("authToken")} />
      </div>
      <div className="calenderbox field">
        <h1 className="field_header">Your Calender</h1>
        <Calender />
      </div>
      <div className="suggestedvendorsbox field">
        <h1 className="field_header">Suggested Vendors</h1>
        <Suggestedvendors />
      </div>
    </div>
  );
}

export default Log;
