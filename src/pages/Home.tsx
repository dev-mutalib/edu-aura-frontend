import { Link } from 'react-router-dom';
import {
  ArrowRight, BookOpen, Users, Award, Target, Calendar, Bell, ClipboardList, Megaphone
} from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef } from 'react';

// Import images
import poster from '../Assets/images/poster.jpg';
import staf from '../Assets/images/staf.jpg';
import campus from '../Assets/images/yoga.jpg';

const Home = () => {
  const stats = [
    { number: '5000+', label: 'Students', icon: Users },
    { number: '200+', label: 'Faculty', icon: BookOpen },
    { number: '50+', label: 'Programs', icon: Target },
    { number: '98%', label: 'Success Rate', icon: Award },
  ];

  const features = [
    {
      title: 'Quality Education',
      description: 'World-class curriculum designed to prepare students for the future.',
      icon: BookOpen,
    },
    {
      title: 'Expert Faculty',
      description: 'Learn from industry experts and experienced academicians.',
      icon: Users,
    },
    {
      title: 'Modern Facilities',
      description: 'State-of-the-art labs, libraries, and campus infrastructure.',
      icon: Target,
    },
    {
      title: 'Career Support',
      description: 'Comprehensive placement assistance and career guidance.',
      icon: Award,
    },
  ];

  const carouselItems = [
    { 
      image: poster 
    },
    { 
      title: 'International Yoga Bay', 
      image: staf 
    },
    { 
      title: 'Explore Campus', 
      image: campus 
    }
  ];

  // Notice Board Data for different programs
  const notices = [
    {
      id: 1,
      title: 'BCA Mid-Term Exams Schedule',
      date: 'May 25, 2025',
      category: 'Examination',
      program: 'BCA',
      icon: ClipboardList,
    },
    {
      id: 2,
      title: 'BBA Industry Visit to Tech Park',
      date: 'June 5, 2025',
      category: 'Event',
      program: 'BBA',
      icon: Calendar,
    },
    {
      id: 3,
      title: 'MCA Project Submission Deadline',
      date: 'June 15, 2025',
      category: 'Academic',
      program: 'MCA',
      icon: Bell,
    },
    {
      id: 4,
      title: 'B.Sc Lab Fee Payment Notice',
      date: 'May 30, 2025',
      category: 'Fee',
      program: 'B.Sc',
      icon: Megaphone,
    },
    {
      id: 5,
      title: 'BCA Internship Opportunities',
      date: 'June 1, 2025',
      category: 'Career',
      program: 'BCA',
      icon: Award,
    },
    {
      id: 6,
      title: 'BBA Guest Lecture on Digital Marketing',
      date: 'June 8, 2025',
      category: 'Workshop',
      program: 'BBA',
      icon: BookOpen,
    },
    {
      id: 7,
      title: 'MCA Seminar on AI Technologies',
      date: 'June 12, 2025',
      category: 'Event',
      program: 'MCA',
      icon: Calendar,
    },
    {
      id: 8,
      title: 'B.Sc Research Paper Submission',
      date: 'June 20, 2025',
      category: 'Academic',
      program: 'B.Sc',
      icon: ClipboardList,
    },
  ];

  // Auto-scrolling notice board implementation
  const AutoScrollNoticeBoard = () => {
    const containerRef = useRef(null);
    const scrollSpeed = 50; // Pixels per second (faster scrolling)
    
    useEffect(() => {
      let scrollInterval;
      let scrollPosition = 0;
      let isHovered = false;
      
      const startScrolling = () => {
        scrollInterval = setInterval(() => {
          if (!isHovered && containerRef.current) {
            const container = containerRef.current;
            const contentHeight = container.scrollHeight;
            const visibleHeight = container.clientHeight;
            
            // Reset to top when reaching bottom
            if (scrollPosition >= contentHeight - visibleHeight) {
              scrollPosition = 0;
              container.scrollTop = 0;
            } else {
              scrollPosition += 1; // Faster scroll increment
              container.scrollTop = scrollPosition;
            }
          }
        }, 50); // Faster update interval
      };
      
      startScrolling();
      
      // Pause on hover
      const handleMouseEnter = () => {
        isHovered = true;
      };
      
      const handleMouseLeave = () => {
        isHovered = false;
      };
      
      containerRef.current?.addEventListener('mouseenter', handleMouseEnter);
      containerRef.current?.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        clearInterval(scrollInterval);
        containerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, []);

    // Program colors
    const programColors = {
      'BCA': 'bg-blue-100 text-blue-800',
      'BBA': 'bg-green-100 text-green-800',
      'MCA': 'bg-purple-100 text-purple-800',
      'B.Sc': 'bg-amber-100 text-amber-800'
    };

    return (
      <div 
        ref={containerRef} 
        className="h-96 overflow-hidden rounded-lg border border-gray-200 shadow-inner bg-white"
      >
        <div className="divide-y divide-gray-100">
          {notices.map((notice) => (
            <div key={notice.id} className="p-5 hover:bg-blue-50 transition-colors duration-200">
              <div className="flex items-start">
                <div className="mr-4 mt-1 text-blue-600">
                  <notice.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-gray-900">{notice.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${programColors[notice.program]}`}>
                      {notice.program}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{notice.category}</span>
                    <span>{notice.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Faster carousel settings
  const carouselSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500, // Faster transition
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500, // Faster rotation
    pauseOnHover: false,
    fade: true,
    cssEase: 'linear'
  };

  return (
    <div className="min-h-screen relative">
      {/* Floating Contact Icons */}
      <div className="fixed top-[40%] right-3 z-50 flex flex-col gap-3">
        <a href="https://wa.me/918830772432" target="_blank" rel="noopener noreferrer"
           className="rounded-full p-2 bg-white shadow-md hover:scale-110 transition-transform"
           style={{ boxShadow: '0 0 10px rgba(37, 211, 102, 0.4)' }}>
          <img src="https://img.icons8.com/color/36/whatsapp--v1.png" alt="WhatsApp" className="w-9 h-9"/>
        </a>
        <a href="mailto:principal@ssbesitm.org"
           className="rounded-full p-2 bg-white shadow-md hover:scale-110 transition-transform"
           style={{ boxShadow: '0 0 10px rgba(234, 67, 53, 0.4)' }}>
          <img src="https://img.icons8.com/color/36/gmail-new.png" alt="Gmail" className="w-9 h-9"/>
        </a>
        <a href="tel:+918830772432"
           className="rounded-full p-2 bg-white shadow-md hover:scale-110 transition-transform"
           style={{ boxShadow: '0 0 10px rgba(0, 132, 255, 0.4)' }}>
          <img src="https://img.icons8.com/color/36/phone.png" alt="Phone" className="w-9 h-9"/>
        </a>
      </div>

      {/* Carousel Hero - Below Navigation Bar */}
      <section className="relative mt-16"> {/* Added mt-16 for navigation bar space */}
        <Slider {...carouselSettings}>
          {carouselItems.map((item, idx) => (
            <div key={idx} className="relative h-[50vh] md:h-screen flex items-center justify-center">
              {/* Background image */}
              <img 
                src={item.image} 
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Semi-transparent overlay */}
              <div className="absolute inset-0 bg-black/30"></div>
              
              {/* Content - Centered */}
              <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center animate-fade-in">
                  {item.title}
                </h1>
              </div>
              
              {/* Buttons at bottom with new colors - Medium size */}
              <div className="absolute bottom-8 md:bottom-20 left-0 right-0 z-10">
                <div className="flex flex-col sm:flex-row gap-3 justify-center animate-slide-in-right">
                  {/* Apply Now Button - Medium size */}
                  <Button asChild 
                          className="py-3 px-6 text-base bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg">
                    <Link to="/admissions">
                      Apply Now <ArrowRight className="ml-2 h-4 w-4 inline" />
                    </Link>
                  </Button>
                  
                  {/* Explore Courses Button - Medium size */}
                  <Button asChild variant="outline"
                          className="py-3 px-6 text-base bg-gradient-to-r from-teal-400 to-teal-500 text-white border-0 hover:from-teal-500 hover:to-teal-600 shadow-lg">
                    <Link to="/courses">Explore Courses</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-4"/>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* New Notice Board Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center bg-blue-100 text-blue-800 px-6 py-2 rounded-full mb-4">
              <Bell className="h-5 w-5 mr-2" />
              <span className="font-medium">Latest Announcements</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Student Notice Board</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Important updates for BCA, BBA, MCA, and B.Sc students
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl p-6 flex items-center justify-between">
                <div className="flex items-center">
                  <Megaphone className="h-8 w-8 text-white mr-4" />
                  <h3 className="text-2xl font-bold text-white">Program Notices</h3>
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm text-white">
                  Auto-scrolling
                </div>
              </div>
              <AutoScrollNoticeBoard />
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-blue-600 text-white py-4 px-6">
                  <h3 className="text-xl font-bold flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Key Dates
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center border-b pb-3">
                      <span className="font-medium">Admission Deadline</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">June 30, 2025</span>
                    </li>
                    <li className="flex justify-between items-center border-b pb-3">
                      <span className="font-medium">Semester Start</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">July 15, 2025</span>
                    </li>
                    <li className="flex justify-between items-center border-b pb-3">
                      <span className="font-medium">Mid-Term Exams</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Sep 10-20, 2025</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Final Exams</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Dec 1-15, 2025</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive education that combines academic excellence with practical skills to prepare you for success.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
          {features.map((feature, index) => (
            <Card key={index} className="card-hover animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <CardContent className="p-6 text-center">
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4"/>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our community of learners and take the first step towards your bright future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600 shadow-lg">
              <Link to="/admissions">Apply for Admission</Link>
            </Button>
            <Button asChild size="lg" variant="outline"
                    className="border-white text-white hover:bg-white/20 hover:text-white">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;