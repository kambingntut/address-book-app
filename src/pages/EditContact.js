import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContactById, updateContact } from '../services/contactService';

function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      try {
        const found = await getContactById(id);
        setContact(found);
      } catch (error) {
        alert('Contact not found');
        console.error(error);
      }
    }
  
    fetchContact();
  }, [id]);
  
  function handleChange(e) {
    const { name, value } = e.target;
    setContact(prev => ({ ...prev, [name]: value }));
  }

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

  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      await updateContact(id, contact); // ✅ use id
      alert('Contact updated!');
      navigate('/');
    } catch (error) {
      alert('Failed to update contact.');
      console.error(error);
    }
  }
  

  if (!contact) return <p>Loading contact...</p>;

  return (
    <div>
      <h2>Edit Contact</h2>
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
          <label>Update Avatar:</label><br />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {contact.avatar && (
            <div style={{ marginTop: '10px' }}>
              <img src={contact.avatar} alt="preview" style={{ width: '80px', borderRadius: '10px' }} />
            </div>
          )}
        </div>
        <br />
        <button type="submit">Update Contact</button>
      </form>
    </div>
  );
}

export default EditContact;
