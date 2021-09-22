import React, { useState, useRef, useEffect } from "react";
import "./css/Req_form.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import {
  TextField,
  InputLabel,
  ImageList,
  ImageListItem,
} from "@material-ui/core";

//Importing Validating Functions
import { generalValidator } from "../../Utils/Form Validation/generalvalidator";
import { validateImageArray } from "../../Utils/Form Validation/imageValidator";
import { validateDate } from "../../Utils/Form Validation/dateValidator";
import { validateVideoArray } from "../../Utils/Form Validation/videoValidator";
import Formerrorfeedback from "../Extra Components/Formerrorfeedback";

function Req_form_02({ callBack, buisnessprofileID }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [date, setDate] = useState("");
  const imagesInput = useRef(null);
  const videosInput = useRef(null);
  const form = useRef(null);
  const [submitStatus, setSubmitstatus] = useState(false);
  const [responsedata, setResponsedata] = useState("");

  const history = useHistory();

  useEffect(() => {
    validateForm();
  });

  const validateForm = () => {
    if (
      form?.current?.checkValidity() &&
      validateImageArray(images) === true &&
      validateDate(date) === true &&
      validateVideoArray(videos) === true
    ) {
      setSubmitstatus(true);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    const newevent = new FormData();
    newevent.append("title", title);
    newevent.append("description", description);
    images.map((image) => newevent.append("images", image));
    videos.map((video) => newevent.append("videos", video));
    newevent.append("date", date);
    newevent.append("buisnessprofile_id", buisnessprofileID);

    axios
      .post("http://localhost:5000/event/create-event", newevent, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        setResponsedata(res.data);
        history.push("/user");
      })
      .catch((err) => {
        setResponsedata(err.response.data);
      });
  };

  return (
    <form className="buisnessprofilerequest_form_01" ref={form} noValidate>
      {responsedata && (
        <Alert
          id={responsedata?.success ? "success" : "error"}
          severity={responsedata?.success ? "success" : "error"}
        >
          {responsedata?.success
            ? " First Step Successfull"
            : `Error. ${responsedata.error}`}
        </Alert>
      )}
      <div className="form_field_group">
        <TextField
          id="title"
          label="Event Title"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Formerrorfeedback errormessage={generalValidator(title)} />
      </div>
      <div className="form_field_group">
        <TextField
          id="description"
          label="Event Description"
          name="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Formerrorfeedback errormessage={generalValidator(description)} />
      </div>
      <div className="form_field_group">
        <TextField
          id="date"
          label="Event Date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Formerrorfeedback errormessage={validateDate(date)} />
      </div>
      <div className="multifileinput">
        <InputLabel id="multifileinput_left"> Event Images </InputLabel>
        <div className="multifileinput_right">
          {images.length === 0 ? (
            <p className="requestdoc_name">None Selected</p>
          ) : (
            <ImageList rowHeight={160}>
              {images.map((image, index) => (
                <ImageListItem key={index} cols={image.cols || 1}>
                  <img src={URL.createObjectURL(image)} alt={image.name} />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          <div className="multifileinput_buttons">
            <input
              type="file"
              className="imagesInput"
              style={{ display: "none" }}
              required
              ref={imagesInput}
              onChange={(e) =>
                setImages((images) => images.concat(Array.from(e.target.files)))
              }
              multiple
            />
            <button
              type="button"
              className="button secondary"
              onClick={() => imagesInput.current.click()}
              id="multifileinput_button"
            >
              Select
            </button>
            <button
              type="button"
              className="button secondary"
              onClick={() => setImages([])}
              id="multifileinput_button"
            >
              Deselect All
            </button>
          </div>
          <Formerrorfeedback errormessage={validateImageArray(images)} />
        </div>
      </div>
      <div className="multifileinput">
        <InputLabel id="multifileinput_left"> Event Videos </InputLabel>
        <div className="multifileinput_right">
          {videos.length === 0 ? (
            <p className="requestdoc_name">None Selected</p>
          ) : (
            <ImageList rowHeight={160}>
              {videos.map((video, index) => (
                <ImageListItem key={index} cols={video.cols || 1}>
                  <img src={URL.createObjectURL(video)} alt={video.name} />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          <div className="multifileinput_buttons">
            <input
              type="file"
              className="imagesInput"
              style={{ display: "none" }}
              ref={videosInput}
              onChange={(e) =>
                setVideos((videos) => videos.concat(Array.from(e.target.files)))
              }
              multiple
            />
            <button
              type="button"
              className="button secondary"
              onClick={() => videosInput.current.click()}
              id="multifileinput_button"
            >
              Select
            </button>
            <button
              type="button"
              className="button secondary"
              onClick={() => setImages([])}
              id="multifileinput_button"
            >
              Deselect All
            </button>
          </div>
          <Formerrorfeedback errormessage={validateVideoArray(videos)} />
        </div>
      </div>
      <div className="button_container">
        <button
          className="button stepper_button"
          type="submit"
          onClick={(e) => handleClick(e)}
          disabled={!submitStatus}
        >
          Finish
        </button>
        <button
          className="button stepper_button"
          type="button"
          onClick={() => callBack(false)}
        >
          Skip & Finish
        </button>
      </div>
    </form>
  );
}

export default Req_form_02;
