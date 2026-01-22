import { useState } from 'react';
import api from '../api/axios';
import Container from '../components/Container';
import toast, { Toaster } from 'react-hot-toast';

const Admissions = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
  });

  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    // validation
    if (!form.name || !form.email || !form.phone || !form.course) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      setLoading(true);

      await api.post('/admissions/apply', form);

      toast.success('Admission applied successfully');

      // reset form
      setForm({
        name: '',
        email: '',
        phone: '',
        course: '',
      });
    } catch (error: any) {
      console.error('Admission API Error:', error);

      toast.error(
        error?.response?.data?.message || 'Failed to apply admission',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {/* TOASTER ONLY FOR THIS PAGE */}
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: '14px',
          },
        }}
      />

      <h2 className='text-3xl font-bold my-10 text-center'>Admission Form</h2>

      <div className='max-w-xl mx-auto bg-white p-6 rounded-xl shadow'>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            value={(form as any)[key]}
            className='w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder={key.toUpperCase()}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            disabled={loading}
          />
        ))}

        <button
          onClick={submitHandler}
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white transition
            ${
              loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }
          `}
        >
          {loading ? 'Submitting...' : 'Apply Now'}
        </button>
      </div>
    </Container>
  );
};

export default Admissions;
