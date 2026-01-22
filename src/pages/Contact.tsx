import { useState } from 'react';
import api from '../api/axios';
import Container from '../components/Container';

const Contact = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    if (!message.trim()) {
      alert('Please enter a message');
      return;
    }

    try {
      setLoading(true);

      const res = await api.post('/contact', { message });

      alert(res.data?.message || 'Message sent successfully');
      setMessage('');
    } catch (error: any) {
      console.error('Contact API error:', error);
      alert(
        error?.response?.data?.message ||
          'Failed to send message. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2 className='text-3xl font-bold my-10 text-center'>Contact Us</h2>

      <div className='max-w-xl mx-auto bg-white p-6 rounded-xl shadow'>
        <textarea
          className='w-full border rounded-lg p-4 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
          rows={5}
          placeholder='Your message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={submitHandler}
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white transition
            ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
          `}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </Container>
  );
};

export default Contact;
