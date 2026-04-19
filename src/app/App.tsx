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
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    const opened = sessionStorage.getItem('invitation_opened');
    if (opened) {
      setIsOpen(true);
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsMusicPlaying(true);
    sessionStorage.setItem('invitation_opened', 'true');
    window.scrollTo(0, 0);
  };

  if (!isOpen) {
    return <Cover onOpen={handleOpenInvitation} />;
  }

  return (
    <Layout isMusicPlaying={isMusicPlaying} setIsMusicPlaying={setIsMusicPlaying}>
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
