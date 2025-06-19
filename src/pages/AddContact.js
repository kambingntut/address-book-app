import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveContact } from '../services/contactService';

function AddContact() {
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '' // will store base64 image
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setContact(prev => ({ ...prev, [name]: value }));
  }

  // Convert image to base64 and save
  function handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setContact(prev => ({ ...prev, avatar: reader.result }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!contact.name || !contact.email || !contact.phone) {
      alert('Please fill in name, email, and phone');
      return;
    }

    saveContact(contact);
    alert('Contact saved!');
    navigate('/');
  }

  return (
    <div>
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input type="text" name="name" value={contact.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label><br />
          <input type="email" name="email" value={contact.email} onChange={handleChange} />
        </div>
        <div>
          <label>Phone:</label><br />
          <input type="text" name="phone" value={contact.phone} onChange={handleChange} />
        </div>
        <div>
          <label>Address:</label><br />
          <input type="text" name="address" value={contact.address} onChange={handleChange} />
        </div>
        <div>
          <label>Avatar Image:</label><br />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {contact.avatar && (
            <div style={{ marginTop: '10px' }}>
              <img src={contact.avatar} alt="preview" style={{ width: '80px', borderRadius: '10px' }} />
            </div>
          )}
        </div>
        <br />
        <button type="submit">Save Contact</button>
      </form>
    </div>
  );
}

export default AddContact;
