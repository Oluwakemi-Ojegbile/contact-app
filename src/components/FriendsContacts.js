import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Contact from "./Contact";

const FriendsContacts = ({ contacts, searchVal }) => {
  const [friendsFiltered, setFriendsFiltered] = useState([]);
  useEffect(() => {
    const friendsData =
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
    setFriendsFiltered([...friendsData]);
  }, [searchVal, contacts]);

  const friendsList = friendsFiltered.length <= 0 ? (
    <p className="noContact">No contact Yet!!!</p>
  ) : ( friendsFiltered.sort().map(contact => {
    if (contact.category === "friends") {
      return (
        <Contact contact={contact} key={contact.id} searchVal={searchVal} />
      );
    }
    return null;
  }));
  return <div>{friendsList}</div>;
};

const mapStateToProps = state => {
  return {
    contacts: state.contacts.contacts,
    searchVal: state.contacts.searchInput
  };
};

export default connect(mapStateToProps)(FriendsContacts);
