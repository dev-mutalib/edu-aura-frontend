import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Container from '../components/Container';
import { BookOpen, Clock, Sparkles, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';


/* ================= TYPES ================= */
interface Course {
  _id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image?: {
    url?: string;
  };
}

/* ================= COMPONENT ================= */
const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        setCourses(res.data?.data || []);
      } catch (err) {
        console.error('Courses API Error:', err);
        setCourses([]);
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen pt-16 flex items-center justify-center'>
        <p className='text-muted-foreground animate-pulse'>
          Loading courses...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen pt-16 flex items-center justify-center'>
        <p className='text-destructive'>{error}</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen pt-16 relative overflow-hidden'>
      <section className='py-20 text-center'>
        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6'>
          <Sparkles className='h-4 w-4 text-primary' />
          <span className='text-sm text-primary font-medium'>Our Programs</span>
        </div>

        <h1 className='text-4xl md:text-6xl font-bold mb-4'>
          <span className='text-gradient'>Our Courses</span>
        </h1>

        <p className='text-muted-foreground max-w-3xl mx-auto'>
          Explore our comprehensive range of programs designed to prepare you
          for success in your chosen field and beyond.
        </p>
      </section>

      <Container>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-20'>
          {courses.map((course, index) => (
            <Card
              key={course._id}
              className='card-hover bg-card/50 border-border/50 backdrop-blur-sm overflow-hidden group animate-fade-in'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className='relative overflow-hidden'>
                <img
                  src={course.image?.url || '/placeholder-course.jpg'}
                  alt={course.title}
                  className='h-44 w-full object-cover transition-transform duration-500 group-hover:scale-110'
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-course.jpg';
                  }}
                />
              </div>

              <CardContent className='p-6'>
                <h3 className='text-lg font-semibold'>{course.title}</h3>
                <p className='mt-2 line-clamp-3 text-sm text-muted-foreground'>
                  {course.description}
                </p>

                <div className='mt-4 flex items-center justify-between'>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <Clock className='h-4 w-4 text-primary' />
                    <span>{course.duration}</span>
                  </div>
                  <p className='font-bold text-gradient text-lg'>
                    ₹{Number(course.price || 0).toLocaleString()}
                  </p>
                </div>

                <Link to={`/courses/${course._id}`}>
                  <button className='mt-4 w-full py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium transition-all duration-300'>
                    Enroll Now
                  </button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className='py-16 border-t border-border/30'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {[
              { icon: BookOpen, value: '50+', label: 'Courses' },
              { icon: GraduationCap, value: '5000+', label: 'Students' },
              { icon: Clock, value: '100%', label: 'Practical' },
              { icon: Sparkles, value: '95%', label: 'Placement' },
            ].map((stat, index) => (
              <Card
                key={index}
                className='text-center'
              >
                <CardContent className='p-6'>
                  <stat.icon className='h-8 w-8 mx-auto text-primary mb-2' />
                  <div className='text-2xl font-bold'>{stat.value}</div>
                  <div className='text-sm text-muted-foreground'>
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Courses;
    