import React, { Component } from "react";
import s from "./ContactForm.module.css";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
    text: "",
  };

  // input  to "input"

  handleChange = (event) => {
    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  // add contact via button

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.resetInput();
  };

  // clear input fields

  resetInput = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <label className={s.label}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="The name can only consist of letters, apostrophes, dashes and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan etc."
            required
            value={name}
            onChange={this.handleChange}
            className={s.input}
          />
        </label>
        <label className={s.label}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="The phone number must be digits and may contain spaces, dashes, parentheses and may start with +"
            required
            value={number}
            onChange={this.handleChange}
            className={s.input}
          />
        </label>
        <button type="submit" className={s.btnAdd}>
          Add contact
        </button>
      </form>
    );
  }
}

export { ContactForm };
