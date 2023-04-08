import React, { useState, useEffect } from 'react';
import shortid from 'shortid';

import { AppLayout } from './AppLayout.jsx';
import { Form } from './Form.jsx';
import { Header } from './Header.jsx';
import { Title } from './Title.jsx';
import { ContactList } from './ContactList.jsx';
import { ContactListItem } from './ContactListItem.jsx';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isContactExist = (name) => {
    return contacts.some((contact) => contact.name.toLowerCase() === name.toLowerCase());
  };

  const handleFormSubmit = ({ name, number }) => {
    if (isContactExist(name)) {
      alert(`The contact ${name} already exists!`);
      return;
    }

    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const handleDeleteContact = (id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Header />
      <AppLayout>
        <div>
          <Title className="mb-10" tag="h2">
            Add contact
          </Title>
          <Form onSubmit={handleFormSubmit} />
        </div>

        <div>
          <Title className="mb-10" tag="h2">
            Contact
          </Title>
          {contacts.length > 0 ? (
            <div>
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter contacts..."
              />
              <ContactList
                contacts={filteredContacts}
                filter={filter}
                onDelete={handleDeleteContact}
                renderItem={(contact) => (
                  <ContactListItem key={contact.id} contact={contact} onDelete={handleDeleteContact} />
                )}
              />
            </div>
          ) : (
            <Title tag="h3">No contact</Title>
          )}
        </div>
      </AppLayout>
    </>
  );
}
