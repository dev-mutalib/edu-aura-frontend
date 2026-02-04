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

  const legalLinks = [
    { path: '/degrees', label: 'Degree Programs' },
    { path: '/careers', label: 'Career Paths' },
    { path: '/jobs', label: 'Job Opportunities' },
  ];

  

  return (
    <footer className="relative bg-card border-t border-border/50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-secondary/5 rounded-full blur-3xl" />

      {/* Top */}
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-14">
        <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="animate-fade-in text-center sm:text-left">
            <div className="flex items-center gap-2 mb-3 sm:mb-4 justify-center sm:justify-start">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <h3 className="text-base sm:text-lg font-semibold text-gradient">
                Edu Aura Institute
              </h3>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Edu Aura Institute is committed to delivering quality education
              with modern infrastructure, expert faculty, and industry-oriented
              programs.
            </p>

            <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3 justify-center sm:justify-start">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="group relative rounded-full bg-muted/50 p-2 sm:p-2.5 transition-all duration-300 hover:bg-primary/20 hover:scale-110"
                >
                  <social.icon size={16} className="text-muted-foreground group-hover:text-primary transition-colors sm:w-[18px] sm:h-[18px]" />
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="animate-fade-in delay-100 text-center sm:text-left">
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
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

          {/* Programs & Legal */}
          <div className="animate-fade-in delay-200 text-center sm:text-left">
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-foreground">
              Resources
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              {legalLinks.map((link) => (
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

          {/* Contact */}
          <div className="animate-fade-in delay-300 text-center sm:text-left">
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-foreground">
              Contact Us
            </h3>

            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
              <li className="flex gap-2 sm:gap-3 items-start group justify-center sm:justify-start">
                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0 group-hover:animate-bounce-slow sm:w-[18px] sm:h-[18px]" />
                <span>Maharashtra, India</span>
              </li>
              <li className="flex gap-2 sm:gap-3 items-center group justify-center sm:justify-start">
                <Phone size={16} className="text-secondary flex-shrink-0 group-hover:animate-wiggle sm:w-[18px] sm:h-[18px]" />
                <a href="tel:+918830772432" className="hover:text-primary transition-colors">
                  +91 88307 72432
                </a>
              </li>
              <li className="flex gap-2 sm:gap-3 items-center group justify-center sm:justify-start">
                <Mail size={16} className="text-accent flex-shrink-0 group-hover:animate-bounce-slow sm:w-[18px] sm:h-[18px]" />
                <a href="mailto:principal@ssbesitm.org" className="hover:text-primary transition-colors break-all">
                  principal@ssbesitm.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative border-t border-border/50 py-3 sm:py-4 text-center text-xs sm:text-sm text-muted-foreground px-4">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        © {new Date().getFullYear()} Edu Aura Institute. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;