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
              className='group relative bg-card/60 border-border/50 backdrop-blur-sm overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 animate-fade-in'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Border Effect */}
              <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-secondary/0 to-accent/0 group-hover:from-primary/20 group-hover:via-secondary/20 group-hover:to-accent/20 transition-all duration-500 pointer-events-none' />
              
              {/* Image Container with Proper Aspect Ratio */}
              <div className='relative aspect-[16/10] overflow-hidden'>
                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent z-10' />
                
                <img
                  src={course.image?.url || '/placeholder-course.jpg'}
                  alt={course.title}
                  className='absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110'
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-course.jpg';
                  }}
                />
                
                {/* Duration Badge */}
                <div className='absolute top-3 left-3 z-20'>
                  <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm border border-border/50 shadow-lg'>
                    <Clock className='h-3.5 w-3.5 text-primary' />
                    <span className='text-xs font-semibold text-foreground'>{course.duration}</span>
                  </div>
                </div>
                
                {/* Price Badge */}
                <div className='absolute top-3 right-3 z-20'>
                  <div className='px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-lg'>
                    ₹{Number(course.price || 0).toLocaleString()}
                  </div>
                </div>
              </div>

              <CardContent className='relative p-5'>
                {/* Title */}
                <h3 className='text-lg font-bold text-foreground group-hover:text-gradient transition-all duration-300 line-clamp-2'>
                  {course.title}
                </h3>
                
                {/* Description */}
                <p className='mt-2 line-clamp-2 text-sm text-muted-foreground leading-relaxed'>
                  {course.description}
                </p>

                {/* CTA Button */}
                <Link to={`/courses/${course._id}`}>
                  <button className='mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold transition-all duration-300 hover:shadow-glow-md group-hover:shadow-lg relative overflow-hidden'>
                    <span className='relative z-10 flex items-center justify-center gap-2'>
                      <GraduationCap className='h-4 w-4' />
                      Enroll Now
                    </span>
                    <div className='absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
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
    