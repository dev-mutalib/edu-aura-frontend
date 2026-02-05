import { useEffect, useState } from 'react';
import api from '../api/axios';
import Container from '../components/Container';
import { User, Award, Sparkles, BookOpen } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';


/* ================= TYPES ================= */

interface Faculty {
  _id: string;
  name: string;
  designation: string;
  subject: string;
  experience: string;
  image?: {
    url?: string;
  };
}

/* ================= COMPONENT ================= */

const Faculty = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= API CALL (AXIOS ONLY) ================= */

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await api.get('/faculty');
        setFaculty(res.data?.data || []);
      } catch (error) {
        console.error('Faculty API Error:', error);
        setFaculty([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen pt-16 relative'>
        <div className='fixed inset-0 pointer-events-none'>
          <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float' />
          <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-slow' />
        </div>
        <Container>
          <div className='flex flex-col items-center justify-center mt-20'>
            <div className='w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow mb-4'>
              <User className='h-8 w-8 text-white animate-bounce-slow' />
            </div>
            <p className='text-muted-foreground animate-pulse'>
              Loading faculty...
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className='min-h-screen pt-16 relative overflow-hidden'>
      <div className='fixed inset-0 pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-slow' />
        <div className='absolute top-1/2 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl' />
      </div>

      <section className='relative py-20'>
        <div className='absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent' />
        <div className='relative max-w-7xl mx-auto px-4 text-center'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6'>
            <Sparkles className='h-4 w-4 text-primary' />
            <span className='text-sm text-primary font-medium'>
              Meet Our Team
            </span>
          </div>
          <h1 className='text-4xl md:text-6xl font-bold mb-6'>
            <span className='text-gradient'>Our Faculty Members</span>
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Meet our distinguished educators and researchers who are committed
            to academic excellence and student success.
          </p>
        </div>
      </section>

      <Container>
        <div className='grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-20 px-2 sm:px-0'>
          {faculty.map((member, index) => (
            <Card
              key={member._id}
              className='group relative bg-card/80 border-border/50 backdrop-blur-sm overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 sm:hover:-translate-y-2 animate-fade-in'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Border on Hover */}
              <div className='absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/0 via-secondary/0 to-accent/0 group-hover:from-primary/20 group-hover:via-secondary/20 group-hover:to-accent/20 transition-all duration-500 pointer-events-none z-10' />
              
              {/* Image Container with Fixed Aspect Ratio */}
              <div className='relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-muted'>
                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent z-10' />
                
                <img
                  src={member.image?.url || '/placeholder-user.jpg'}
                  alt={member.name}
                  className='absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105'
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-user.jpg';
                  }}
                />
                
                {/* Experience Badge */}
                <div className='absolute top-2 right-2 sm:top-3 sm:right-3 z-20'>
                  <div className='flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-[10px] sm:text-xs font-semibold shadow-lg'>
                    <Award className='h-3 w-3' />
                    <span>{member.experience}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <CardContent className='relative p-3 sm:p-4 text-center space-y-2 sm:space-y-3'>
                {/* Name */}
                <h3 className='text-sm sm:text-base lg:text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1'>
                  {member.name}
                </h3>
                
                {/* Designation */}
                <div className='inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30'>
                  <User className='h-3 w-3 text-secondary' />
                  <span className='text-[10px] sm:text-xs font-medium text-secondary line-clamp-1'>{member.designation}</span>
                </div>
                
                {/* Subject */}
                <div className='flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground'>
                  <div className='p-1 sm:p-1.5 rounded-lg bg-primary/10'>
                    <BookOpen className='h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary' />
                  </div>
                  <span className='font-medium line-clamp-1'>{member.subject}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Faculty;
