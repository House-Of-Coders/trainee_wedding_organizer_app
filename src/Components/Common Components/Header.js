import React from "react";
import "./css/Header.css";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { useStateValue } from "../../Context API/datalayer";
import logo from "../../Assets/logo.png";

function Header() {
  const [{ currentuser }, dispatch] = useStateValue();

  const linkstyles = {
    textDecoration: "none",
    color: "white",
    fontSize: "12px",
  };

  const Logout = () => {
    localStorage.removeItem("authToken");
    dispatch({
      type: "ADD_CURRENTUSER",
      currentuser: null,
    });
  };

  return (
    <div className="header">
      <div className="header_left">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>
      <div className="header_center">
        <input
          type="text"
          placeholder="What are you looking for? "
          className="search_input"
        ></input>
        <SearchIcon className="search_icon" />
      </div>
      <div className="header_right">
        <div className="header_right_left">
          <Link to="/" style={linkstyles}>
            <span className="login">Home</span>
          </Link>
          <Link to="/vendors" style={linkstyles}>
            <span className="register">Vendors</span>
          </Link>
          <Link to="/profile" style={linkstyles}>
            <span className="login">Profile</span>
          </Link>
          <Link to="/log" style={linkstyles}>
            <span className="register">Magula Log</span>
          </Link>
        </div>
        <div className="header_right_right">
          {currentuser ? (
            <div className="user_details">
              <div className="registerd_user_profile">
                <Avatar
                  alt="User Image"
                  src={`http://localhost:5000/${currentuser.profileImage}`}
                  id="user_image"
                />
                <div className="user_displayname">
                  {currentuser.displayname}
                </div>
                <span className="log_out" onClick={() => Logout()}>
                  Log Out
                </span>
              </div>
            </div>
          ) : (
            <div className="guest_user_view">
              <Link to="/auth/signin" style={linkstyles}>
                <span className="login">Login</span>
              </Link>
              <Link to="/auth/register" style={linkstyles}>
                <span className="register">Register</span>
              </Link>
            </div>
          )}
        </div>
        <div className="n"></div>
      </div>
    </div>
  );
}

export default Header;
