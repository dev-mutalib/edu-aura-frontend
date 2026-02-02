import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';

import Home from '../pages/Home';
import Courses from '../pages/Courses';
import CourseDetails from '../pages/CourseDetails';
import Admissions from '../pages/Admissions';
import Contact from '../pages/Contact';
import Faculty from '../pages/Faculty';
import About from '../pages/About';
import Gallery from '../pages/Gallery';
import Library from '../pages/Library';
import Careers from '../pages/Careers';
import CareerDetails from '../pages/CareerDetails';
import Degrees from '../pages/Degrees';
import DegreeDetails from '../pages/DegreeDetails';
import Jobs from '../pages/Jobs';
import TermsAndConditions from '../pages/TermsAndConditions';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import ResumeBuilder from '../pages/ResumeBuilder';
import Notes from '../pages/Notes';
import AdminNotes from '../pages/AdminNotes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout Wrapper */}
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/courses/:id' element={<CourseDetails />} />
        <Route path='/faculty' element={<Faculty />} />
        <Route path='/admissions' element={<Admissions />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/library' element={<Library />} />
        <Route path='/careers' element={<Careers />} />
        <Route path='/careers/:id' element={<CareerDetails />} />
        <Route path='/degrees' element={<Degrees />} />
        <Route path='/degrees/:id' element={<DegreeDetails />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/terms' element={<TermsAndConditions />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path='/resume-builder' element={<ResumeBuilder />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/admin/notes' element={<AdminNotes />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
