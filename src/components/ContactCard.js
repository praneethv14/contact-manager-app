import React from "react";
import user from "../images/user.png";
import { Link } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

const CardContact = (props) => {
  const { removeContactHandler } = useContactsCrud();

  const deleteContact = (id) => {
    removeContactHandler(id);
  };

  const { id, name, email } = props.contact;
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link to={`/contact/${id}`} state={{ contact: props.contact }}>
          <div className="header">{name}</div>
        </Link>
        <div>{email}</div>
      </div>

      <Link to={`/edit`} state={{ contact: props.contact }}>
        <i
          className="edit alternate outline icon"
          style={{ color: "red", marginTop: "7px" }}
        ></i>
      </Link>

      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px" }}
        onClick={() => deleteContact(id)}
      ></i>
    </div>
  );
};
export default CardContact;
