import { useState } from 'react';
import api from '../api/axios';

const Contact = () => {
  const [message, setMessage] = useState('');

  const submitHandler = async () => {
    try {
      await api.post('/contact', { message });
      alert('Message sent successfully');
      setMessage('');
    } catch (error) {
      console.error(error);
      alert('Failed to send message');
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>

      <textarea
        placeholder='Your message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={submitHandler}>Send</button>
    </div>
  );
};

export default Contact;
