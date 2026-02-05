import { useEffect, useState } from 'react';
import api from '../api/axios';
import Container from '../components/Container';
import { User, Award, Sparkles, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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

/* ================= IMAGE FIX ================= */

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const resolveImageUrl = (image?: { url?: string }) => {
  if (!image?.url) return '/placeholder-user.jpg';

  // external image
  if (image.url.startsWith('http://') || image.url.startsWith('https://')) {
    return image.url;
  }

  // local backend image
  return `${BACKEND_URL}${image.url}`;
};

/* ================= COMPONENT ================= */

const Faculty = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= API CALL (AXIOS ONLY) ================= */

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
      <div className='min-h-screen pt-16 relative'>
        {/* Background Effects */}
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
      {/* Background Effects */}
      <div className='fixed inset-0 pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-slow' />
        <div className='absolute top-1/2 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl' />
      </div>

      {/* Hero Section */}
      <section className='relative py-20'>
        <div className='absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent' />
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 animate-fade-in'>
            <Sparkles className='h-4 w-4 text-primary' />
            <span className='text-sm text-primary font-medium'>
              Meet Our Team
            </span>
          </div>
          <h1 className='text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up'>
            <span className='text-gradient'>Our Faculty Members</span>
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in delay-200'>
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
              {/* Faculty Image */}
              <div className='relative overflow-hidden bg-muted'>
                <img
                  src={resolveImageUrl(member.image)}
                  alt={member.name}
                  className='h-56 w-full object-contain transition-transform duration-500 group-hover:scale-105'
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-user.jpg';
                  }}
                />

                <div className='absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                {/* Overlay Badge */}
                <div className='absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-primary/80 to-secondary/80 backdrop-blur-sm text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
                  {member.experience}
                </div>
              </div>

              <CardContent className='p-5'>
                <h3 className='text-lg font-semibold text-foreground group-hover:text-gradient transition-all'>
                  {member.name}
                </h3>

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

                <button className='mt-4 w-full py-2 rounded-lg border border-primary/50 text-primary font-medium transition-all duration-300 hover:bg-primary/10 hover:border-primary hover:shadow-glow-sm'>
                  View Profile
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <section className='relative py-16 border-t border-border/30'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4'>
              <span className='text-gradient'>Faculty Excellence</span>
            </h2>
            <p className='text-muted-foreground'>
              Our commitment to academic and research excellence
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {[
              { value: '200+', label: 'Faculty Members' },
              { value: '85%', label: 'Ph.D. Holders' },
              { value: '500+', label: 'Publications' },
              { value: '15:1', label: 'Student Ratio' },
            ].map((stat, index) => (
              <Card
                key={index}
                className='card-hover bg-card/50 border-border/50 backdrop-blur-sm text-center animate-fade-in'
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className='p-6'>
                  <div className='text-3xl font-bold text-gradient mb-1'>
                    {stat.value}
                  </div>
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

export default Faculty;
