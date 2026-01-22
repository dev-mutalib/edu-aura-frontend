import { useEffect, useState } from 'react';
import api from '../api/axios';
import Container from '../components/Container';

interface Faculty {
  _id: string;
  name: string;
  designation: string;
  subject: string;
  experience: string;
  image: string;
}

const Faculty = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await api.get('/faculty');
        setFaculty(res.data.data);
      } catch (error) {
        console.error('Faculty API Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  if (loading) {
    return (
      <Container>
        <p className='text-center mt-20'>Loading faculty...</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className='text-3xl font-bold text-center my-10'>
        Our Faculty Members
      </h2>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {faculty.map((member) => (
          <div
            key={member._id}
            className='bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden text-center'
          >
            <img
              src={member.image}
              alt={member.name}
              className='w-full h-56 object-cover'
            />

            <div className='p-5'>
              <h3 className='text-lg font-semibold'>{member.name}</h3>

              <p className='text-sm text-blue-600 mt-1'>{member.designation}</p>

              <p className='text-sm text-gray-600 mt-1'>
                Subject: {member.subject}
              </p>

              <p className='text-sm text-gray-600'>
                Experience: {member.experience}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Faculty;
