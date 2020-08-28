import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Contact from "./Contact";

const FamilyContacts = ({ contacts, searchVal }) => {
  const [familyFiltered, setFamilyFiltered] = useState([]);
  useEffect(() => {
    const familyData =
      searchVal !== ""
        ? contacts.filter(contact => {
            const valToLowerCase = searchVal.toLowerCase();
            const matchedWords = [
              contact.firstName.toLowerCase().includes(valToLowerCase),
              contact.surname.toLowerCase().includes(valToLowerCase),
              contact.phone_no.includes(valToLowerCase)
            ];
            return matchedWords.some(element => element);
          })
        : contacts;
    setFamilyFiltered([...familyData]);
  }, [searchVal, contacts]);

  const familyList =
    familyFiltered.length <= 0 ? (
      <p className="noContact">No contact Yet!!!</p>
    ) : (
      familyFiltered.map(contact => {
        if (contact.category === "family") {
          return (
            <Contact contact={contact} key={contact.id} searchVal={searchVal} />
          );
        }
        return null;
      })
    );
  return <div className="family_wrapper">{familyList}</div>;
};

const mapStateToProps = state => {
  return {
    contacts: state.contacts.contacts,
    searchVal: state.contacts.searchInput
  };
};

export default connect(mapStateToProps)(FamilyContacts);
