import { useEffect, useState } from 'react';
import api from '../api/axios';

const Courses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await api.get('/courses');
        setCourses(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;

  return (
    <div>
      <h1>Courses</h1>

      {courses.length === 0 && <p>No courses found</p>}

      {courses.map((course) => (
        <div key={course._id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>Duration: {course.duration}</p>
          <p>Price: ₹{course.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Courses;
