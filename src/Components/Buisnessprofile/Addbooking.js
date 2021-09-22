import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Dialog,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";
import logo from "../../Assets/pngwing.com.png";
import Formerrorfeedback from "../Extra Components/Formerrorfeedback";
import { generalValidator } from "../../Utils/Form Validation/generalvalidator";
import { validateDate } from "../../Utils/Form Validation/dateValidator";
import "./css/Addbooking.css";
import { useStateValue } from "../../Context API/datalayer";

function Addbooking({ isAddbooking, callback, buisnessprofile }) {
  const [bookingpackage, setBookingpackage] = useState("");
  const [description, setDescription] = useState("");
  const [extraInfo, setExtrainfo] = useState("");
  const [bookingdate, setBookingdate] = useState("");
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
    const vendor = {
      owner_id: buisnessprofile?.owner?.id,
      buisnessprofile_id: buisnessprofile?._id,
      logo: buisnessprofile?.logo,
      title: buisnessprofile?.title,
      category: buisnessprofile?.type,
      contactdetails: {
        email: buisnessprofile?.owner?.email,
        contactno: buisnessprofile?.owner?.contactno,
        address: buisnessprofile?.address,
      },
    };

    const booking = {
      user: currentuser,
      owner: vendor,
      bookingpackage: bookingpackage,
      extraInfo: extraInfo,
      bookingdate: bookingdate,
      date: Date.now(),
      isConfirmed: "pending",
    };

    axios
      .post(
        "http://localhost:5000/booking/bookingrequest",
        { booking },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((res) => {
        setResponsedata(res.data);
        console.log(res.data);
        callback(false);
      })
      .catch((err) => {
        setResponsedata(err.response.data);
        console.log(err.response.data);
      });
  };

  const handleChange = (e) => {
    if (e.target.value === "custom") {
      setBookingpackage("custom");
    } else {
      const selectedpackage = buisnessprofile?.packages?.filter(
        (bookingpackage) => {
          return bookingpackage.title === e.target.value;
        }
      );
      setBookingpackage(selectedpackage[0]);
    }
  };

  return (
    <Dialog open={isAddbooking} aria-labelledby="form-dialog-title" id="dialog">
      <div className="form_container">
        <div className="form_container_top">
          <img src={logo} alt="logo" className="form_container_top_logo" />
          <h1 className="form_container_top_title">Add A Booking</h1>
        </div>
        {responseData && (
          <Alert severity={responseData?.success ? "success" : "error"}>
            <AlertTitle>
              {responseData?.success ? "Success" : "Error"}
            </AlertTitle>
            {responseData?.success
              ? "Password has been reset Successfully"
              : responseData.error}
          </Alert>
        )}
        <form className="auth_form" ref={form} noValidate>
          <div className="form_field_group">
            <FormControl>
              <InputLabel id="demo-simple-select-filled-label">
                Select A Package
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={bookingpackage?.title}
                required
                onChange={(e) => handleChange(e)}
              >
                {buisnessprofile?.packages?.map((bookingpackage) => {
                  return (
                    <MenuItem value={bookingpackage.title}>
                      {bookingpackage.title}
                    </MenuItem>
                  );
                })}
                <MenuItem value="custom">Custom Package</MenuItem>
              </Select>
            </FormControl>
            <Formerrorfeedback
              errormessage={generalValidator(bookingpackage?.title)}
            />
          </div>
          {bookingpackage !== "" &&
            (bookingpackage === "custom" ? (
              <div className="form_field_group">
                <TextField
                  id="description"
                  label="Booking Description"
                  name="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Formerrorfeedback
                  errormessage={generalValidator(description)}
                />
              </div>
            ) : (
              <>
                <div className="form_field_group">
                  <TextField
                    id="packagetitle"
                    label="Booking Package Title"
                    name="packagetitle"
                    required
                    variant="filled"
                    helperText="You can change the values by Changing the Package"
                    value={bookingpackage?.title}
                  />
                </div>
                <div className="form_field_group">
                  <TextField
                    id="description"
                    label="Booking Description"
                    name="description"
                    helperText="You can change the values by Changing the Package"
                    required
                    variant="filled"
                    value={bookingpackage?.description}
                  />
                </div>
                <div className="form_field_group">
                  <TextField
                    id="price"
                    label="Booking Price"
                    helperText="You can change the values by Changing the Package"
                    name="price"
                    required
                    variant="filled"
                    value={bookingpackage?.price}
                  />
                </div>
              </>
            ))}
          <div className="form_field_group">
            <TextField
              id="extrarequirements"
              label="Extra Requirements"
              name="extrarequirements"
              value={extraInfo}
              onChange={(e) => setExtrainfo(e.target.value)}
            />
          </div>
          <div className="form_field_group">
            <TextField
              id="bookingdate"
              label="Booking Date"
              type="date"
              name="bookingdate"
              value={bookingdate}
              onChange={(e) => setBookingdate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Formerrorfeedback errormessage={validateDate(bookingdate)} />
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

export default Addbooking;
