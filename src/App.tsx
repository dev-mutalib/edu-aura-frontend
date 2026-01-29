import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import Faculty from './pages/Faculty';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Library from './pages/Library';



const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/faculty' element={<Faculty />} />
          <Route path='/admissions' element={<Admissions />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/library' element={<Library />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
