import React from "react";
import { Animated } from "react-animated-css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteContact } from "../actions/action";
import Highlighted from "./Highlighted";

const Contact = ({ contact, deleteContactItem, searchVal }) => {
  return (
    <>
      <Animated
        animationIn="bounceInDown"
        animationOut="slideInLeft"
        isVisible={true}
        animationInDuration={700}
      >
        <div className="contact_wrapper">
          <span>
            <button
              onClick={() => {
                deleteContactItem(contact.id);
              }}
              className="delete-btn common"
            >
              X
            </button>
          </span>
          <div className="initial">
            {contact.firstName[0].toUpperCase()}
            {contact.surname[0].toUpperCase()}
          </div>
          <Link
            to={{
              pathname: `/details/${contact.id}`,
              state: contact
            }}
          >
            <div className="contact_info">
              <p className="contact_name">
                <Highlighted text={contact.firstName} highlight={searchVal} />{" "}
                <Highlighted text={contact.surname} highlight={searchVal} />
              </p>
              <p className="contact_no">
                <Highlighted text={contact.phone_no} highlight={searchVal} />
              </p>
            </div>
          </Link>
        </div>
      </Animated>
    </>
  );
};

const mapDispatchToprops = dispatch => ({
  deleteContactItem: id => dispatch(deleteContact(id))
});

export default connect(null, mapDispatchToprops)(Contact);
