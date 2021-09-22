import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Importing Components
import Header from "./Components/Common Components/Header";
import Footer from "./Components/Common Components/Footer";
import Forgetpassword from "./Components/Authetication/Forgetpassword.js";
import Resetpassword from "./Components/Authetication/Resetpassword";
import Signinform from "./Components/Authetication/Signinform";
import Registerform from "./Components/Authetication/Registerform";
import PrivateRoute from "./Components/routing/PrivateRoute";
import Buisnessprofilescreen from "./Components/Buisnessprofile/Screen";
import Buisnessprofilerequest from "./Components/BuisnessprofileRequest/Request";
import Homepage from "./Components/Homepage/Homepage";
import Log from "./Components/Log/Log";
import EventScreen from "./Components/Event/Event";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/auth/signin" component={Signinform} />
          <Route path="/auth/register" component={Registerform} />
          <Route path="/auth/forgetpassword" component={Forgetpassword} />
          <Route
            path="/auth/resetpassword/:resetPasswordtoken"
            component={Resetpassword}
          ></Route>
          <Route
            exact
            path="/buisnessprofile/:buisnessprofile_id"
            component={Buisnessprofilescreen}
          ></Route>
          <Route
            exact
            path="/buisnessprofile/event/:event_id"
            component={EventScreen}
          ></Route>
          <Route
            path="/buisnessprofilerequest"
            component={Buisnessprofilerequest}
          />
          <Route path="/log" component={Log} />
          <Route path="/" component={Homepage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
