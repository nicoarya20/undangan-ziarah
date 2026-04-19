import { useState, useEffect } from 'react';
import { Calendar, Heart } from 'lucide-react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');

  const eventData = {
    nama_acara: 'Co Kong Tik',
    mendiang: ['TJIOE YOE MOI (Alm)', 'THE LIAN KIM (Alm)'],
    keluarga: 'Keluarga Besar Tjioe'
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tamu = params.get('tamu');
    if (tamu) setGuestName(tamu);
    
    // Check if invitation was already opened in this session
    const opened = sessionStorage.getItem('invitation_opened');
    if (opened) setIsOpen(true);
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    sessionStorage.setItem('invitation_opened', 'true');
    // In a real app, we might want to trigger music play from here
    // using a shared state or event bus.
  };

  if (!isOpen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 border-4 border-yellow-500 rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 border-4 border-yellow-500 rounded-full translate-x-48 translate-y-48"></div>
        </div>

        <div className="text-center z-10 px-6 animate-fade-in">
          <div className="mb-8">
            <div className="inline-block p-6 bg-yellow-500/20 rounded-full mb-6">
              <Calendar className="w-16 h-16 text-yellow-400" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              {eventData.nama_acara}
            </h1>
            <div className="space-y-2 text-white text-lg md:text-xl mb-8" style={{ fontFamily: 'Noto Serif, serif' }}>
              {eventData.mendiang.map((nama, idx) => (
                <p key={idx} className="font-semibold">{nama}</p>
              ))}
            </div>
          </div>

          <button
            onClick={handleOpenInvitation}
            className="group relative px-12 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 font-semibold rounded-full text-lg shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10">Buka Undangan</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
          </button>

          <div className="mt-12 text-yellow-300/80 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Kepada Yth: <span className="font-semibold text-yellow-200">{guestName}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-red-900 via-red-800 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-yellow-500 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-yellow-500 rounded-full"></div>
      </div>

      <div className="max-w-3xl text-center z-10 animate-fade-in">
        <div className="mb-8 inline-block p-4 bg-yellow-500/20 rounded-full">
          <Heart className="w-12 h-12 text-yellow-400" />
        </div>

        <h2 className="text-3xl md:text-4xl mb-8 text-yellow-400" style={{ fontFamily: 'Playfair Display, serif' }}>
          Undangan {eventData.nama_acara}
        </h2>

        <p className="text-lg md:text-xl leading-relaxed mb-8 text-yellow-100" style={{ fontFamily: 'Noto Serif, serif' }}>
          Atas Karunia Tuhan Yang Maha Esa,<br />
          Kami Sekeluarga Mengundang<br />
          Bapak/Ibu/Saudara/i
        </p>

        <div className="text-2xl md:text-3xl font-bold text-yellow-300 mb-12 px-6 py-3 bg-red-800/50 rounded-lg inline-block">
          {guestName}
        </div>

        <p className="text-base md:text-lg text-yellow-200/90">
          Untuk menghadiri upacara {eventData.nama_acara} yang akan diselenggarakan oleh {eventData.keluarga}
        </p>
      </div>
    </section>
  );
}
