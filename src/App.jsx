// App.jsx
import {BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import UniversalLayout from './components/UniversalLayout';
import HomePage from './pages/HomePage';
import HaditsPage from './pages/HaditsPage';
import HaditsByPerawiPage from './pages/HaditsByPerawiPage';
import DoaPage from './pages/DoaPage';
import NotFound from './pages/NotFound';
import ComingSoon from './pages/ComingSoon';
import ScheduleSholat from './pages/ScheduleSholat';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UniversalLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/sholat" element={<ScheduleSholat />} />
          <Route path="/hadits" element={<HaditsPage />} />
          <Route path="/hadits/:slug" element={<HaditsByPerawiPage />} />
          <Route path="/doa" element={<DoaPage />} />

          {/* catch */}
          <Route path='*' element={<NotFound/>} />
          <Route path="/comingsoon" element={<ComingSoon />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
