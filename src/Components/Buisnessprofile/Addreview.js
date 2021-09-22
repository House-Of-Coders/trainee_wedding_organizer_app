import React, { useState, useRef, useEffect } from "react";
import { TextField, Dialog, InputLabel } from "@material-ui/core";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import logo from "../../Assets/pngwing.com.png";
import Formerrorfeedback from "../Extra Components/Formerrorfeedback";
import { generalValidator } from "../../Utils/Form Validation/generalvalidator";
import "./css/Addreview.css";
import { useStateValue } from "../../Context API/datalayer";

function Addreview({ isAddreview, callback, buisnessprofile_id }) {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(1);
  const [submitstatus, setSubmitstatus] = useState(false);
  const [responseData, setResponsedata] = useState(null);
  const form = useRef(null);

  const [{ currentuser }, dispatch] = useStateValue();

  useEffect(() => {
    validateForm();
  });

  const validateForm = () => {
    if (form?.current?.checkValidity()) {
      setSubmitstatus(true);
    } else {
      setSubmitstatus(false);
    }
  };

  const handleClick = () => {
    const event = {
      rating: rating,
      description: description,
      date: Date.now(),
      token: localStorage.getItem("authToken"),
      user: currentuser,
      buisnessprofile_id: buisnessprofile_id,
    };

    axios
      .post("http://localhost:5000/buisnessprofile/addreview", event, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        setResponsedata(res.data);
        callback(false);
      })
      .catch((err) => {
        setResponsedata(err.response.data);
      });
  };

  return (
    <Dialog open={isAddreview} aria-labelledby="form-dialog-title" id="dialog">
      <div className="form_container">
        <div className="form_container_top">
          <img src={logo} alt="logo" className="form_container_top_logo" />
          <h1 className="form_container_top_title">Add Review</h1>
        </div>
        <form className="auth_form" ref={form} noValidate>
          <div className="form_field_group review_rating">
            <div>
              <InputLabel
                id="demo-simple-select-filled-label"
                className="review_rating_label"
              >
                Rating
              </InputLabel>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </div>
          </div>
          <div className="form_field_group">
            <TextField
              id="description"
              label="Message"
              name="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Formerrorfeedback errormessage={generalValidator(description)} />
          </div>
          <div className="button_container">
            <button
              className="button"
              type="button"
              onClick={() => handleClick()}
              disabled={!submitstatus}
            >
              Submit
            </button>
            <button
              className="button cancel_button"
              type="button"
              onClick={() => callback(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default Addreview;
