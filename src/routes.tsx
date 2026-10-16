import { Routes, Route } from 'react-router-dom';
import App from './App';
import PitchPage from './pages/PitchPage';
import SportsIndexPage from './pages/SportsIndexPage';
import SportPage from './pages/SportPage';
import SportZonePage from './pages/SportZonePage';
import EventsPage from './pages/EventsPage';
import EventPage from './pages/EventPage';
import OrganiserPage from './pages/OrganiserPage';
import NotFoundPage from './pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pitch" element={<PitchPage />} />
      <Route path="/sports" element={<SportsIndexPage />} />
      <Route path="/sport/:sport" element={<SportPage />} />
      <Route path="/sport/:sport/:zone" element={<SportZonePage />} />
      <Route path="/evenements" element={<EventsPage />} />
      <Route path="/evenements/:slug" element={<EventPage />} />
      <Route path="/organiser" element={<OrganiserPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
