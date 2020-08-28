import contactTypes from './types';

export const addContact = payload => {
    return {
        type: contactTypes.ADD_CONTACT,
        payload
    }
}

export const deleteContact = id => {
    return {
        type: contactTypes.DELETE_CONTACT,
        id
    }
}

export const editContact = payload => {
    return {
        type: contactTypes.EDIT_CONTACT,
        payload
    }
}

export const searchContact = payload => {
    return {
        type: contactTypes.SEARCH_CONTACT,
        payload
    }
}