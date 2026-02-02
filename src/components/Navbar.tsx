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
  Info,
  FileText,
  ScrollText,
  Shield,
  NotebookPen
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
    { path: '/notes-provider', label: 'Notes Provider', icon: NotebookPen },
    { path: '/careers', label: 'Careers', icon: Briefcase },
    { path: '/jobs', label: 'Jobs', icon: Search },
    { path: '/faculty', label: 'Faculty', icon: Users },
    { path: '/library', label: 'Library', icon: Library },
    { path: '/admissions', label: 'Admissions', icon: ClipboardList },
    { path: '/contact', label: 'Contact', icon: Phone },
    { path: '/gallery', label: 'Gallery', icon: Image },
    { path: '/about', label: 'About', icon: Info },
    { path: '/resume-builder', label: 'Resume Builder', icon: FileText },
    { path: '/terms', label: 'Terms & Conditions', icon: ScrollText },
    { path: '/privacy', label: 'Privacy Policy', icon: Shield },
  ];

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300 bg-[#0d1117] border-b border-slate-700/50"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* LOGO */}
        <Link to="/" className="group flex items-center gap-2">
          <div className="relative">
            <Sparkles className="h-6 w-6 text-primary animate-pulse-glow" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          </div>
          <h1 className="text-xl font-bold text-white">
            EduAura
          </h1>
        </Link>

        {/* Right Side - AI Button + Hamburger */}
        <div className="flex items-center gap-3">
          {/* AI Button - Like Reference */}
          <button
            className="flex items-center gap-2 px-3 py-2.5 md:px-4 bg-transparent text-primary rounded-xl border border-primary/60 hover:border-primary hover:shadow-glow-sm transition-all duration-300 group"
            onClick={() => {
              const event = new CustomEvent('openEduBot');
              window.dispatchEvent(event);
            }}
          >
            <Sparkles className="h-4 w-4 group-hover:animate-spin" />
            <span className="text-sm font-semibold hidden md:inline">Try EduAura AI</span>
            <Sparkles className="h-4 w-4 group-hover:animate-spin hidden md:block" />
          </button>

          {/* HAMBURGER MENU - Always visible */}
          <button
            className="relative p-2.5 text-white hover:text-primary transition-colors rounded-lg hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* NAVIGATION DRAWER - Side Panel */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-300 ${
          isOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-[#0d1117] border-l border-slate-700/50 shadow-2xl transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header with Close Button */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <h2 className="text-lg font-bold text-primary">Navigation</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-white hover:text-primary" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 px-4 py-3.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <link.icon className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Apply Now Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50 bg-[#0d1117]">
            <Link
              to="/admissions"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 text-white bg-gradient-to-r from-primary to-secondary rounded-xl hover:shadow-glow-md transition-all font-semibold"
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
