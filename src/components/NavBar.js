import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { searchContact } from "../actions/action";

const NavBar = ({ search, searchVal }) => {
  return (
    <>
      <div className="navBar">
        <NavLink exact activeClassName="isActive" to="/">
          <div className="menu">All</div>
        </NavLink>
        <NavLink activeClassName="isActive" to="/family">
          <div className="menu">Family</div>
        </NavLink>
        <NavLink activeClassName="isActive" to="/friends">
          <div className="menu">Friends</div>
        </NavLink>
        <NavLink activeClassName="isActive" to="/others">
          <div className="menu">Others</div>
        </NavLink>
      </div>

      <input
        type="search"
        placeholder="search for contact...."
        className="search_input"
        onChange={e => search(e.target.value)}
        value={searchVal}
        autoFocus
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    contacts: state.contacts.contacts,
    searchVal: state.contacts.searchInput
  };
};

const mapDispatchToProps = dispatch => {
  return {
    search: val => dispatch(searchContact(val))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
