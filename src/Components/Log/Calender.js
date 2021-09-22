import React, { useState } from "react";
import CalenderComponent from "react-calendar";
import { TextField } from "@material-ui/core";
import Formerrorfeedback from "../Extra Components/Formerrorfeedback";
import { generalValidator } from "../../Utils/Form Validation/generalvalidator";
import "./css/Calender.css";
import { useStateValue } from "../../Context API/datalayer";

function Calender() {
  const [newevent, setNewevent] = useState("");
  const [selecteddate, setSelecteddate] = useState({
    date: Date.now(),
    event: null,
  });
  const [currentuserNeed, setCurrentuserneed] = useState(null);

  const [{}, dispatch] = useStateValue();

  const selectDate = () => {};

  return (
    <div className="calender">
      <CalenderComponent
        onClickDay={(value, event) => setSelecteddate(value)}
      />
      <div className="calender_event_container">
        <div className="eventeditor">
          <h3 className="eventeditor_selecteddate">
            {new Date(selecteddate.date).toDateString()}
          </h3>
          <p className="eventeditor_selecteddatecontent">
            Current Event : This is The Event on This Day
          </p>
          <div className=" button_container">
            <button
              className="button add_button"
              onClick={() => setCurrentuserneed("add")}
            >
              Add Event
            </button>
            <button
              className="button delete_button"
              onClick={() => setCurrentuserneed("delete")}
            >
              Delete Event
            </button>
          </div>
          {currentuserNeed === "add" && (
            <div className="eventeditor_addevent">
              <h3>New Event</h3>
              <div className="form_field_group">
                <TextField
                  id="newevent"
                  label="New Event"
                  name="newevent"
                  required
                  value={newevent}
                  onChange={(e) => setNewevent(e.target.value)}
                />
                <Formerrorfeedback errormessage={generalValidator(newevent)} />
              </div>
              <button
                className="button add_button"
                onClick={() => setCurrentuserneed("add")}
              >
                Add Event
              </button>
            </div>
          )}
        </div>
        <div className="eventcontainer"></div>
      </div>
    </div>
  );
}

export default Calender;
