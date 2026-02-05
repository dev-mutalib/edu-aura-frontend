import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, Clock, BookOpen, Users, Award, Briefcase, Target, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const degrees = [
  {
    id: 'bca',
    name: 'BCA',
    fullName: 'Bachelor of Computer Applications',
    duration: '3 Years',
    semesters: '6 Semesters',
    type: 'Undergraduate',
    description: 'Comprehensive program covering programming, software development, and IT fundamentals.',
    highlights: ['Industry-ready curriculum', 'Hands-on projects', '100% placement assistance'],
    careers: ['Software Developer', 'Web Developer', 'System Analyst'],
    eligibility: '10+2 with Mathematics',
    fees: '₹45,000/year',
    icon: '💻',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'bba',
    name: 'BBA',
    fullName: 'Bachelor of Business Administration',
    duration: '3 Years',
    semesters: '6 Semesters',
    type: 'Undergraduate',
    description: 'Develop essential business skills in management, marketing, and entrepreneurship.',
    highlights: ['Case study approach', 'Industry internships', 'Leadership development'],
    careers: ['Business Analyst', 'Marketing Manager', 'HR Manager'],
    eligibility: '10+2 from any stream',
    fees: '₹40,000/year',
    icon: '📊',
    gradient: 'from-purple-500 to-pink-400',
  },
  {
    id: 'bsc-hospitality',
    name: 'B.Sc. (HS)',
    fullName: 'Bachelor of Science in Hospitality Studies',
    duration: '3 Years',
    semesters: '6 Semesters',
    type: 'Undergraduate',
    description: 'Prepare for a dynamic career in hospitality, tourism, and hotel management.',
    highlights: ['Practical training', 'Industry exposure', 'Global career opportunities'],
    careers: ['Hotel Manager', 'Event Coordinator', 'Tourism Manager'],
    eligibility: '10+2 from any stream',
    fees: '₹50,000/year',
    icon: '🏨',
    gradient: 'from-orange-500 to-amber-400',
  },
  {
    id: 'mca',
    name: 'MCA',
    fullName: 'Master of Computer Applications',
    duration: '2 Years',
    semesters: '4 Semesters',
    type: 'Postgraduate',
    description: 'Advanced program for aspiring software engineers and IT professionals.',
    highlights: ['Advanced programming', 'Research opportunities', 'Industry collaborations'],
    careers: ['Software Architect', 'Data Scientist', 'AI Engineer'],
    eligibility: 'BCA/B.Sc. with Math',
    fees: '₹65,000/year',
    icon: '🎓',
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    id: 'mba',
    name: 'MBA',
    fullName: 'Master of Business Administration',
    duration: '2 Years',
    semesters: '4 Semesters',
    type: 'Postgraduate',
    description: 'Prepare for leadership roles with strategic management and business expertise.',
    highlights: ['Multiple specializations', 'Executive mentorship', 'Global exposure'],
    careers: ['CEO', 'Marketing Director', 'Strategy Consultant'],
    eligibility: 'Bachelor in any discipline',
    fees: '₹85,000/year',
    icon: '🏆',
    gradient: 'from-rose-500 to-red-400',
  },
  {
    id: 'msc-cs',
    name: 'M.Sc. C.S.',
    fullName: 'Master of Science in Computer Science',
    duration: '2 Years',
    semesters: '4 Semesters',
    type: 'Postgraduate',
    description: 'Advanced theoretical and practical knowledge in computer science and research.',
    highlights: ['Research-focused', 'AI & ML specialization', 'Academic excellence'],
    careers: ['Research Scientist', 'ML Engineer', 'University Professor'],
    eligibility: 'B.Sc. CS/IT/Math or BCA',
    fees: '₹60,000/year',
    icon: '🔬',
    gradient: 'from-indigo-500 to-violet-400',
  },
];

const Degrees = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Academic Programs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gradient mb-6">
            Our Degree Programs
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose from our range of undergraduate and postgraduate programs designed to prepare you for a successful career.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-card rounded-full border border-border/50">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-xs sm:text-sm">6 Programs</span>
            </div>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-card rounded-full border border-border/50">
              <Users className="h-4 w-4 text-secondary" />
              <span className="text-xs sm:text-sm">5000+ Alumni</span>
            </div>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-card rounded-full border border-border/50">
              <Award className="h-4 w-4 text-accent" />
              <span className="text-xs sm:text-sm">NAAC Accredited</span>
            </div>
          </div>
        </div>
      </section>

      {/* Degrees Grid */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {degrees.map((degree, index) => (
              <Link
                key={degree.id}
                to={`/degrees/${degree.id}`}
                className="group relative block overflow-hidden rounded-2xl sm:rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow-sm animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Top Border */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${degree.gradient}`} />
                
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${degree.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative p-5 sm:p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${degree.gradient} flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg`}>
                        {degree.icon}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {degree.name}
                        </h3>
                        <span className={`inline-block px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full bg-gradient-to-r ${degree.gradient} text-white`}>
                          {degree.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Full Name */}
                  <p className="text-sm sm:text-base text-muted-foreground mb-3 line-clamp-1">
                    {degree.fullName}
                  </p>
                  
                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground/80 mb-4 line-clamp-2">
                    {degree.description}
                  </p>
                  
                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
                    <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-lg bg-muted/30 border border-border/30">
                      <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs text-foreground truncate">{degree.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-lg bg-muted/30 border border-border/30">
                      <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-secondary flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs text-foreground truncate">{degree.semesters}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-lg bg-muted/30 border border-border/30">
                      <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs text-foreground truncate">{degree.eligibility}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-lg bg-muted/30 border border-border/30">
                      <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs text-foreground truncate">{degree.fees}</span>
                    </div>
                  </div>
                  
                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {degree.highlights.slice(0, 3).map((highlight) => (
                      <span
                        key={highlight}
                        className="px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                  
                  {/* Career Paths */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">Career Paths:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {degree.careers.map((career) => (
                        <span
                          key={career}
                          className="px-2 py-0.5 text-[10px] sm:text-xs bg-secondary/10 text-secondary rounded-full"
                        >
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div className={`flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r ${degree.gradient} text-white font-medium text-sm group-hover:shadow-glow-sm transition-all duration-300`}>
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center p-6 sm:p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl sm:rounded-3xl border border-border/50">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6">
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
