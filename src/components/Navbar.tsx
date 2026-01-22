import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='bg-white shadow sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <h1 className='text-xl font-bold text-blue-600'>EduAura</h1>

        <nav className='hidden md:flex gap-6'>
          <Link
            to='/'
            className='hover:text-blue-600'
          >
            Home
          </Link>
          <Link
            to='/courses'
            className='hover:text-blue-600'
          >
            Courses
          </Link>
          <Link
            to='/faculty'
            className='hover:text-blue-600'
          >
            Faculty
          </Link>
          <Link
            to='/admissions'
            className='hover:text-blue-600'
          >
            Admissions
          </Link>
          <Link
            to='/contact'
            className='hover:text-blue-600'
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
