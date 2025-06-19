import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getContacts, deleteContact } from '../services/contactService';

function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      const data = await getContacts();
      setContacts(data);
    }
  
    fetchContacts();
  }, []);
  
  
  async function handleDelete(id) {
    await deleteContact(id);
    const updated = await getContacts();
    setContacts(updated);
  }

  return (
    <div>
      <h2>Home Page - List of Contacts</h2>
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {contacts.map(contact => (
            <div
              key={contact.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}
            >
              <img
                src={contact.avatar}
                alt={contact.name}
                style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '15px' }}
              />
              <div style={{ flex: 1 }}>
                <strong>{contact.name}</strong><br />
                📞 {contact.phone} <br />
                📧 {contact.email}
              </div>
              <div>
                <Link to={`/edit/${contact.id}`} style={{ marginRight: '10px' }}>Edit</Link>
                <button onClick={() => handleDelete(contact.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
