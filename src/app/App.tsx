import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Event from './pages/Event';
import Location from './pages/Location';
import RSVP from './pages/RSVP';
import Messages from './pages/Messages';
import Cover from './pages/Cover';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if invitation was already opened in this session
    const opened = sessionStorage.getItem('invitation_opened');
    if (opened) {
      setIsOpen(true);
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    sessionStorage.setItem('invitation_opened', 'true');
    // Scroll to top when opened
    window.scrollTo(0, 0);
  };

  return (
    <>
      {!isOpen && <Cover onOpen={handleOpenInvitation} />}
      
      <div className={!isOpen ? 'hidden h-screen overflow-hidden' : ''}>
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
      </div>
    </>
  );
}
