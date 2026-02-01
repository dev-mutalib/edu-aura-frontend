import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import EduBot from './EduBot';
import AdmissionModal from './AdmissionModal';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <EduBot />
      <AdmissionModal />
    </>
  );
};

export default Layout;
