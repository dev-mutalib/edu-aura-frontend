import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Sparkles, 
  Home,
  BookOpen,
  GraduationCap,
  Briefcase,
  Search,
  Users,
  Library,
  ClipboardList,
  Phone,
  Image,
  Info
} from 'lucide-react';

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
    { path: '/', label: 'Home', icon: Home },
    { path: '/courses', label: 'Courses', icon: BookOpen },
    { path: '/degrees', label: 'Degrees', icon: GraduationCap },
    { path: '/careers', label: 'Careers', icon: Briefcase },
    { path: '/jobs', label: 'Jobs', icon: Search },
    { path: '/faculty', label: 'Faculty', icon: Users },
    { path: '/library', label: 'Library', icon: Library },
    { path: '/admissions', label: 'Admissions', icon: ClipboardList },
    { path: '/contact', label: 'Contact', icon: Phone },
    { path: '/gallery', label: 'Gallery', icon: Image },
    { path: '/about', label: 'About', icon: Info },
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

        {/* Right Side - AI Button + Hamburger */}
        <div className="flex items-center gap-3">
          {/* AI Button - Like Reference */}
          <button
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-xl border border-primary/40 hover:border-primary hover:shadow-glow-sm transition-all duration-300 group"
            onClick={() => {
              const event = new CustomEvent('openEduBot');
              window.dispatchEvent(event);
            }}
          >
            <Sparkles className="h-4 w-4 group-hover:animate-spin" />
            <span className="text-sm font-semibold hidden sm:inline">Try EduAura AI</span>
            <span className="text-sm font-semibold sm:hidden">AI</span>
            <Sparkles className="h-4 w-4 group-hover:animate-spin" />
          </button>

          {/* HAMBURGER MENU - Always visible */}
          <button
            className="relative p-2.5 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* NAVIGATION DRAWER - Side Panel */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-card/95 backdrop-blur-xl border-l border-border/50 shadow-2xl transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/30">
            <h2 className="text-lg font-bold text-primary">Navigation</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 px-4 py-3.5 text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-xl transition-all duration-200 group"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Apply Now Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/30 bg-card/80 backdrop-blur-sm">
            <Link
              to="/admissions"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 text-primary-foreground bg-gradient-to-r from-primary to-secondary rounded-xl hover:shadow-glow-md transition-all font-semibold"
            >
              <ClipboardList className="h-5 w-5" />
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
