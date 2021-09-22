import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Screen.css";
import Review from "./Review";
import Package from "./Package";
import Event from "./Event";
import Header from "../Common Components/Header";
import Footer from "../Common Components/Footer";
import Slider from "../../Components/Extra Components/Normalsilder";
import Addreview from "./Addreview";
import Addbooking from "./Addbooking";
import Imageslider from "../Extra Components/Imageslider";
import { buisnessprofile, events } from "../../Assets/vendorsampledata";
import { Phone, Email, Home } from "@material-ui/icons";

export default function ({ match }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isAddreview, setIsAddReview] = useState(false);
  const [isAddbooking, setIsAddbooking] = useState(false);

  useEffect(async () => {
    await axios
      .get(
        `http://localhost:5000/buisnessprofile/${match?.params?.buisnessprofile_id}`
      )
      .then((res) => {
        setLoading(false);
        setData(res?.data?.buisnessprofile);
      })
      .catch((err) => {
        setLoading(false);
        setData(err?.response?.data);
      });
  }, [match?.params?.buisnessprofile_id]);

  return loading ? (
    <h1> Loading</h1>
  ) : (
    <div className="buisnessprofile">
      <Imageslider
        items={buisnessprofile?.coverphotos}
        slideno={true}
        height={500}
      />
      <div className="buisnessprofile_content ">
        <div className="buisnessprofile_content_container">
          <div className="buisnessprofile_container_item">
            <div className="buisnessprofile_field_content">
              <h3 className="buisnessprofile_field_description">
                {buisnessprofile?.description}
              </h3>
            </div>
          </div>
          <div className="buisnessprofile_container_item">
            <div className="buisnessprofile_field_content contact">
              <h3 className="buisnessprofile_field_contact">
                <Phone id="contact_icon" /> {data?.owner?.contactno}
              </h3>
              <h3 className="buisnessprofile_field_contact email">
                <Email id="contact_icon" /> {data?.owner?.email}
              </h3>
              <h3 className="buisnessprofile_field_contact address">
                <Home id="contact_icon" />
                {buisnessprofile?.address}
              </h3>
            </div>
          </div>
        </div>
        <div className="buisnessprofile_field events odd">
          <h1 className="buisnessprofile_field_header odd_header">Events</h1>
          <div className="buisnessprofile_field_content">
            <Slider ChildComponent={Event} data={events} slidewidth={600} />
          </div>
        </div>
        <div className="buisnessprofile_field packages even">
          <h1 className="buisnessprofile_field_header">Packages</h1>
          <Slider
            ChildComponent={Package}
            data={buisnessprofile?.packages}
            slidewidth={600}
          />
          <button
            className="button addreview"
            onClick={() => setIsAddbooking(true)}
          >
            Add a Booking
          </button>
          <Addbooking
            isAddbooking={isAddbooking}
            callback={() => setIsAddbooking(false)}
            buisnessprofile={buisnessprofile}
          />
        </div>
        <div className="buisnessprofile_field odd">
          <h1 className="buisnessprofile_field_header odd_header">Reviews</h1>
          <Slider
            ChildComponent={Review}
            data={buisnessprofile?.reviews}
            slidewidth={600}
          />
          <button
            className="button addreview"
            onClick={() => setIsAddReview(true)}
          >
            Add a Review
          </button>
          <Addreview
            isAddreview={isAddreview}
            callback={() => setIsAddReview(false)}
            buisnessprofile_id={match?.params?.buisnessprofile_id}
          />
        </div>
      </div>
    </div>
  );
}
