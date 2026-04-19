import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Event from './pages/Event';
import Location from './pages/Location';
import RSVP from './pages/RSVP';
import Messages from './pages/Messages';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="/location" element={<Location />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/messages" element={<Messages />} />
        </Route>
      </Routes>
    </Router>
  );
}
