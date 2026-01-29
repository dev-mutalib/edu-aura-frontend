import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* LOGO */}
        <h1 className="text-xl font-bold text-primary">
          <Link to="/">EduAura</Link>
        </h1>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-6 md:flex">
          {['/', '/courses', '/faculty', '/library', '/admissions', '/contact', '/gallery', '/about'].map(
            (path, i) => (
              <Link
                key={path}
                to={path}
                className="hover:text-primary transition-colors"
              >
                {['Home', 'Courses', 'Faculty', 'Library', 'Admissions', 'Contact', 'Gallery', 'About'][i]}
              </Link>
            )
          )}
        </nav>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden border-t bg-background shadow">
          <nav className="flex flex-col px-4 py-4">
            {['/', '/courses', '/faculty', '/library', '/admissions', '/contact', '/gallery', '/about'].map(
              (path, i) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className="py-3 hover:text-primary transition-colors"
                >
                  {['Home', 'Courses', 'Faculty', 'Library', 'Admissions', 'Contact', 'Gallery', 'About'][i]}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
