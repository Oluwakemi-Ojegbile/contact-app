import React, { useState } from "react";
import { connect } from "react-redux";
import { addContact } from "../actions/action";
import uuid from "uuid";

import Modal from "./Modal";

const AddContact = ({ addContactItem }) => {
  const [toggle, setToggle] = useState(false);
  const [formInput, setFormInput] = useState({
    id: "",
    firstName: "",
    surname: "",
    email: "",
    phone_no: "",
    category: "",
    errors: {}
  });

  function toggleForm() {
    setToggle(!toggle);
    setFormInput({
      ...formInput,
      firstName: "",
      surname: "",
      email: "",
      phone_no: "",
      category: "",
      errors: {}
    });
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
      errors["firstName"] = "First name is required.";
    }

    if (typeof formInput["firstName"] !== "undefined") {
      if (!formInput["firstName"].match(/^[a-zA-Z ]*$/)) {
        isValid = false;
        errors["firstName"] = "Please enter alphabet characters only.";
      }
    }

    if (!formInput["surname"]) {
      isValid = false;
      errors["surname"] = "Surname is required.";
    }

    if (typeof formInput["surname"] !== "undefined") {
      if (!formInput["surname"].match(/^[a-zA-Z ]*$/)) {
        isValid = false;
        errors["surname"] = "Please enter alphabet characters only.";
      }
    }

    if (!formInput["email"]) {
      isValid = false;
      errors["email"] = "Email is required.";
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
      errors["phone_no"] = "Phone number is required.";
    } else if (typeof formInput["phone_no"] !== "undefined") {
      if (!formInput["phone_no"].match(/^[0-9]{11}$/)) {
        isValid = false;
        errors["phone_no"] = "Phone number must be 11 digits.";
      }
    }

    if (!formInput["category"]) {
      isValid = false;
      errors["category"] = "Add to a Category.";
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
      formInput.id = uuid();
      addContactItem(formInput);

      setFormInput({
        firstName: "",
        surname: "",
        email: "",
        phone_no: "",
        category: "",
        errors: {}
      });
      toggleForm();
    }
  }
  return (
    <div>
      <Modal show={toggle} toggleForm={toggleForm}>
        <form onSubmit={handleSubmit} className="form_wrapper">
          <h2 className="titley">ADD CONTACT</h2>
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
          <div>
            <button
              className="save_btn saveClose_btn common"
              onClick={handleSubmit}
            >
              SAVE
            </button>
            <button
              className="close_btn saveClose_btn common"
              onClick={toggleForm}
            >
              CLOSE
            </button>
          </div>
        </form>
      </Modal>
      <button onClick={toggleForm} className="addContact_btn">
        +
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addContactItem: contact => dispatch(addContact(contact))
});

export default connect(null, mapDispatchToProps)(AddContact);
