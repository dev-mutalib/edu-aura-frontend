import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Bot } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/degrees', label: 'Degrees' },
    { path: '/careers', label: 'Careers' },
    { path: '/jobs', label: 'Jobs' },
    { path: '/faculty', label: 'Faculty' },
    { path: '/library', label: 'Library' },
    { path: '/admissions', label: 'Admissions' },
    { path: '/contact', label: 'Contact' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-lg shadow-lg shadow-primary/5 border-b border-border/50'
          : 'bg-background/50 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* LOGO */}
        <Link to="/" className="group flex items-center gap-2">
          <div className="relative">
            <Sparkles className="h-6 w-6 text-primary animate-pulse-glow" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          </div>
          <h1 className="text-xl font-bold text-gradient">
            EduAura
          </h1>
        </Link>

        {/* AI Button - Always visible */}
        <div className="hidden md:flex items-center gap-4">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary rounded-full border border-primary/30 hover:shadow-glow-sm transition-all"
            onClick={() => {
              const event = new CustomEvent('openEduBot');
              window.dispatchEvent(event);
            }}
          >
            <Bot className="h-4 w-4" />
            <span className="text-sm font-medium">AI Assistant</span>
          </button>
        </div>

        {/* HAMBURGER MENU - Always visible */}
        <button
          className="relative p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU - Full screen overlay */}
      <div
        className={`fixed inset-0 top-[72px] bg-background/95 backdrop-blur-lg z-40 transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full px-4 py-8 -mt-20">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center py-4 text-lg font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            to="/admissions"
            onClick={() => setIsOpen(false)}
            className="mt-8 px-8 py-4 text-lg font-medium text-primary-foreground bg-gradient-to-r from-primary to-secondary rounded-xl hover:shadow-glow-md transition-all"
          >
            Apply Now
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
