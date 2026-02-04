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
  Megaphone,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef, useState, useCallback } from 'react';
import EduBot from '@/components/EduBot';
import CourseMarquee from '@/components/CourseMarquee';
import AdmissionModal from '@/components/AdmissionModal';

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

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayDuration = 5000;

  // Auto-play carousel
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
      setTimeout(() => setIsTransitioning(false), 800);
    }, autoPlayDuration);
  }, [carouselItems.length]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [startAutoPlay]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    startAutoPlay();
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    startAutoPlay();
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    startAutoPlay();
    setTimeout(() => setIsTransitioning(false), 800);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

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

  /* ---------- ANIMATED NOTICE BOARD ---------- */

  const AnimatedNoticeBoard: React.FC = () => {
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
      }, 60);

      return () => window.clearInterval(interval);
    }, []);

    return (
      <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-md border-b border-border/30 p-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 sm:p-2 rounded-lg bg-primary/20 animate-pulse">
              <Megaphone className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-foreground">Latest Updates</span>
            <div className="ml-auto flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              <span className="w-2 h-2 bg-green-500 rounded-full absolute" />
              <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">Live</span>
            </div>
          </div>
        </div>

        {/* Scrolling Content */}
        <div ref={ref} className="h-[calc(100%-44px)] sm:h-[calc(100%-52px)] overflow-hidden">
          {[...notices, ...notices].map((n, idx) => (
            <div 
              key={`${n.id}-${idx}`} 
              className="border-b border-border/20 p-3 sm:p-4 last:border-none group hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 cursor-pointer"
            >
              <div className="flex gap-2 sm:gap-3 items-start">
                <div className="relative flex-shrink-0">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all group-hover:scale-110 group-hover:rotate-3 duration-300">
                    <n.icon className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-accent rounded-full animate-ping opacity-75" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-foreground group-hover:text-gradient transition-all truncate">
                    {n.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {n.program}
                    </span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground">
                      {n.date}
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />
      </div>
    );
  };

  return (
    <div className="relative overflow-x-hidden">
      {/* Admission Modal Popup */}
      <AdmissionModal />
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-secondary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 right-1/3 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-accent/5 rounded-full blur-3xl animate-float" />
      </div>

      {/* RIGHT FLOATING CONTACT ICONS */}
      <div className="fixed top-[35%] right-2 sm:right-3 z-50 flex flex-col gap-2 sm:gap-3">
        <a
          href="https://wa.me/918830772432"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-full bg-card/80 backdrop-blur-sm p-1.5 sm:p-2.5 shadow-lg border border-border/50 transition-all duration-300 hover:scale-110 hover:shadow-glow-md"
        >
          <img
            src="https://img.icons8.com/color/36/whatsapp--v1.png"
            alt="WhatsApp"
            className="h-6 w-6 sm:h-8 sm:w-8 group-hover:animate-bounce-slow"
          />
        </a>

        <a
          href="mailto:principal@ssbesitm.org"
          className="group rounded-full bg-card/80 backdrop-blur-sm p-1.5 sm:p-2.5 shadow-lg border border-border/50 transition-all duration-300 hover:scale-110 hover:shadow-glow-md"
        >
          <img
            src="https://img.icons8.com/color/36/gmail-new.png"
            alt="Gmail"
            className="h-6 w-6 sm:h-8 sm:w-8 group-hover:animate-bounce-slow"
          />
        </a>

        <a
          href="tel:+918830772432"
          className="group rounded-full bg-card/80 backdrop-blur-sm p-1.5 sm:p-2.5 shadow-lg border border-border/50 transition-all duration-300 hover:scale-110 hover:shadow-glow-md"
        >
          <img
            src="https://img.icons8.com/color/36/phone.png"
            alt="Phone"
            className="h-6 w-6 sm:h-8 sm:w-8 group-hover:animate-wiggle"
          />
        </a>
      </div>

      {/* HERO / CAROUSEL - Clean Professional Design */}
      <section className="relative">
        {/* Modern Carousel Container */}
        <div 
          className="relative w-full h-[50vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Carousel Images */}
          {carouselItems.map((item, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                currentSlide === i 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
            >
              {/* Image with Zoom Animation */}
              <div 
                className={`absolute inset-0 transition-transform duration-[6000ms] ease-out ${
                  currentSlide === i ? 'scale-110' : 'scale-100'
                }`}
              >
                <img
                  src={item.image}
                  alt={`Campus view ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
              
              {/* Subtle Gradient Overlay - No Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          ))}
          
          {/* Navigation Arrows - Always Visible on Mobile */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 md:p-4 rounded-full bg-background/70 backdrop-blur-md border border-border/50 shadow-xl transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 md:p-4 rounded-full bg-background/70 backdrop-blur-md border border-border/50 shadow-xl transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>
          
          {/* Bottom Navigation Dots */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-full bg-background/70 backdrop-blur-md border border-border/30">
            {carouselItems.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`relative transition-all duration-500 rounded-full ${
                  currentSlide === i 
                    ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-gradient-to-r from-primary to-secondary' 
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          
          {/* Slide Counter - Mobile Friendly */}
          <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-background/70 backdrop-blur-md border border-border/30 text-sm font-medium">
            <span className="text-primary">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="text-muted-foreground mx-1">/</span>
            <span className="text-muted-foreground">{String(carouselItems.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Hero Content Below Carousel */}
        <div className="relative z-10 py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background/95 to-background">
          <div className="mx-auto max-w-5xl px-4 text-center">
            {/* Welcome Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/30 mb-4 sm:mb-6 animate-fade-in hover:scale-105 transition-transform cursor-default">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary animate-pulse" />
              <span className="text-xs sm:text-sm text-primary font-medium">Welcome to EduAura</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in">
              <span className="text-gradient bg-clip-text">Shape Your Future</span>
              <br />
              <span className="text-foreground">With Quality Education</span>
            </h1>
            
            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 animate-fade-in leading-relaxed px-2">
              Discover world-class programs designed to prepare you for success in your chosen field. 
              Join thousands of students building their dreams.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in px-4">
              <Button asChild size="lg" className="w-full sm:w-auto group bg-gradient-to-r from-primary to-secondary hover:shadow-glow-md transition-all duration-300 shimmer px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg">
                <Link to="/admissions" className="flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                  Apply Now 
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg group">
                <Link to="/courses" className="flex items-center justify-center gap-2">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
                  Explore Courses
                </Link>
              </Button>
            </div>
            
            {/* Scroll Indicator */}
            <div className="mt-8 sm:mt-12 animate-bounce hidden md:block">
              <div className="w-5 sm:w-6 h-8 sm:h-10 rounded-full border-2 border-muted-foreground/30 mx-auto flex items-start justify-center pt-2">
                <div className="w-1 sm:w-1.5 h-2 sm:h-3 bg-primary rounded-full animate-pulse" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Scroll to explore</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative py-10 sm:py-14 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-3 sm:px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="relative group text-center p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <stat.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILD YOUR TECH CAREER - Marquee Animation */}
      <section className="relative py-8 sm:py-12 md:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 mb-6 sm:mb-8 md:mb-10">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              <span className="text-gradient">Build Your Dream</span>
              <span className="text-foreground"> Tech Career</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
              Click any role to explore career paths, required skills & growth opportunities in the tech industry
            </p>
          </div>
        </div>
        <CourseMarquee />
      </section>

      {/* NOTICE BOARD */}
      <section className="relative py-8 sm:py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient">
              Student Notice Board
            </h2>
          </div>
          <AnimatedNoticeBoard />
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-10 sm:py-14 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              <span className="text-gradient">Why Choose</span>
              <span className="text-foreground"> EduAura?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-2">
              Experience excellence in education with our comprehensive programs and world-class facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {features.map((f, i) => (
              <Card
                key={i}
                className="card-hover group bg-card/50 border-border/50 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="p-4 sm:p-5 md:p-6 text-center relative">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto mb-3 sm:mb-4 rounded-lg sm:rounded-xl bg-gradient-to-br ${f.gradient} p-2 sm:p-2.5 md:p-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <f.icon className="h-full w-full text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1.5 sm:mb-2 text-sm sm:text-base">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {f.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-gradient">Ready to Start</span>
            <span className="text-foreground"> Your Journey?</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Join thousands of students who have transformed their careers through our programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:shadow-glow-lg shimmer">
              <Link to="/admissions" className="flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                Apply Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-primary/50 hover:bg-primary/10">
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
