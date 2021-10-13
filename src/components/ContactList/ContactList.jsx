import React from "react";
import PropTypes from "prop-types";
import s from "./ContactList.module.css";

const ContactList = ({ contacts, onDeleteContacts }) => (
  <ul className={s.contacts}>
    {contacts.map(({ id, name, number }) => (
      <li className={s.item} key={id}>
        <p className={s.name}>{name}</p>
        <p className={s.tel}>{number}</p>
        <button className={s.btnDel} onClick={() => onDeleteContacts(id)}>
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
  onDeleteContacts: PropTypes.func.isRequired,
};

export { ContactList };
