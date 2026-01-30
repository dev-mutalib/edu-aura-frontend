import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Target,
  Calendar,
  Bell,
  ClipboardList,
  LucideIcon,
  Sparkles,
  GraduationCap,
  Laptop,
} from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import EduBot from '@/components/EduBot';
import CourseMarquee from '@/components/CourseMarquee';

/* ---------- CAROUSEL IMAGES ---------- */
import itm1 from '../Assets/images/itm1.jpg';
import itm2 from '../Assets/images/itm2.jpg';
import itm3 from '../Assets/images/itm3.jpg';
import itm4 from '../Assets/images/itm4.jpg';
import itm5 from '../Assets/images/itm5.jpg';
import itm6 from '../Assets/images/itm6.jpg';
import itm7 from '../Assets/images/itm7.jpg';

/* ---------- TYPES ---------- */

interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

interface CarouselItem {
  image: string;
}

interface NoticeItem {
  id: number;
  title: string;
  date: string;
  program: string;
  icon: LucideIcon;
}

const Home: React.FC = () => {
  /* ---------- DATA ---------- */

  const features: FeatureItem[] = [
    {
      title: 'Quality Education',
      description: 'World-class curriculum designed by industry experts.',
      icon: BookOpen,
      gradient: 'from-primary to-secondary',
    },
    {
      title: 'Expert Faculty',
      description: 'Learn from experienced industry professionals.',
      icon: Users,
      gradient: 'from-secondary to-accent',
    },
    {
      title: 'Modern Facilities',
      description: 'Smart campus with cutting-edge technology.',
      icon: Laptop,
      gradient: 'from-accent to-primary',
    },
    {
      title: 'Career Support',
      description: 'Comprehensive placement guidance & support.',
      icon: Award,
      gradient: 'from-primary to-accent',
    },
  ];

  const carouselItems: CarouselItem[] = [
    { image: itm1 },
    { image: itm2 },
    { image: itm3 },
    { image: itm4 },
    { image: itm5 },
    { image: itm6 },
    { image: itm7 },
  ];

  const notices: NoticeItem[] = [
    {
      id: 1,
      title: 'BCA Mid-Term Exams',
      date: 'May 25, 2025',
      program: 'BCA',
      icon: ClipboardList,
    },
    {
      id: 2,
      title: 'BBA Industry Visit',
      date: 'June 5, 2025',
      program: 'BBA',
      icon: Calendar,
    },
    {
      id: 3,
      title: 'MCA Project Deadline',
      date: 'June 15, 2025',
      program: 'MCA',
      icon: Bell,
    },
  ];

  const stats = [
    { value: '5000+', label: 'Students', icon: Users },
    { value: '200+', label: 'Faculty', icon: GraduationCap },
    { value: '50+', label: 'Courses', icon: BookOpen },
    { value: '95%', label: 'Placement', icon: Target },
  ];

  /* ---------- AUTO SCROLL NOTICE BOARD ---------- */

  const AutoScrollNoticeBoard: React.FC = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      let pos = 0;
      const interval = window.setInterval(() => {
        pos += 1;
        if (pos >= el.scrollHeight - el.clientHeight) {
          pos = 0;
        }
        el.scrollTop = pos;
      }, 80);

      return () => window.clearInterval(interval);
    }, []);

    return (
      <div className="h-72 sm:h-80 md:h-96 overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
        <div ref={ref}>
          {notices.map((n) => (
            <div key={n.id} className="border-b border-border/30 p-4 last:border-none group hover:bg-muted/30 transition-colors">
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <n.icon className="text-primary" size={18} />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-medium text-foreground">
                    {n.title}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {n.date} • {n.program}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ---------- CAROUSEL SETTINGS ---------- */

  const carouselSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    fade: true,
  };

  return (
    <div className="relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" />
      </div>

      {/* RIGHT FLOATING CONTACT ICONS */}
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
            className="h-8 w-8 group-hover:animate-bounce-slow"
          />
        </a>

        <a
          href="mailto:principal@ssbesitm.org"
          className="group rounded-full bg-card/80 backdrop-blur-sm p-2.5 shadow-lg border border-border/50 transition-all duration-300 hover:scale-110 hover:shadow-glow-md"
        >
          <img
            src="https://img.icons8.com/color/36/gmail-new.png"
            alt="Gmail"
            className="h-8 w-8 group-hover:animate-bounce-slow"
          />
        </a>

        <a
          href="tel:+918830772432"
          className="group rounded-full bg-card/80 backdrop-blur-sm p-2.5 shadow-lg border border-border/50 transition-all duration-300 hover:scale-110 hover:shadow-glow-md"
        >
          <img
            src="https://img.icons8.com/color/36/phone.png"
            alt="Phone"
            className="h-8 w-8 group-hover:animate-wiggle"
          />
        </a>
      </div>

      {/* HERO / CAROUSEL */}
      <section className="relative pt-2 md:pt-4">
        <Slider {...carouselSettings}>
          {carouselItems.map((item, i) => (
            <div
              key={i}
              className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[85vh]"
            >
              <img
                src={item.image}
                alt={`Slide ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
            </div>
          ))}
        </Slider>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center px-4 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">Welcome to EduAura</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
              <span className="text-gradient">Shape Your Future</span>
              <br />
              <span className="text-foreground">With Quality Education</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in delay-200">
              Discover world-class programs designed to prepare you for success in your chosen field.
            </p>
          </div>
        </div>

        {/* BUTTONS BELOW CAROUSEL */}
        <div className="relative z-10 mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row pb-12">
          <Button asChild size="lg" className="group bg-gradient-to-r from-primary to-secondary hover:shadow-glow-md transition-all duration-300 shimmer">
            <Link to="/admissions" className="flex items-center gap-2">
              Apply Now 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300">
            <Link to="/courses">Explore Courses</Link>
          </Button>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="relative group text-center p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE OUR COURSES - Marquee Animation */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 mb-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Explore Our</span>
              <span className="text-foreground"> Programs</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover world-class courses designed to shape your future career
            </p>
          </div>
        </div>
        <CourseMarquee />
      </section>

      {/* NOTICE BOARD */}
      <section className="relative py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gradient">
                Student Notice Board
              </h2>
            </div>
            <AutoScrollNoticeBoard />
          </div>

          {/* Quick Links Card */}
          <div className="gradient-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-3">
              {[
                { label: 'Admission Portal', path: '/admissions', icon: ClipboardList },
                { label: 'Course Catalog', path: '/courses', icon: BookOpen },
                { label: 'Faculty Directory', path: '/faculty', icon: Users },
              ].map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all duration-300 group"
                >
                  <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {link.label}
                  </span>
                  <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Why Choose</span>
              <span className="text-foreground"> EduAura?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience excellence in education with our comprehensive programs and world-class facilities.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Card
                key={i}
                className="card-hover group bg-card/50 border-border/50 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="p-6 text-center relative">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${f.gradient} p-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <f.icon className="h-full w-full text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {f.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Ready to Start</span>
            <span className="text-foreground"> Your Journey?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers through our programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow-lg shimmer">
              <Link to="/admissions" className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Apply Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/50 hover:bg-primary/10">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* EduBot AI Chatbot */}
      <EduBot />
    </div>
  );
};

export default Home;