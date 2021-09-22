import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Bookings.css";
import Bookingcard from "./Bookingcard";
// import { bookingsdata } from "../../Assets/bookingdata";
import {
  SelectAll,
  HighlightOff,
  Done,
  ErrorOutline,
} from "@material-ui/icons";

function Bookings({ token }) {
  const [responsedata, setResponsedata] = useState();
  const [activebookings, setActivebookings] = useState();
  const [active, setActive] = useState("all");
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/booking/${token}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        setResponsedata(res?.data);
        setActivebookings(res?.data?.data);
        setIsloading(false);
      })
      .catch((err) => {
        setResponsedata(err?.reponse?.data);
        setIsloading(false);
      });
  }, [token]);

  const handleClick = (active) => {
    if (active === "all") {
      setActivebookings(responsedata?.data);
      setActive("all");
    } else {
      const requiredbookings = responsedata?.data?.filter((booking) => {
        return booking?.isConfirmed === active;
      });
      setActivebookings(requiredbookings);
    }
  };

  return isLoading ? (
    <h1> Loading</h1>
  ) : activebookings?.data?.length !== 0 ? (
    <>
      <div className="bookings_selectors_container">
        <div className="selector_button all" onClick={() => handleClick("all")}>
          <SelectAll id="selector_button_icon" /> All
        </div>
        <div
          className="selector_button accept"
          onClick={() => handleClick("Accepted")}
        >
          <Done id="selector_button_icon" /> Accepted
        </div>
        <div
          className="selector_button pending"
          onClick={() => handleClick("pending")}
        >
          <ErrorOutline id="selector_button_icon" /> Pending
        </div>
        <div
          className="selector_button reject"
          onClick={() => handleClick("Rejected")}
        >
          <HighlightOff id="selector_button_icon" /> Rejected
        </div>
      </div>
      {activebookings?.map((booking) => {
        return <Bookingcard {...booking} />;
      })}
    </>
  ) : (
    <h3>You Don't Have Bookings</h3>
  );
}

export default Bookings;
