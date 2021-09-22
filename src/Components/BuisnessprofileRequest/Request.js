import React, { useState } from "react";
import "./css/Request.css";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import logo from "../../Assets/pngwing.com.png";
import RequestForm01 from "./Req_form_01";
import RequestForm02 from "./Req_form_02";
import RequestForm03 from "./Req_form_03";

function Request() {
  const [activeStep, setActivestep] = useState(0);
  const [buisnessprofileID, setBuisnessprofileID] = useState(null);

  const handleCallback = (callbackdata) => {
    if (callbackdata?.success) {
      setBuisnessprofileID(callbackdata?.data);
      setActivestep((activeStep) => activeStep + 1);
    }
  };

  return (
    <div className="buisnessprofilerequest_container">
      <div className="buisnessprofilerequest">
        <div className="buisnessprofilerequest_part01">
          <img
            src={logo}
            alt="Logo"
            className="buisnessprofilerequest_part01_logo"
          />
          <h1 className="buisnessprofilerequest_part01_title">
            Set Up Your Buisness Profile
          </h1>
        </div>
        <div className="buisnessprofilerequest_part02">
          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel>Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Packages</StepLabel>
            </Step>
            <Step>
              <StepLabel>Events</StepLabel>
            </Step>
          </Stepper>
        </div>
        <div className="buisnessprofilerequest_part03">
          {activeStep === 0 && <RequestForm01 callBack={handleCallback} />}
          {activeStep === 1 && (
            <RequestForm02
              callBack={handleCallback}
              buisnessprofileID={buisnessprofileID}
            />
          )}
          {activeStep === 2 && (
            <RequestForm03
              callBack={handleCallback}
              buisnessprofileID={buisnessprofileID}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Request;
