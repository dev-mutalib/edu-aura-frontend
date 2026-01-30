import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/courses', label: 'Courses' },
    { path: '/faculty', label: 'Faculty' },
    { path: '/library', label: 'Library' },
    { path: '/admissions', label: 'Admissions' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const programs = ['BCA', 'BBA', 'B.Com', 'MCA', 'MBA', 'Skill Development'];

  return (
    <footer className="relative bg-card border-t border-border/50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      {/* Top */}
      <div className="relative mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-gradient">
                Edu Aura Institute
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Edu Aura Institute is committed to delivering quality education
              with modern infrastructure, expert faculty, and industry-oriented
              programs.
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="group relative rounded-full bg-muted/50 p-2.5 transition-all duration-300 hover:bg-primary/20 hover:scale-110"
                >
                  <social.icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="animate-fade-in delay-100">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="animate-fade-in delay-200">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Our Programs
            </h3>
            <ul className="space-y-2 text-sm">
              {programs.map((program) => (
                <li key={program} className="text-muted-foreground">
                  {program}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-fade-in delay-300">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Contact Us
            </h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3 items-start group">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0 group-hover:animate-bounce-slow" />
                <span>Maharashtra, India</span>
              </li>
              <li className="flex gap-3 items-center group">
                <Phone size={18} className="text-secondary flex-shrink-0 group-hover:animate-wiggle" />
                <a href="tel:+918830772432" className="hover:text-primary transition-colors">
                  +91 88307 72432
                </a>
              </li>
              <li className="flex gap-3 items-center group">
                <Mail size={18} className="text-accent flex-shrink-0 group-hover:animate-bounce-slow" />
                <a href="mailto:principal@ssbesitm.org" className="hover:text-primary transition-colors">
                  principal@ssbesitm.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative border-t border-border/50 py-4 text-center text-sm text-muted-foreground">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        © {new Date().getFullYear()} Edu Aura Institute. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;