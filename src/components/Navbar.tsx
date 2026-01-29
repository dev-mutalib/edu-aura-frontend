import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

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

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300 group-hover:left-0 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* CTA BUTTON */}
        <div className="hidden md:block">
          <Link
            to="/admissions"
            className="relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-primary-foreground bg-gradient-to-r from-primary to-secondary rounded-lg overflow-hidden transition-all duration-300 hover:shadow-glow-md hover:scale-105 shimmer"
          >
            <span className="relative z-10">Apply Now</span>
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden relative p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-xl transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col px-4 py-4">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="py-3 text-muted-foreground hover:text-primary transition-all duration-300 border-b border-border/30 last:border-none"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admissions"
            onClick={() => setIsOpen(false)}
            className="mt-4 text-center px-5 py-3 text-sm font-medium text-primary-foreground bg-gradient-to-r from-primary to-secondary rounded-lg"
          >
            Apply Now
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;