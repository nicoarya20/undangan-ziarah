import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Event from './pages/Event';
import Location from './pages/Location';
import RSVP from './pages/RSVP';
import Messages from './pages/Messages';
import Cover from './pages/Cover';

export interface InvitationData {
  id: string;
  title: string;
  deceased: string;
  eventDate: string;
  locationName: string;
  locationAddress: string;
  googleMapsUrl: string;
  organizer: string;
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [invitationData, setInvitationData] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState(true);

  const invitationId = "default-invitation-id";

  useEffect(() => {
    // Fetch invitation data
    fetch(`http://localhost:3001/invitation?id=${invitationId}`)
      .then(res => res.json())
      .then(data => {
        setInvitationData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch invitation:", err);
        setLoading(false);
      });

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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-red-900 text-yellow-400">Loading...</div>;
  }

  if (!invitationData) {
    return <div className="min-h-screen flex items-center justify-center bg-red-900 text-yellow-400">Invitation not found.</div>;
  }

  return (
    <>
      {!isOpen && <Cover onOpen={handleOpenInvitation} data={invitationData} />}
      
      <div className={!isOpen ? 'hidden h-screen overflow-hidden' : ''}>
        <Layout isMusicPlaying={isMusicPlaying} setIsMusicPlaying={setIsMusicPlaying}>
          <div id="home">
            <Home data={invitationData} />
          </div>
          <div id="event">
            <Event data={invitationData} />
          </div>
          <div id="location">
            <Location data={invitationData} />
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
