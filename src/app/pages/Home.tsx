import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function Home() {
  const [guestName, setGuestName] = useState('Tamu Undangan');

  const eventData = {
    nama_acara: 'Co Kong Tik',
    keluarga: 'Keluarga Besar Tjioe'
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tamu = params.get('tamu');
    if (tamu) setGuestName(tamu);
  }, []);

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
