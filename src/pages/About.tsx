import {
  Users,
  Target,
  Heart,
  Award,
  Calendar,
  MapPin,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for academic and personal excellence in everything we do.',
      gradient: 'from-primary to-secondary',
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We maintain the highest standards of honesty and ethical conduct.',
      gradient: 'from-secondary to-accent',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We foster a supportive and inclusive learning environment.',
      gradient: 'from-accent to-primary',
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'We embrace new ideas and encourage creative thinking.',
      gradient: 'from-primary to-accent',
    },
  ];

  const timeline = [
    { year: '1985', event: 'ITM College was founded with a vision to provide quality education' },
    { year: '1992', event: 'Expanded to include engineering and business programs' },
    { year: '2001', event: 'Introduced state-of-the-art computer labs and digital learning' },
    { year: '2010', event: 'Achieved accreditation from national education board' },
    { year: '2018', event: 'Launched online learning platform and distance education' },
    { year: '2024', event: 'Celebrating 39 years of educational excellence' },
  ];

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      {/* Right Floating Contact Icons */}
      <div className="fixed top-[35%] right-3 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/918830772432"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-full bg-card/80 backdrop-blur-sm p-2.5 shadow-lg border border-border/50 transition-all duration-300 hover:scale-110 hover:shadow-glow-md"
        >
          <img
            src="https://img.icons8.com/color/36/whatsapp--v1.png"
            alt="WhatsApp"
            className="w-8 h-8"
          />
        </a>

        <a
          href="mailto:principal@ssbesitm.org"
          className="group rounded-full bg-card/80 backdrop-blur-sm p-2.5 shadow-lg border border-border/50 transition-all duration-300 hover:scale-110 hover:shadow-glow-md"
        >
          <img
            src="https://img.icons8.com/color/36/gmail-new.png"
            alt="Gmail"
            className="w-8 h-8"
          />
        </a>

        <a
          href="tel:+918830772432"
          className="group rounded-full bg-card/80 backdrop-blur-sm p-2.5 shadow-lg border border-border/50 transition-all duration-300 hover:scale-110 hover:shadow-glow-md"
        >
          <img
            src="https://img.icons8.com/color/36/phone.png"
            alt="Phone"
            className="w-8 h-8"
          />
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">About Us</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            <span className="text-gradient">About ITM College</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in delay-200">
            For nearly four decades, we've been committed to providing exceptional education 
            and nurturing the next generation of leaders, innovators, and changemakers.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-slide-left">
              <Card className="h-full bg-card/50 border-border/50 backdrop-blur-sm card-hover">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gradient">Our Mission</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    To provide transformative educational experiences that empower students to 
                    achieve their full potential, contribute meaningfully to society, and lead 
                    with purpose in an ever-changing world.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We are committed to fostering critical thinking, creativity, and character 
                    development through innovative teaching methods, research opportunities, 
                    and community engagement.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="animate-slide-right">
              <Card className="h-full bg-card/50 border-border/50 backdrop-blur-sm card-hover">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-secondary to-accent">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gradient-purple">Our Vision</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    To be a globally recognized institution of higher learning that shapes 
                    future leaders and drives positive change in communities worldwide.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We envision a future where our graduates are equipped with the knowledge, 
                    skills, and values necessary to address complex global challenges and 
                    create sustainable solutions for the betterment of humanity.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Our Core Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These fundamental principles guide everything we do and shape our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="card-hover bg-card/50 border-border/50 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${value.gradient} p-3 group-hover:scale-110 transition-transform`}>
                    <value.icon className="h-full w-full text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Our Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Milestones that shaped our institution over the years.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>

            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-8 animate-fade-in ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                  } ml-12 md:ml-0`}
                >
                  <Card className="bg-card/50 border-border/50 backdrop-blur-sm card-hover">
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold text-gradient mb-2">{item.year}</div>
                      <p className="text-muted-foreground">{item.event}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-glow-sm">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-primary via-secondary to-accent p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-20" />
                <div className="relative text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <Users className="h-16 w-16" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Dr. MADHAV M. BOKARE</h3>
                  <p className="text-white/80">Principal</p>
                </div>
              </div>

              <div className="md:w-2/3 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gradient mb-6">Principal's Message</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "Welcome to ITM College, where excellence meets opportunity. For nearly four decades, 
                  we have been committed to providing our students with an educational experience 
                  that goes beyond textbooks and classrooms."
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "Our dedicated faculty, state-of-the-art facilities, and comprehensive programs 
                  are designed to nurture not just academic success, but also personal growth, 
                  critical thinking, and leadership skills that will serve our graduates throughout 
                  their careers."
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  "I invite you to explore all that ITM College has to offer and join our vibrant 
                  community of learners, innovators, and future leaders."
                </p>

                <div className="mt-8 flex items-center text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  <span>Ph.D. in Education, Harvard University</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;