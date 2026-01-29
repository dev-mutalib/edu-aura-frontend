import { useEffect, useState } from 'react';
import api from '../api/axios';
import Container from '../components/Container';
import { BookOpen, Clock, Sparkles, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
      <div className="min-h-screen pt-16 relative">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-slow" />
        </div>
        <Container>
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow mb-4">
              <BookOpen className="h-8 w-8 text-white animate-bounce-slow" />
            </div>
            <p className="text-muted-foreground animate-pulse">Loading courses...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-16 relative">
        <Container>
          <div className="flex flex-col items-center justify-center mt-20">
            <p className="text-destructive text-lg">{error}</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Our Programs</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            <span className="text-gradient">Our Courses</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in delay-200">
            Explore our comprehensive range of programs designed to prepare you for success 
            in your chosen field and beyond.
          </p>
        </div>
      </section>

      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-20">
          {courses.map((course, index) => (
            <Card
              key={course._id}
              className="card-hover bg-card/50 border-border/50 backdrop-blur-sm overflow-hidden group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Course Image */}
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-gradient transition-all">
                  {course.title}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  {course.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{course.duration}</span>
                  </div>

                  <p className="font-bold text-gradient text-lg">
                    ₹{course.price.toLocaleString()}
                  </p>
                </div>

                <button className="mt-4 w-full py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium transition-all duration-300 hover:shadow-glow-sm hover:scale-[1.02] shimmer">
                  Enroll Now
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <section className="relative py-16 border-t border-border/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, value: '50+', label: 'Courses', gradient: 'from-primary to-secondary' },
              { icon: GraduationCap, value: '5000+', label: 'Students', gradient: 'from-secondary to-accent' },
              { icon: Clock, value: '100%', label: 'Practical', gradient: 'from-accent to-primary' },
              { icon: Sparkles, value: '95%', label: 'Placement', gradient: 'from-primary to-accent' },
            ].map((stat, index) => (
              <Card key={index} className="card-hover bg-card/50 border-border/50 backdrop-blur-sm text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.gradient} p-2.5`}>
                    <stat.icon className="h-full w-full text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
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