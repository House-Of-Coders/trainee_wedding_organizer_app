import React, { useState, useRef, useEffect } from "react";
import "./css/Req_form.css";
import axios from "axios";
import {
  Avatar,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Formerrorfeedback from "../Extra Components/Formerrorfeedback";
import {
  validateImage,
  validateImageArray,
} from "../../Utils/Form Validation/imageValidator";
import { generalValidator } from "../../Utils/Form Validation/generalvalidator";
import { validateDocument } from "../../Utils/Form Validation/documentValidator";

function Req_form_01({ callBack }) {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [logo, setLogo] = useState(null);
  const [description, setDescription] = useState("");
  const [coverphotos, setCoverphotos] = useState([]);
  const [address, setAddress] = useState("");
  const [requestdoc, setRequestdoc] = useState(null);
  const logoInput = useRef(null);
  const coverphotoInput = useRef(null);
  const requestdocInput = useRef(null);
  const form = useRef(null);
  const [submitStatus, setSubmitstatus] = useState(false);
  const [responsedata, setResponsedata] = useState(null);

  useEffect(() => {
    validateForm();
  });

  const validateForm = () => {
    if (
      form?.current?.checkValidity() &&
      validateDocument(requestdoc) === true &&
      validateImageArray(coverphotos) === true &&
      validateImage(logo) === true
    ) {
      setSubmitstatus(true);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    const buisnessprofile = new FormData();
    buisnessprofile.append("title", title);
    buisnessprofile.append("logo", logo);
    buisnessprofile.append("type", type);
    buisnessprofile.append("description", description);
    buisnessprofile.append("address", address);
    coverphotos.map((coverphoto) => {
      buisnessprofile.append("coverphotos", coverphoto);
    });
    buisnessprofile.append("requestdoc", requestdoc);
    buisnessprofile.append("isApproved", false);

    axios
      .post(
        "http://localhost:5000/buisnessprofile/createbusinessprofile",
        buisnessprofile,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((res) => {
        setResponsedata(res.data);
        callBack(res.data);
      })
      .catch((err) => {
        setResponsedata(err.response.data);
        callBack(err.response.data);
      });
  };

  return (
    <form className="buisnessprofilerequest_form_01" ref={form} noValidate>
      <div className="form_field_group">
        <Avatar
          src={(logo !== null) === true ? URL.createObjectURL(logo) : ""}
        />
        <input
          type="file"
          className="logoinput"
          style={{ display: "none" }}
          required
          ref={logoInput}
          onChange={(e) => setLogo(e.target.files[0])}
        />
        <button
          type="button"
          className="button profile_image_button"
          onClick={() => logoInput.current.click()}
        >
          Select a Logo
        </button>
        <Formerrorfeedback errormessage={validateImage(logo)} />
      </div>
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
          label="Title"
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
          label="Description"
          name="description"
          multiline
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Formerrorfeedback errormessage={generalValidator(description)} />
      </div>
      <div className="form_field_group">
        <TextField
          id="address"
          label="Address"
          name="address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Formerrorfeedback errormessage={generalValidator(address)} />
      </div>
      <div className="form_field_group">
        <FormControl>
          <InputLabel id="demo-simple-select-filled-label">
            Account Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={type}
            required
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="music group">Music Groups</MenuItem>
            <MenuItem value="dancing Group">Dancing Groups</MenuItem>
            <MenuItem value="decoration">Decorations</MenuItem>
          </Select>
        </FormControl>
        <Formerrorfeedback errormessage={generalValidator(type)} />
      </div>
      <div className="multifileinput">
        <InputLabel id="multifileinput_left"> Cover Photos </InputLabel>
        <div className="multifileinput_right">
          {coverphotos.length === 0 ? (
            <p className="requestdoc_name">None Selected</p>
          ) : (
            <h1>sdsadsd</h1>
          )}
          <div className="multifileinput_buttons">
            <input
              type="file"
              className="logoinput"
              style={{ display: "none" }}
              required
              ref={coverphotoInput}
              onChange={(e) =>
                setCoverphotos((coverphotos) =>
                  coverphotos.concat(Array.from(e.target.files))
                )
              }
              multiple
            />
            <button
              type="button"
              className="button secondary"
              onClick={() => coverphotoInput.current.click()}
              id="multifileinput_button"
            >
              Select
            </button>
            <button
              type="button"
              className="button secondary"
              onClick={() => setCoverphotos([])}
              id="multifileinput_button"
            >
              Deselect All
            </button>
          </div>
          <Formerrorfeedback errormessage={validateImageArray(coverphotos)} />
        </div>
      </div>
      <div className="multifileinput">
        <InputLabel id="multifileinput_left document_left">
          Request Document (Optional)
        </InputLabel>
        <div className="multifileinput_right document_right">
          {
            <p className="requestdoc_name">
              {requestdoc ? requestdoc.name : " None Selected"}
            </p>
          }
          <div className="multifileinput_buttons">
            <input
              type="file"
              className="requestdocInput"
              style={{ display: "none" }}
              ref={requestdocInput}
              onChange={(e) => setRequestdoc(e.target.files[0])}
              multiple
            />
            <button
              type="button"
              className="button secondary"
              onClick={() => requestdocInput.current.click()}
              id="multifileinput_button"
            >
              Select
            </button>
          </div>
          <Formerrorfeedback errormessage={validateDocument(requestdoc)} />
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
      </div>
    </form>
  );
}

export default Req_form_01;
