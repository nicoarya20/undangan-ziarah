import { Volume2, VolumeX, Home, Info, MapPin, CheckCircle, MessageSquare, Heart } from 'lucide-react';

const navItems = [
  { id: 'home', icon: Home, label: 'Beranda' },
  { id: 'event', icon: Info, label: 'Acara' },
  { id: 'location', icon: MapPin, label: 'Lokasi' },
  { id: 'rsvp', icon: CheckCircle, label: 'RSVP' },
  { id: 'messages', icon: MessageSquare, label: 'Ucapan' },
];

interface LayoutProps {
  children: React.ReactNode;
  isMusicPlaying: boolean;
  setIsMusicPlaying: (val: boolean) => void;
}

export default function Layout({ children, isMusicPlaying, setIsMusicPlaying }: LayoutProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-yellow-50 pb-24" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Music control */}
      <button
        onClick={() => setIsMusicPlaying(!isMusicPlaying)}
        className="fixed bottom-28 right-6 z-50 p-4 bg-red-800 text-white rounded-full shadow-lg hover:bg-red-900 transition-all duration-300 hover:scale-110"
      >
        {isMusicPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </button>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 bg-gradient-to-br from-red-900 via-red-800 to-black text-white text-center">
        <div className="max-w-4xl mx-auto">
          <div className="pt-8 border-t border-yellow-400/30">
            <p className="text-yellow-200/80 flex items-center justify-center gap-2 text-sm">
              Dibuat dengan <Heart className="w-4 h-4 text-red-500 fill-red-500" /> oleh undangonlinebali.com
            </p>
          </div>
        </div>
      </footer>

      {/* Navigation Menu */}
      <div
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
      </div>
    </div>
  );
}
