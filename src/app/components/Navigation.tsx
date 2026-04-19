import { Home, Info, MapPin, CheckCircle, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { id: 'home', icon: Home, label: 'Beranda' },
  { id: 'event', icon: Info, label: 'Acara' },
  { id: 'location', icon: MapPin, label: 'Lokasi' },
  { id: 'rsvp', icon: CheckCircle, label: 'RSVP' },
  { id: 'messages', icon: MessageSquare, label: 'Ucapan' },
];

export function Navigation() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
    >
      <nav className="bg-red-900/90 backdrop-blur-md border border-yellow-500/30 rounded-full shadow-2xl px-6 py-3">
        <ul className="flex items-center justify-between">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="flex flex-col items-center gap-1 text-yellow-500/70 hover:text-yellow-400 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
}
