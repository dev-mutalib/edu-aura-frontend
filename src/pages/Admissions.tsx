import { useState } from 'react';
import api from '../api/axios.js';

const Admissions = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    try {
      await api.post('/admissions/apply', form);
      alert('Admission applied successfully');
      setForm({ name: '', email: '', phone: '', course: '' });
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  return (
    <div>
      <h1>Admissions</h1>

      <input
        name='name'
        placeholder='Name'
        value={form.name}
        onChange={changeHandler}
      />

      <input
        name='email'
        placeholder='Email'
        value={form.email}
        onChange={changeHandler}
      />

      <input
        name='phone'
        placeholder='Phone'
        value={form.phone}
        onChange={changeHandler}
      />

      <input
        name='course'
        placeholder='Course'
        value={form.course}
        onChange={changeHandler}
      />

      <button onClick={submitHandler}>Apply</button>
    </div>
  );
};

export default Admissions;
