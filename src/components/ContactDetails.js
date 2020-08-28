import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { editContact } from "../actions/action";
import Modal from "./Modal";

const ContactDetails = ({ editContactItem }) => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const singleContact = location.state;
  const [contact, setContact] = useState(singleContact);

  useEffect(() => {
    setContact(() => singleContact);
  }, [singleContact]);

  const [formInput, setFormInput] = useState({
    ...contact,
    errors: {}
  });

  function toggleForm() {
    if (toggle) {
    }
    setToggle(!toggle);
  }

  function handleChange(e) {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value
    });
  }

  function handleValidation() {
    const errors = {};
    let isValid = true;

    if (!formInput["firstName"]) {
      isValid = false;
      errors["firstName"] = "first name is required.";
    }

    if (typeof formInput["firstName"] !== "undefined") {
      if (!formInput["firstName"].match(/^[a-zA-Z ]*$/)) {
        isValid = false;
        errors["firstName"] = "Please enter alphabet characters only.";
      }
    }

    if (!formInput["surname"]) {
      isValid = false;
      errors["surname"] = "surname is required.";
    }

    if (typeof formInput["surname"] !== "undefined") {
      if (!formInput["surname"].match(/^[a-zA-Z ]*$/)) {
        isValid = false;
        errors["surname"] = "Please enter alphabet characters only.";
      }
    }

    if (!formInput["email"]) {
      isValid = false;
      errors["email"] = "email is required.";
    } else if (typeof formInput["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(formInput["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email.";
      }
    }

    if (!formInput["phone_no"]) {
      isValid = false;
      errors["phone_no"] = "phone number is required.";
    } else if (typeof formInput["phone_no"] !== "undefined") {
      if (!formInput["phone_no"].match(/^[0-9]{11}$/)) {
        isValid = false;
        errors["phone_no"] = "phone number must be 11 digits.";
      }
    }

    if (!formInput["category"]) {
      isValid = false;
      errors["category"] = "category is required.";
    }

    setFormInput({
      ...formInput,
      errors: errors
    });
    return isValid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (handleValidation()) {
      delete formInput.errors;
      editContactItem(formInput);
      toggleForm();
    }
  }

  return (
    <div className="detail_wrapper">
      <Modal show={toggle} toggleForm={toggleForm}>
        <form onSubmit={handleSubmit} className="form_wrapper">
          <h2 className="titley">EDIT CONTACT</h2>
          <input
            onChange={handleChange}
            value={formInput.firstName}
            type="text"
            name="firstName"
            placeholder="First Name"
          />
          <small className="error_msg">{formInput.errors.firstName}</small>
          <input
            onChange={handleChange}
            value={formInput.surname}
            type="text"
            name="surname"
            placeholder="Surname"
          />
          <small className="error_msg">{formInput.errors.surname}</small>
          <input
            onChange={handleChange}
            value={formInput.email}
            type="email"
            name="email"
            placeholder="Email"
          />
          <small className="error_msg">{formInput.errors.email}</small>
          <input
            onChange={handleChange}
            value={formInput.phone_no}
            type="tel"
            name="phone_no"
            placeholder="Phone number"
          />
          <small className="error_msg">{formInput.errors.phone_no}</small>
          <select
            name="category"
            value={formInput.category}
            onChange={handleChange}
          >
            <option value="origin">Select category</option>
            <option value="family">Family</option>
            <option value="friends">Friends</option>
            <option value="others">Others</option>
          </select>
          <small className="error_msg">{formInput.errors.category}</small>
          <span>
            <button
              className="save_btn saveClose_btn common"
              onClick={handleSubmit}
            >
              UPDATE
            </button>
            <button
              className="close_btn saveClose_btn common"
              onClick={toggleForm}
            >
              CLOSE
            </button>
          </span>
        </form>
      </Modal>
      <div className="top_detail">
        <Link to="/">
          <button className="back_arrow common">&#8592;</button>
        </Link>
        <span className="title">CONTACT DETAILS</span>
        <div>
          <button onClick={toggleForm} className="edit_btn common">
            Edit
          </button>
        </div>
      </div>
      <div className="detail">
        <p>First Name</p>
        <p> {contact.firstName} </p>
        <p>Surname</p>
        <p> {contact.surname} </p>
        <p>Email</p>
        <p>{contact.email}</p>
        <p>Phone Number</p>
        <p>{contact.phone_no}</p>
        <p>Date Added</p>
        <p>{contact.created_at}</p>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  editContactItem: payload => dispatch(editContact(payload))
});

export default connect(null, mapDispatchToProps)(ContactDetails);
