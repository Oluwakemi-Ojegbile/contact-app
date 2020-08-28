import contactTypes from "../../actions/types";

const initState = {
  contacts: JSON.parse(localStorage.getItem("contacts")) || [],
  searchInput: ""
};

const contactReducer = (state = initState, action) => {
  switch (action.type) {
    case contactTypes.ADD_CONTACT:
      const prevData = state.contacts;

      localStorage.setItem(
        "contacts",
        JSON.stringify([action.payload, ...prevData])
      );

      return {
        ...state,
        contacts: [
          { ...action.payload, created_at: new Date().toDateString() },
          ...state.contacts
        ]
      };
    case contactTypes.DELETE_CONTACT:
      const currentContacts = [...state.contacts];
      const foundAt = state.contacts.findIndex(
        contact => contact.id === action.id
      );
      currentContacts.splice(foundAt, 1);
      localStorage.setItem("contacts", JSON.stringify(currentContacts));
      return {
        ...state,
        contacts: state.contacts.filter(contact => {
          return contact.id !== action.id;
        })
      };

    case contactTypes.EDIT_CONTACT:
      const found = state.contacts.findIndex(
        contact => contact.id === action.payload.id
      );
      const updatedContact = [...state.contacts];
      let foundContact = state.contacts[found];
      foundContact = Object.assign(foundContact, action.payload);
      updatedContact.splice(found, 1, foundContact);

      localStorage.setItem("contacts", JSON.stringify(updatedContact));

      return {
        ...state,
        contacts: updatedContact
      };

    case contactTypes.SEARCH_CONTACT:
      return {
        ...state,
        searchInput: action.payload
      };

    default:
      return state;
  }
};

export default contactReducer;
