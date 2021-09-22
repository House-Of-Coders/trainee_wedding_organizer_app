import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./css/Form.css";
import { Link, useHistory } from "react-router-dom";
import { Avatar, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { validateEmail } from "../../Utils/Form Validation/emailValidator";
import { generalValidator } from "../../Utils/Form Validation/generalvalidator";
import { validateContactNo } from "../../Utils/Form Validation/contactnoValidator";
import { validateDate } from "../../Utils/Form Validation/dateValidator";
import { validateImage } from "../../Utils/Form Validation/imageValidator";
import {
  validatePassword,
  matchPasswords,
} from "../../Utils/Form Validation/passwordValidator";
import logo from "../../Assets/pngwing.com.png";
import Formerrorfeedback from "../Extra Components/Formerrorfeedback";
import { useStateValue } from "../../Context API/datalayer";

function Registerform() {
  const [profilepic, setProfilePic] = useState(null);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [email, setEmail] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [usertype, setUsertype] = useState("");
  const [weddingdate, setWeddingdate] = useState("");
  const [responsedata, setResponsedata] = useState("");
  const profilepicInput = useRef(null);
  const [submitstatus, setSubmitstatus] = useState(false);
  const form = useRef(null);

  const history = useHistory();

  const [{}, dispatch] = useStateValue();

  const linkstyles = {
    textDecoration: "none",
    color: "rgb(199, 148, 6)",
  };

  useEffect(() => {
    validateForm();
  });

  const validateForm = () => {
    if (
      form?.current?.checkValidity() &&
      validateEmail(email) === true &&
      validateImage(profilepic) === true &&
      validatePassword(password) === true &&
      matchPasswords(password, confirmpassword) === true &&
      validateContactNo(contactnumber) === true
    ) {
      if (usertype === "customer") {
        if (validateDate(weddingdate) === true) {
          setSubmitstatus(true);
        } else {
          setSubmitstatus(false);
        }
      } else {
        setSubmitstatus(true);
      }
    } else {
      setSubmitstatus(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = new FormData();
    user.append("fullname", fullname);
    user.append("username", username);
    user.append("password", password);
    user.append("email", email);
    user.append("contactno", contactnumber);
    user.append("usertype", usertype);
    user.append("profileImage", profilepic);
    user.append("isVerified", usertype === "customer" ? true : false);
    user.append("weddingdate", usertype === "customer" ? weddingdate : null);

    axios
      .post("http://localhost:5000/auth/register", user)
      .then((res) => {
        setResponsedata(res?.data);
        localStorage.setItem("authToken", res?.data?.token);
        dispatch({
          type: "ADD_CURRENTUSER",
          currentuser: res.data.user,
        });
        res.data.user?.usertype === "vendor"
          ? history.push("/buisnessprofilerequest")
          : history.push("/user");
      })
      .catch((err) => {
        setResponsedata(err.response?.data);
        setSubmitstatus(false);
      });
    setTimeout(() => {
      setResponsedata("");
    }, 3000);
  };

  return (
    <div className="auth_container">
      <div className="form_container">
        <div className="form_container_top">
          <img src={logo} alt="Logo" className="form_container_top_logo" />
          <h1 className="form_container_top_title">Create Account</h1>
          <p className="form_container_top_text">
            Create Account and Enjoy Rewards
          </p>
        </div>
        <form
          className="auth_form"
          onSubmit={(e) => handleSubmit(e)}
          ref={form}
          noValidate
        >
          <div className="profileimagecontainer">
            <Avatar
              src={
                profilepic !== null && validateImage(profilepic) === true
                  ? URL.createObjectURL(profilepic)
                  : ""
              }
              className="profileimage"
            />
            <input
              type="file"
              className="profileimagefile"
              required
              ref={profilepicInput}
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
            <button
              type="button"
              className="button profile_image_button"
              onClick={() => profilepicInput.current.click()}
            >
              Select Profile Picture
            </button>
            <Formerrorfeedback errormessage={validateImage(profilepic)} />
          </div>
          {responsedata && (
            <Alert
              id={responsedata?.success ? "success" : "error"}
              severity={responsedata?.success ? "success" : "error"}
            >
              {responsedata?.success
                ? "Succesfully Created Your Profile"
                : `Error. ${responsedata.error}`}
            </Alert>
          )}
          <div className="form_field_group">
            <TextField
              id="fullname"
              label="Full Name"
              name="fullname"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <Formerrorfeedback errormessage={generalValidator(fullname)} />
          </div>
          <div className="form_field_group">
            <TextField
              id="username"
              label="Username"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Formerrorfeedback errormessage={generalValidator(username)} />
          </div>
          <div className="form_field_group">
            <TextField
              type="password"
              label="Password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Formerrorfeedback errormessage={validatePassword(password)} />
          </div>
          <div className="form_field_group">
            <TextField
              type="password"
              label="Confirm Password"
              name="confirmpassword"
              required
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
            <Formerrorfeedback
              errormessage={matchPasswords(password, confirmpassword)}
            />
          </div>
          <div className="form_field_group">
            <TextField
              id="email"
              label="Email Address"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Formerrorfeedback errormessage={validateEmail(email)} />
          </div>
          <div className="form_field_group">
            <TextField
              id="contactno"
              label="Contact Number"
              name="contactno"
              required
              value={contactnumber}
              onChange={(e) => setContactnumber(e.target.value)}
            />
            <Formerrorfeedback
              errormessage={validateContactNo(contactnumber)}
            />
          </div>
          <div className="form_field_group radio_field_group">
            <div className="form_radio_group">
              <div className="form_radio">
                <input
                  type="radio"
                  name="account_type"
                  required
                  id="customer"
                  onChange={(e) => e.target.checked && setUsertype("customer")}
                />
                <label className="form_radio_label">Register as Customer</label>
              </div>
              <div className="form_radio">
                <input
                  type="radio"
                  name="account_type"
                  required
                  id="vendor"
                  onChange={(e) => e.target.checked && setUsertype("vendor")}
                />
                <label className="form_radio_label">Register as Vendor</label>
              </div>
            </div>
            <Formerrorfeedback
              errormessage={
                usertype === "" ? "Please select a Account Type" : true
              }
            />
          </div>
          {usertype === "customer" && (
            <div className="form_field_group">
              <TextField
                id="date"
                label="Wedding Date"
                type="date"
                name="contactno"
                value={weddingdate}
                onChange={(e) => setWeddingdate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Formerrorfeedback errormessage={validateDate(weddingdate)} />
            </div>
          )}
          <div className="form_extra">
            <span>Already Have a Account ? </span>
            <Link to="/auth/signin" style={linkstyles}>
              <span>Sign In</span>
            </Link>
          </div>
          <button className="button" type="submit" disabled={!submitstatus}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registerform;
