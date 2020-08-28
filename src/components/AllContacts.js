import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Contact from "./Contact";

const AllContact = ({ contacts, searchVal }) => {
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    const data =
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
    setFiltered([...data]);
  }, [searchVal, contacts]);

  const contactList =
    filtered.length <= 0 ? (                                                                                                                                                                                                                                                                                                                                        
      <p className="noContact">No contact Yet!!!</p>
    ) : (
      filtered.sort().map(contact => {
        return (
          <Contact contact={contact} key={contact.id} searchVal={searchVal} />
        );
      })
    );
  return (
    <div className="container">
      <div className="homepage">{contactList}</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    contacts: state.contacts.contacts,
    searchVal: state.contacts.searchInput
  };
};

export default connect(mapStateToProps)(AllContact);
