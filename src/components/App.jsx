import React, { Component } from 'react';
import shortid from 'shortid';

import { AppLayout } from './AppLayout.jsx';
import { Form } from './Form.jsx';
import { Header } from './Header.jsx';
import { Title } from './Title.jsx';
import { ContactList } from './ContactList.jsx';
import { ContactListItem } from './ContactListItem.jsx';

export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  isContactExist = (name) => {
    const { contacts } = this.state;
    return contacts.some((contact) => contact.name.toLowerCase() === name.toLowerCase());
  };

  handleFormSubmit = ({ name, number }) => {
    if (this.isContactExist(name)) {
      alert(`The contact ${name} already exists!`);
      return;
    }

    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleDeleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
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
            <Form onSubmit={this.handleFormSubmit} />
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
                  onChange={this.handleFilterChange}
                  placeholder="Filter contacts..."
                />
                <ContactList
                  contacts={filteredContacts}
                  filter={filter}
                  onDelete={this.handleDeleteContact}
                  renderItem={(contact) => (
                    <ContactListItem
                      key={contact.id}
                      contact={contact}
                      onDelete={this.handleDeleteContact}
                    />
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
}