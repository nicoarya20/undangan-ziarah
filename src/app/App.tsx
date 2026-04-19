import Layout from './components/Layout';
import Home from './pages/Home';
import Event from './pages/Event';
import Location from './pages/Location';
import RSVP from './pages/RSVP';
import Messages from './pages/Messages';

export default function App() {
  return (
    <Layout>
      <div id="home">
        <Home />
      </div>
      <div id="event">
        <Event />
      </div>
      <div id="location">
        <Location />
      </div>
      <div id="rsvp">
        <RSVP />
      </div>
      <div id="messages">
        <Messages />
      </div>
    </Layout>
  );
}
