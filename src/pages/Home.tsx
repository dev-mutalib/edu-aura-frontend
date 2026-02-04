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
  Play,
  Pause,
} from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';
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
  title: string;
  subtitle: string;
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
    { image: itm1, title: 'World-Class Campus', subtitle: 'State-of-the-art facilities for modern learning' },
    { image: itm2, title: 'Expert Faculty', subtitle: 'Learn from industry professionals' },
    { image: itm3, title: 'Innovation Hub', subtitle: 'Where ideas become reality' },
    { image: itm4, title: 'Student Life', subtitle: 'Vibrant campus culture and activities' },
    { image: itm5, title: 'Tech Labs', subtitle: 'Hands-on experience with latest technology' },
    { image: itm6, title: 'Library Resources', subtitle: 'Extensive digital and physical collections' },
    { image: itm7, title: 'Sports & Recreation', subtitle: 'Holistic development for students' },
  ];

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const sliderRef = useRef<Slider | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const autoPlayDuration = 5000;

  // Auto-play progress bar
  useEffect(() => {
    if (isAutoPlaying) {
      setProgress(0);
      const startTime = Date.now();
      progressInterval.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / autoPlayDuration) * 100, 100);
        setProgress(newProgress);
        if (newProgress >= 100) {
          setProgress(0);
        }
      }, 50);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isAutoPlaying, currentSlide]);

  const goToSlide = (index: number) => {
    sliderRef.current?.slickGoTo(index);
  };

  const nextSlide = () => {
    sliderRef.current?.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current?.slickPrev();
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    if (sliderRef.current) {
      if (isAutoPlaying) {
        sliderRef.current.slickPause();
      } else {
        sliderRef.current.slickPlay();
      }
    }
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
      <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-md border-b border-border/30 p-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/20 animate-pulse">
              <Megaphone className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">Latest Updates</span>
            <div className="ml-auto flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              <span className="w-2 h-2 bg-green-500 rounded-full absolute" />
              <span className="text-xs text-muted-foreground ml-2">Live</span>
            </div>
          </div>
        </div>

        {/* Scrolling Content */}
        <div ref={ref} className="h-[calc(100%-52px)] overflow-hidden">
          {[...notices, ...notices].map((n, idx) => (
            <div 
              key={`${n.id}-${idx}`} 
              className="border-b border-border/20 p-4 last:border-none group hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 cursor-pointer"
            >
              <div className="flex gap-3 items-start">
                <div className="relative">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all group-hover:scale-110 group-hover:rotate-3 duration-300">
                    <n.icon className="text-primary h-5 w-5" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping opacity-75" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-semibold text-foreground group-hover:text-gradient transition-all">
                    {n.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {n.program}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {n.date}
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />
      </div>
    );
  };

  /* ---------- CAROUSEL SETTINGS ---------- */

  const carouselSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: isAutoPlaying,
    autoplaySpeed: autoPlayDuration,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    fade: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    beforeChange: (_: number, next: number) => {
      setCurrentSlide(next);
      setProgress(0);
    },
  };

  return (
    <div className="relative overflow-x-hidden">
      {/* Admission Modal Popup */}
      <AdmissionModal />
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
        {/* Interactive Carousel */}
        <div className="relative group">
          {/* Decorative Corner Elements */}
          <div className="absolute top-4 left-4 z-30 hidden md:block">
            <div className="w-20 h-20 border-l-4 border-t-4 border-primary/60 rounded-tl-3xl" />
          </div>
          <div className="absolute top-4 right-4 z-30 hidden md:block">
            <div className="w-20 h-20 border-r-4 border-t-4 border-secondary/60 rounded-tr-3xl" />
          </div>
          <div className="absolute bottom-28 left-4 z-30 hidden md:block">
            <div className="w-20 h-20 border-l-4 border-b-4 border-accent/60 rounded-bl-3xl" />
          </div>
          <div className="absolute bottom-28 right-4 z-30 hidden md:block">
            <div className="w-20 h-20 border-r-4 border-b-4 border-primary/60 rounded-br-3xl" />
          </div>
          
          {/* Main Slider */}
          <Slider ref={sliderRef} {...carouselSettings}>
            {carouselItems.map((item, i) => (
              <div
                key={i}
                className="relative h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] overflow-hidden"
              >
                {/* Ken Burns Effect Image */}
                <div 
                  className={`absolute inset-0 transition-transform duration-[8000ms] ease-out ${
                    currentSlide === i ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                {/* Multiple Gradient Overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-transparent opacity-50" />
                
                {/* Animated Particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float opacity-60" />
                  <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary rounded-full animate-float-slow opacity-40" style={{ animationDelay: '1s' }} />
                  <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-accent rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
                </div>
                
                {/* Slide Content with Enhanced Animation */}
                <div className="absolute bottom-20 left-6 sm:left-12 md:left-20 z-10 max-w-lg">
                  <div 
                    className={`transform transition-all duration-700 ${
                      currentSlide === i 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-10 opacity-0'
                    }`}
                  >
                    {/* Slide Number Badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full shadow-glow-sm">
                        <Sparkles className="h-4 w-4" />
                        {String(i + 1).padStart(2, '0')} / {String(carouselItems.length).padStart(2, '0')}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent max-w-[100px]" />
                    </div>
                    
                    {/* Title with Text Shadow */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 drop-shadow-lg">
                      <span className="text-gradient">{item.title}</span>
                    </h2>
                    
                    {/* Subtitle with Glass Effect */}
                    <div className="inline-block px-4 py-2 bg-card/30 backdrop-blur-md rounded-xl border border-border/30">
                      <p className="text-sm sm:text-base md:text-lg text-foreground/90">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Right Side Quick Info (Desktop) */}
                <div 
                  className={`absolute bottom-24 right-8 z-10 hidden lg:block transform transition-all duration-700 delay-200 ${
                    currentSlide === i 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-10 opacity-0'
                  }`}
                >
                  <div className="flex items-center gap-4 px-6 py-4 bg-card/40 backdrop-blur-xl rounded-2xl border border-border/30 shadow-2xl">
                    <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Ranked</p>
                      <p className="text-lg font-bold text-foreground">#1 in Excellence</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          
          {/* Navigation Arrows - Enhanced */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-2xl bg-card/80 backdrop-blur-md border border-border/50 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-glow-lg hover:border-primary"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-2xl bg-card/80 backdrop-blur-md border border-border/50 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-glow-lg hover:border-primary"
            aria-label="Next slide"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
          
          {/* Bottom Controls Bar - Enhanced */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            {/* Multi-color Progress Bar */}
            <div className="h-1.5 bg-muted/20 backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-100 ease-linear shadow-glow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Controls Container */}
            <div className="bg-gradient-to-t from-background via-background/95 to-background/80 backdrop-blur-md px-4 sm:px-8 py-5">
              <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Play/Pause Button - Enhanced */}
                <button
                  onClick={toggleAutoPlay}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-glow-sm transition-all hover:scale-105 group/play"
                >
                  <div className={`p-2 rounded-xl ${isAutoPlaying ? 'bg-primary/20' : 'bg-muted'} transition-colors`}>
                    {isAutoPlaying ? (
                      <Pause className="h-4 w-4 text-primary" />
                    ) : (
                      <Play className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="text-left hidden sm:block">
                    <span className="text-sm font-semibold text-foreground">{isAutoPlaying ? 'Pause' : 'Play'}</span>
                    <p className="text-xs text-muted-foreground">Auto-slide</p>
                  </div>
                </button>
                
                {/* Enhanced Dot Indicators */}
                <div className="flex items-center gap-3">
                  {carouselItems.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      className={`relative overflow-hidden rounded-full transition-all duration-500 group/dot ${
                        currentSlide === i 
                          ? 'w-12 h-4 bg-gradient-to-r from-primary to-secondary shadow-glow-sm' 
                          : 'w-4 h-4 bg-muted-foreground/20 hover:bg-muted-foreground/40 hover:scale-125'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    >
                      {currentSlide === i && (
                        <>
                          <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-shift bg-[length:200%_200%]" />
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          </span>
                        </>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Enhanced Slide Counter */}
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border/50">
                    <span className="text-xs text-muted-foreground">Slide</span>
                    <span className="text-2xl font-bold text-gradient">
                      {String(currentSlide + 1).padStart(2, '0')}
                    </span>
                    <span className="text-muted-foreground/50">/</span>
                    <span className="text-lg text-muted-foreground">
                      {String(carouselItems.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Thumbnail Preview (shows on hover) */}
          <div className="absolute bottom-28 right-4 z-20 hidden lg:flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            {carouselItems.map((item, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-110 shadow-lg ${
                  currentSlide === i 
                    ? 'border-primary shadow-glow-md ring-2 ring-primary/30' 
                    : 'border-border/30 opacity-70 hover:opacity-100 hover:border-primary/50'
                }`}
              >
                <img
                  src={item.image}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                {currentSlide === i && (
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                )}
                <div className="absolute bottom-1 left-1 text-[10px] font-bold text-white bg-background/50 px-1.5 py-0.5 rounded">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Hero Content Below Carousel */}
        <div className="relative z-10 py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background/95 to-background">
          <div className="mx-auto max-w-5xl px-4 text-center">
            {/* Welcome Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 animate-fade-in hover:scale-105 transition-transform cursor-default">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">Welcome to EduAura</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              <span className="text-gradient bg-clip-text">Shape Your Future</span>
              <br />
              <span className="text-foreground">With Quality Education</span>
            </h1>
            
            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in leading-relaxed">
              Discover world-class programs designed to prepare you for success in your chosen field. 
              Join thousands of students building their dreams.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
              <Button asChild size="lg" className="group bg-gradient-to-r from-primary to-secondary hover:shadow-glow-md transition-all duration-300 shimmer px-8 py-6 text-lg">
                <Link to="/admissions" className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Apply Now 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300 px-8 py-6 text-lg group">
                <Link to="/courses" className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Explore Courses
                </Link>
              </Button>
            </div>
            
            {/* Scroll Indicator */}
            <div className="mt-12 animate-bounce hidden md:block">
              <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 mx-auto flex items-start justify-center pt-2">
                <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Scroll to explore</p>
            </div>
          </div>
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

      {/* BUILD YOUR TECH CAREER - Marquee Animation */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 mb-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Build Your Dream</span>
              <span className="text-foreground"> Tech Career</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Click any role to explore career paths, required skills & growth opportunities in the tech industry
            </p>
          </div>
        </div>
        <CourseMarquee />
      </section>

      {/* NOTICE BOARD */}
      <section className="relative py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gradient">
              Student Notice Board
            </h2>
          </div>
          <AnimatedNoticeBoard />
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