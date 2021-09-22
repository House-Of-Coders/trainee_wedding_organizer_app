import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import LockIcon from "@material-ui/icons/Lock";
import { TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import "./css/Form.css";
import { validateEmail } from "../../Utils/Form Validation/emailValidator";
import { generalValidator } from "../../Utils/Form Validation/generalvalidator";
import logo from "../../Assets/pngwing.com.png";
import Formerrorfeedback from "../Extra Components/Formerrorfeedback";
import { useStateValue } from "../../Context API/datalayer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responsedata, setResponsedata] = useState(null);
  const [submitstatus, setSubmitstatus] = useState(false);
  const form = useRef(null);

  const [{}, dispatch] = useStateValue();

  const history = useHistory();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    try {
      await axios
        .post("http://localhost:5000/auth/signin", user)
        .then((res) => {
          setResponsedata(res.data);
          localStorage.setItem("authToken", res?.data?.token);
          dispatch({
            type: "ADD_CURRENTUSER",
            currentuser: res.data.user,
          });
          history.push("/user");
        })
        .catch((err) => {
          setResponsedata(err?.response?.data);
          setSubmitstatus(false);
        });
      setTimeout(() => {
        setResponsedata("");
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth_container">
      <div className="form_container">
        <div className="form_container_top">
          <img src={logo} alt="logo" className="form_container_top_logo" />
          <h1 className="form_container_top_title">Sign In</h1>
        </div>
        <form
          className="auth_form"
          onSubmit={(e) => handleSubmit(e)}
          ref={form}
          noValidate
        >
          {responsedata && (
            <Alert
              id={responsedata?.success ? "success" : "error"}
              severity={responsedata?.success ? "success" : "error"}
            >
              {responsedata?.success
                ? " Log In Attempt Successfull"
                : `Error. ${responsedata.error}`}
            </Alert>
          )}
          <div className="form_field_group">
            <TextField
              id="outlined-basic"
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
              id="outlined-basic"
              label="Password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Formerrorfeedback errormessage={generalValidator(password)} />
          </div>
          <div className="form_extra">
            <span>Don't Have a Account ? </span>
            <Link to="/auth/register" style={linkstyles}>
              <span>Create Account</span>
            </Link>
          </div>
          <button className="button" type="submit" disabled={!submitstatus}>
            Sign In
          </button>
        </form>
        <Link to="/auth/forgetpassword" style={linkstyles}>
          <div className="forger_password form_extra">
            <LockIcon className="forget_icon" />
            <span>Forget Password</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Login;
