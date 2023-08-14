import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../redux/contactsSlice';
import { getContacts } from '../redux/contactsSlice';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';
import { useEffect } from 'react';

function App() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <h1 className={css.title}>Phonebook </h1>
        <ContactForm />

        <h2 className={css.subtitle}>Contacts</h2>
        <Filter />
        {contacts.length > 0 && <ContactList />}
      </div>
    </div>
  );
}

export default App;
