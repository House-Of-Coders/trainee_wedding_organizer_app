import React, { useState, useRef, useEffect } from "react";
import "./css/Req_form.css";
import axios from "axios";
import {
  TextField,
  InputLabel,
  ImageList,
  ImageListItem,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { generalValidator } from "../../Utils/Form Validation/generalvalidator";
import { validateEmptyImageArray } from "../../Utils/Form Validation/imageValidator";
import { validatePrice } from "../../Utils/Form Validation/priceValidator";
import Formerrorfeedback from "../Extra Components/Formerrorfeedback";

function Req_form_04({ callBack, buisnessprofileID }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const imagesInput = useRef(null);
  const form = useRef(null);
  const [submitStatus, setSubmitstatus] = useState(false);
  const [responsedata, setResponsedata] = useState("");

  useEffect(() => {
    validateForm();
  });

  const validateForm = () => {
    if (
      form?.current?.checkValidity() &&
      validatePrice(price) === true &&
      validateEmptyImageArray(images) === true
    ) {
      setSubmitstatus(true);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    const newpackage = new FormData();
    newpackage.append("title", title);
    newpackage.append("description", description);
    newpackage.append("price", price);
    images.map((image) => {
      newpackage.append("images", image);
    });
    newpackage.append("buisnessprofile_id", buisnessprofileID);

    axios
      .post("http://localhost:5000/buisnessprofile/addpackage", newpackage, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        setResponsedata(res.data);
        callBack(res.data);
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
          label="Package Title"
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
          label="Package Description"
          name="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Formerrorfeedback errormessage={generalValidator(description)} />
      </div>
      <div className="form_field_group">
        <TextField
          id="price"
          type="number"
          label="Package Price"
          name="price"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Formerrorfeedback errormessage={validatePrice(price)} />
      </div>
      <div className="multifileinput">
        <InputLabel id="multifileinput_left"> Package Images </InputLabel>
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
          <Formerrorfeedback errormessage={validateEmptyImageArray(images)} />
        </div>
      </div>
      <div className="button_container">
        <button
          className="button stepper_button"
          type="submit"
          onClick={(e) => handleClick(e)}
          disabled={!submitStatus}
        >
          Next
        </button>
        <button
          className="button stepper_button"
          type="button"
          onClick={() => callBack(true)}
        >
          Skip
        </button>
      </div>
    </form>
  );
}

export default Req_form_04;

