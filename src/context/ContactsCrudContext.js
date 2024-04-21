import { createContext, useContext, useState } from "react";
import api from "../api/contacts";
import { v4 as uuidv4 } from "uuid";

const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState([]);
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //Retrive Contacs
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    if (response.data) setContacts(response.data);
  };

  //Delete Contact
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  //Add Contact
  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    console.log(response);
    setContacts([...contacts, response.data]);
  };
  //Update Contact
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };
  //search handler
  const searchHandler = (searchText) => {
    setText(searchText);
    if (searchText !== "") {
      const newContactList = contacts.filter((contact) => {
        //console.log(contact);
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  const value = {
    contact,
    contacts,
    retriveContacts,
    removeContactHandler,
    addContactHandler,
    updateContactHandler,
    searchHandler,
    text,
    searchResults,
  };
  return (
    <contactsCrudContext.Provider value={value}>
      {children}
    </contactsCrudContext.Provider>
  );
}

export function useContactsCrud() {
  return useContext(contactsCrudContext);
}
