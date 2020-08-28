import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Contact from './Contact';

const OthersContacts = ({ contacts, searchVal }) => {
    const [othersFiltered, setOthersFiltered] = useState([]);
    useEffect(() => {
        const othersData = searchVal !=="" ? contacts.filter(contact => {
            const valToLowerCase = searchVal.toLowerCase();
            const matchedWords = [
                contact.firstName.toLowerCase().includes(valToLowerCase),
                contact.surname.toLowerCase().includes(valToLowerCase),
                contact.phone_no.includes(valToLowerCase)
            ];
            return matchedWords.some(element => element);
        })
        : contacts;
        setOthersFiltered([...othersData]);
    }, [searchVal, contacts]);

    const othersList = othersFiltered.length <= 0 ? (
        <p className="noContact">No contact Yet!!!</p>
       ) : ( othersFiltered.sort().map( contact => {
            if( contact.category === "others"){
            return <Contact contact={contact} key={contact.id} searchVal={searchVal} />
        }
        return null
    }));
    return (
        <div>
           { othersList }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        contacts: state.contacts.contacts,
        searchVal: state.contacts.searchInput
    }
}

export default connect(mapStateToProps)(OthersContacts); 