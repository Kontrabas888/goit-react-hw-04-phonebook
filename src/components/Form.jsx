import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Button } from 'components/Button';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export function Form({ onSubmit }) {
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, number } = formData;

    onSubmit({
      id: nanoid(),
      name,
      number,
    });

    reset();
  };

  const reset = () => {
    setFormData(INITIAL_STATE);
  };

  const { name, number } = formData;

  return (
    <form onSubmit={handleFormSubmit} autoComplete="off">
      <div className="mb-10 grid gap-5">
        <label className="label">
          <span className="label-text">Name</span>
          <input
            type="text"
            className="input"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label className="label">
          <span className="label-text">Number</span>
          <input
            type="tel"
            className="input"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
      </div>

      <Button type="submit">Add contact</Button>
    </form>
  );  
}
