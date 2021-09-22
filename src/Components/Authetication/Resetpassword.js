import React, { useState, useEffect, useRef } from "react";
import "./css/Form.css";
import axios from "axios";
import { TextField } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import {
  validatePassword,
  matchPasswords,
} from "../../Utils/Form Validation/passwordValidator";
import logo from "../../Assets/pngwing.com.png";
import Formerrorfeedback from "../Extra Components/Formerrorfeedback";

function ReserPassword({ match }) {
  const [newpassword, setNewpassword] = useState("");
  const [confirmnewpassword, setConfirmnewpassword] = useState("");
  const [responsedata, setResponsedata] = useState("");
  const [submitstatus, setSubmitstatus] = useState(false);
  const form = useRef(null);

  useEffect(() => {
    validateForm();
  });

  const validateForm = () => {
    if (
      form?.current?.checkValidity() &&
      validatePassword(newpassword) === true &&
      matchPasswords(newpassword, confirmnewpassword) === true
    ) {
      setSubmitstatus(true);
    } else {
      setSubmitstatus(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/auth/resetpassword/${match?.params?.resetPasswordtoken}`,
        {
          password: newpassword,
        }
      )
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
          <h1 className="form_container_top_title">Reset Password</h1>
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
                ? "Password has been reset Successfully"
                : responsedata.error}
            </Alert>
          )}
          <div className="form_field_group">
            <TextField
              id="newpassword"
              label="New Password"
              name="newpassword"
              required
              value={newpassword}
              onChange={(e) => setNewpassword(e.target.value)}
            />
            <Formerrorfeedback errormessage={validatePassword(newpassword)} />
          </div>
          <div className="form_field_group">
            <TextField
              id="confirmnewpassword"
              label="Confirm New Password"
              name="confirmnewpassword"
              required
              value={confirmnewpassword}
              onChange={(e) => setConfirmnewpassword(e.target.value)}
            />
            <Formerrorfeedback
              errormessage={matchPasswords(newpassword, confirmnewpassword)}
            />
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
