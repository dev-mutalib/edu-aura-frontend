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
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pb-20'>
          {faculty.map((member, index) => (
            <Card
              key={member._id}
              className='card-hover bg-card/50 border-border/50 backdrop-blur-sm overflow-hidden group text-center animate-fade-in'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className='relative overflow-hidden bg-muted'>
                <img
                  src={member.image?.url || '/placeholder-user.jpg'}
                  alt={member.name}
                  className='h-56 w-full object-contain transition-transform duration-500 group-hover:scale-105'
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-user.jpg';
                  }}
                />
              </div>

              <CardContent className='p-5'>
                <h3 className='text-lg font-semibold'>{member.name}</h3>
                <p className='mt-1 text-sm font-medium text-primary'>
                  {member.designation}
                </p>
                <div className='mt-3 space-y-2'>
                  <div className='flex items-center justify-center gap-2 text-sm text-muted-foreground'>
                    <BookOpen className='h-4 w-4 text-secondary' />
                    <span>{member.subject}</span>
                  </div>
                  <div className='flex items-center justify-center gap-2 text-sm text-muted-foreground'>
                    <Award className='h-4 w-4 text-accent' />
                    <span>{member.experience}</span>
                  </div>
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
