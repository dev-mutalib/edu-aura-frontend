import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Container from '../components/Container';
import { Clock, ArrowLeft, Sparkles } from 'lucide-react';

interface Course {
  _id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string;
}

const BACKEND_URL = 'http://localhost:5000';

const resolveImage = (image: string) => {
  if (!image) return '/placeholder-course.jpg';
  if (image.startsWith('http')) return image;
  return `${BACKEND_URL}${image}`;
};

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data.data);
      } catch (err) {
        console.error('Course Details Error', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className='min-h-screen pt-20 flex justify-center items-center'>
        <p className='text-muted-foreground animate-pulse'>
          Loading course details...
        </p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className='min-h-screen pt-20 flex justify-center items-center'>
        <p className='text-destructive'>Course not found</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen pt-16 relative overflow-hidden'>
      {/* Background */}
      <div className='fixed inset-0 pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl' />
      </div>

      {/* HERO */}
      <section className='relative py-16'>
        <Container>
          <button
            onClick={() => navigate('/courses')}
            className='flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-6'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to Courses
          </button>

          <div className='grid lg:grid-cols-2 gap-10 items-center'>
            {/* Image */}
            <div className='relative rounded-2xl overflow-hidden border border-border/50'>
              <img
                src={resolveImage(course.image)}
                alt={course.title}
                className='w-full h-72 sm:h-96 object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent' />
            </div>

            {/* Content */}
            <div>
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4'>
                <Sparkles className='h-4 w-4 text-primary' />
                <span className='text-sm text-primary font-medium'>
                  Program Details
                </span>
              </div>

              <h1 className='text-3xl md:text-5xl font-bold mb-4 text-gradient'>
                {course.title}
              </h1>

              <p className='text-muted-foreground mb-6 leading-relaxed'>
                {course.description}
              </p>

              <div className='flex items-center gap-6 mb-6'>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Clock className='h-4 w-4 text-primary' />
                  {course.duration}
                </div>

                <div className='text-2xl font-bold text-gradient'>
                  ₹{course.price.toLocaleString()}
                </div>
              </div>

              {/* ✅ ENROLL BUTTON FIXED */}
              <button
                onClick={() => navigate('/admissions')}
                className='w-full sm:w-auto px-10 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium transition-all hover:scale-[1.02] hover:shadow-glow-sm'
              >
                Proceed to Enrollment
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default CourseDetails;
