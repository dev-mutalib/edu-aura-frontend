import { useEffect, useState } from 'react';
import api from '../api/axios';
import Container from '../components/Container';

interface Course {
  _id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');

        /**
         * Backend response shape:
         * {
         *   success: true,
         *   count: number,
         *   data: Course[]
         * }
         */
        setCourses(res.data.data);
      } catch (err) {
        console.error('Courses API Error:', err);
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <Container>
        <p className='text-center mt-20 text-gray-500'>Loading courses...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p className='text-center mt-20 text-red-500'>{error}</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className='text-3xl font-bold my-10 text-center'>Our Courses</h2>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {courses.map((course) => (
          <div
            key={course._id}
            className='bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden'
          >
            {/* Course Image */}
            <img
              src={course.image}
              alt={course.title}
              className='h-44 w-full object-cover'
            />

            {/* Course Content */}
            <div className='p-6'>
              <h3 className='text-lg font-semibold'>{course.title}</h3>

              <p className='text-sm text-gray-600 mt-2 line-clamp-3'>
                {course.description}
              </p>

              <p className='mt-3 text-sm text-gray-700'>
                Duration: <span className='font-medium'>{course.duration}</span>
              </p>

              <p className='mt-2 font-bold text-blue-600'>
                ₹{course.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Courses;
