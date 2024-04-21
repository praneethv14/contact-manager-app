import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardContact from "./ContactCard";
import { useContactsCrud } from "../context/ContactsCrudContext";

const ContactList = (props) => {
  const { contacts, retriveContacts, searchHandler, text, searchResults } =
    useContactsCrud();

  useEffect(() => {
    retriveContacts();
  }, []);

  const onUserSearch = (e) => {
    searchHandler(e.target.value);
  };

  const renderContactList = (text.length < 1 ? contacts : searchResults).map(
    (contact) => {
      //console.log(contact);
      return <CardContact contact={contact} key={contact.id} />;
    }
  );
  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue buttom">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={text}
            onChange={(e) => onUserSearch(e)}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No Contact Available"}
      </div>
    </div>
  );
};

export default ContactList;
