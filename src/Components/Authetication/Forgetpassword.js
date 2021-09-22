import React, { useState, useRef, useEffect } from "react";
import "./css/Form.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { TextField } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { validateEmail } from "../../Utils/Form Validation/emailValidator";
import logo from "../../Assets/pngwing.com.png";
import Formerrorfeedback from "../Extra Components/Formerrorfeedback";

function ReserPassword() {
  const [email, setEmail] = useState("");
  const [submitstatus, setSubmitstatus] = useState(false);
  const form = useRef(null);
  const [responsedata, setResponsedata] = useState("");

  const linkstyles = {
    textDecoration: "none",
    color: "rgb(199, 148, 6)",
  };

  useEffect(() => {
    validateForm();
  });

  const validateForm = () => {
    if (form?.current?.checkValidity() && validateEmail(email) === true) {
      setSubmitstatus(true);
    } else {
      setSubmitstatus(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/forgetpassword", { email: email })
      .then((res) => {
        setResponsedata(res.data);
      })
      .catch((err) => {
        setResponsedata(err.response.data);
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
          <img src={logo} alt="logo" className="form_container_top_logo" />
          <h1 className="form_container_top_title">Forget Password</h1>
          <p className="form_container_top_text">
            Enter Email Address assoicated with your Account
          </p>
        </div>
        <form
          className="auth_form"
          onSubmit={(e) => handleSubmit(e)}
          ref={form}
          noValidate
        >
          {responsedata && (
            <Alert severity={responsedata?.success ? "success" : "error"}>
              <AlertTitle>
                {responsedata?.success ? "Success" : "Error"}
              </AlertTitle>
              {responsedata?.success
                ? "Password Reset Link Sent to you Successfully"
                : responsedata.error}
            </Alert>
          )}
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
          <div className="form_extra">
            <span>Want to Go back to Sign In ? </span>
            <Link to="/auth/signin" style={linkstyles}>
              <span>Go Back</span>
            </Link>
          </div>
          <button className="button" type="submit" disabled={!submitstatus}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReserPassword;
