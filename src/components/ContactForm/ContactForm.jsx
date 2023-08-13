import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, fetchContacts } from '../../redux/contactsSlice';
import PropTypes from 'prop-types';
import { getContacts } from '../../redux/contactsSlice';
import css from './ContactForm.module.css';

function ContactForm({ onClose }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onChangeName = e => setName(e.currentTarget.value);
  const onChangeNumber = e => setNumber(e.currentTarget.value);

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const onSubmitForm = async e => {
    e.preventDefault();

    const newElement = { id: nanoid(), name, number };

    if (contacts.some(contact => contact.name === name)) {
      window.alert(`${name} is already in the contact list.`);
      return;
    } else {
      dispatch(addContact(newElement));
      dispatch(fetchContacts());
    }

    reset();
    onClose();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={onSubmitForm}>
      <label className={css.label}>
        <span className={css.title}>Name</span>
        <input
          className={css.input}
          onChange={onChangeName}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-ЯєЄі-їІ-Ї]+(([' -][a-zA-Zа-яА-ЯєЄі-їІ-Ї ])?[a-zA-Zа-яА-ЯєЄі-їІ-Ї]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.label}>
        <span className={css.title}>Number</span>
        <input
          className={css.input}
          onChange={onChangeNumber}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.prototype = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ContactForm;
