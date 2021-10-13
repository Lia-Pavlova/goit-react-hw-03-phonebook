import React, { Component } from "react";
import shortid from "shortid";

// Import components
import { ContactList } from "./components/ContactList/ContactList";
import { Filter } from "./components/Filter/Filter";
import { ContactForm } from "./components/ContactForm/ContactForm";

// Import pnotify
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

import s from "./App.module.css";

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: "",
  };

  // Requests to remote resources

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  // Record into localStorage

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  // Add contact

  forSubmitHandler = (text) => {
    const { contacts } = this.state;

    // "id" generation
    const contactsNew = {
      id: shortid.generate(),
      ...text,
    };

    const someContact = contacts.some(
      (contact) => contact.name.toLowerCase() === text.name.toLowerCase()
    );

    if (someContact) {
      alert(`${text.name} is already in contacts`);
      return;
    }

    // Add the new contact

    this.setState(({ contacts }) => ({
      contacts: [contactsNew, ...contacts],
    }));
  };

  // Delete the contact

  deleteContacts = (contactsId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactsId
      ),
    }));
  };

  // Filter

  changeFilter = (event) => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  // Searching by filter

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();
    console.log(visibleContacts);

    return (
      <div className={s.app}>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm onSubmit={this.forSubmitHandler} />
        <h2 className={s.titleContacts}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContacts={this.deleteContacts}
        />
      </div>
    );
  }
}

export default App;
