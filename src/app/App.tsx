import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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
      // We don't auto-play music on refresh to respect browser policies
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsMusicPlaying(true);
    sessionStorage.setItem('invitation_opened', 'true');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100]"
          >
            <Cover onOpen={handleOpenInvitation} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content with Fade In */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={!isOpen ? 'hidden' : ''}
      >
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
      </motion.div>
    </>
  );
}
