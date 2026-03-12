import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DonatePage from './pages/DonatePage';
import ConfirmPage from './pages/ConfirmPage';
import AboutPage from './pages/AboutPage';
import LocationsPage from './pages/LocationsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/confirm" element={<ConfirmPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/locations" element={<LocationsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
