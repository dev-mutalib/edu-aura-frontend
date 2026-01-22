import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import Faculty from './pages/Faculty';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/courses'
            element={<Courses />}
          />
          <Route
            path='/faculty'
            element={<Faculty />}
          />
          <Route
            path='/admissions'
            element={<Admissions />}
          />
          <Route
            path='/contact'
            element={<Contact />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
