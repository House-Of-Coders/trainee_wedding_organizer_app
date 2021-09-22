import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import "./css/Formerrorfeedback.css";

function Formerrorfeedback({ errormessage }) {
  return (
    errormessage !== true && (
      <h3 className="form_field_group_feedback">
        <ErrorIcon className="form_field_group_feedback_icon" /> {errormessage}
      </h3>
    )
  );
}

export default Formerrorfeedback;
