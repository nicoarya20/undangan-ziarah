import { useState, useEffect } from 'react';
import { Calendar, Users } from 'lucide-react';

export default function Event() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const eventData = {
    nama_acara: 'Co Kong Tik',
    mendiang: ['TJIOE YOE MOI (Alm)', 'THE LIAN KIM (Alm)'],
    tanggal: '2026-05-15T09:00:00',
    keluarga: 'Keluarga Besar Tjioe'
  };

  useEffect(() => {
    const targetDate = new Date(eventData.tanggal).getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [eventData.tanggal]);

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl mb-12 text-red-900" style={{ fontFamily: 'Playfair Display, serif' }}>
          Detail Acara
        </h2>

        <div className="bg-gradient-to-br from-red-50 to-yellow-50 rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-yellow-400 mb-12">
          <div className="mb-8">
            <h3 className="text-3xl md:text-4xl mb-4 text-red-800" style={{ fontFamily: 'Playfair Display, serif' }}>
              {eventData.nama_acara}
            </h3>
            <div className="text-gray-700 space-y-2" style={{ fontFamily: 'Noto Serif, serif' }}>
              {eventData.mendiang.map((nama, idx) => (
                <p key={idx} className="text-xl">{nama}</p>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-800 text-white rounded-full">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-red-900 mb-1">Tanggal & Waktu</p>
                <p className="text-gray-700">
                  {new Date(eventData.tanggal).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-gray-700">Pukul 09:00 WITA</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-800 text-white rounded-full">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-red-900 mb-1">Penyelenggara</p>
                <p className="text-gray-700">{eventData.keluarga}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="bg-gradient-to-br from-red-800 to-red-900 text-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl md:text-3xl mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            Hitung Mundur Acara
          </h2>
          <div className="grid grid-cols-4 gap-2 md:gap-8">
            {[
              { label: 'Hari', value: countdown.days },
              { label: 'Jam', value: countdown.hours },
              { label: 'Menit', value: countdown.minutes },
              { label: 'Detik', value: countdown.seconds }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border-2 border-yellow-400">
                <div className="text-2xl md:text-4xl font-bold text-yellow-300 mb-1">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] md:text-sm text-yellow-200">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
