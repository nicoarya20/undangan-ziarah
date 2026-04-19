import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface CoverProps {
  onOpen: () => void;
}

export default function Cover({ onOpen }: CoverProps) {
  const [guestName, setGuestName] = useState('Tamu Undangan');

  const eventData = {
    nama_acara: 'Co Kong Tik',
    mendiang: ['TJIOE YOE MOI (Alm)', 'THE LIAN KIM (Alm)'],
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tamu = params.get('tamu');
    if (tamu) setGuestName(tamu);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-black relative overflow-hidden w-full h-full fixed inset-0 z-[100]">
      {/* Decorative background pattern */}
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
          onClick={onOpen}
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
