import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import { selectContacts } from "../../redux/contactsSlice";
import s from "./ContactForm.module.css";

function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const number = form.number.value.trim();

    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      return alert(`${name} is already in contacts.`);
    }

    dispatch(addContact({ name, number }));
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <input name="name" type="text" placeholder="Name" required />
      <input name="number" type="tel" placeholder="Phone Number" required />
      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;
