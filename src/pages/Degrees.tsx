import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, Clock, BookOpen, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const degrees = [
  {
    id: 'bca',
    name: 'BCA',
    fullName: 'Bachelor of Computer Applications',
    duration: '3 Years',
    type: 'Undergraduate',
    description: 'Comprehensive program covering programming, software development, and IT fundamentals.',
    highlights: ['Industry-ready curriculum', 'Hands-on projects', '100% placement assistance'],
    icon: '💻',
  },
  {
    id: 'bba',
    name: 'BBA',
    fullName: 'Bachelor of Business Administration',
    duration: '3 Years',
    type: 'Undergraduate',
    description: 'Develop essential business skills in management, marketing, and entrepreneurship.',
    highlights: ['Case study approach', 'Industry internships', 'Leadership development'],
    icon: '📊',
  },
  {
    id: 'mca',
    name: 'MCA',
    fullName: 'Master of Computer Applications',
    duration: '2 Years',
    type: 'Postgraduate',
    description: 'Advanced program for aspiring software engineers and IT professionals.',
    highlights: ['Advanced programming', 'Research opportunities', 'Industry collaborations'],
    icon: '🎓',
  },
  {
    id: 'mba',
    name: 'MBA',
    fullName: 'Master of Business Administration',
    duration: '2 Years',
    type: 'Postgraduate',
    description: 'Prepare for leadership roles with strategic management and business expertise.',
    highlights: ['Multiple specializations', 'Executive mentorship', 'Global exposure'],
    icon: '🏆',
  },
];

const Degrees = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Academic Programs</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
            Our Degree Programs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose from our range of undergraduate and postgraduate programs designed to prepare you for a successful career.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border/50">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm">4 Programs</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border/50">
              <Users className="h-4 w-4 text-secondary" />
              <span className="text-sm">5000+ Alumni</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border/50">
              <Award className="h-4 w-4 text-accent" />
              <span className="text-sm">NAAC Accredited</span>
            </div>
          </div>
        </div>
      </section>

      {/* Degrees Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {degrees.map((degree) => (
              <Link
                key={degree.id}
                to={`/degrees/${degree.id}`}
                className="group block p-8 bg-card rounded-3xl border border-border/50 hover:border-primary/50 hover:shadow-glow-sm transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{degree.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                        {degree.name}
                      </h3>
                      <span className="px-3 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded-full">
                        {degree.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-1">{degree.fullName}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Clock className="h-4 w-4" />
                      <span>{degree.duration}</span>
                    </div>
                    <p className="text-muted-foreground mb-4">{degree.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {degree.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <Button variant="ghost" className="group-hover:text-primary p-0">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl border border-border/50">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-muted-foreground mb-6">
            Apply now for admissions and take the first step towards your dream career.
          </p>
          <Link to="/admissions">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow-md">
              Apply for Admission
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Degrees;
