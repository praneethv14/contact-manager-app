import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import api from "../api/contacts";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import { ContactsCrudContextProvider } from "../context/ContactsCrudContext";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  // useEffect(() => {
  //   const getAllContacts = async () => {
  //     const allContacts = await retriveContacts();
  //     if (allContacts) setContacts(allContacts);
  //   };
  //   getAllContacts();
  // }, []);

  // const [contacts, setContacts] = useState(() => {
  //   return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  // });

  // useEffect(() => {
  //   const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (retriveContacts) setContacts(retriveContacts);
  // }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  // const contacts = [
  //   {
  //     id: "1",
  //     name: "praneeth",
  //     email: "praneeth@gmail.com",
  //   },
  //   {
  //     id: "2",
  //     name: "praneeth2",
  //     email: "praneeth2@gmail.com",
  //   },
  // ];

  return (
    <div className="ui container">
      {/* <Header /> */}
      <Router>
        <ContactsCrudContextProvider>
          <Routes>
            <Route path="/" element={<ContactList />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/contact/:id" element={<ContactDetail />} />
            <Route path="/edit" element={<EditContact />} />
          </Routes>
        </ContactsCrudContextProvider>
        {/* <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
      </Router>
    </div>
  );
}

export default App;
