import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AllContacts from "./components/AllContacts";
import FriendsContacts from "./components/FriendsContacts";
import FamilyContacts from "./components/FamilyContacts";
import OthersContacts from "./components/OthersContacts";
import NavBar from "./components/NavBar";
import TopProfile from "./components/TopProfile";
import AddContact from "./components/AddContact";
import ContactDetails from "./components/ContactDetails";
import {Animated} from "react-animated-css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Animated
        animationIn="lightSpeedIn"
        isVisible={true}
        animationInDuration={1500}
      >
        <div className="main_wrapper">
          <TopProfile />
          <NavBar />
          <Switch>
            <Route exact path="/" component={AllContacts} />
            <Route exact path="/family" component={FamilyContacts} />
            <Route exact path="/friends" component={FriendsContacts} />
            <Route exact path="/others" component={OthersContacts} />
            <Route exact path="/details/:id" component={ContactDetails} />
          </Switch>
        </div>
        <AddContact />
        </Animated>
      </div>
    </BrowserRouter>
  );
}

export default App;
