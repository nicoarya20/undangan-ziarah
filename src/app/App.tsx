import { useState, useEffect } from 'react';
import { Volume2, VolumeX, MapPin, Send, Heart, Share2, Copy, Calendar, Users } from 'lucide-react';
import { Navigation } from './components/Navigation';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [rsvpForm, setRsvpForm] = useState({ name: '', status: '', guests: '1' });
  const [messageForm, setMessageForm] = useState({ name: '', message: '' });
  const [messages, setMessages] = useState([
    { name: 'Budi Santoso', message: 'Semoga mendiang diberi jalan cerah dan kebahagiaan 🙏', time: '2 jam yang lalu' },
    { name: 'Lisa Wijaya', message: 'Turut berduka cita. Semoga keluarga diberi ketabahan', time: '5 jam yang lalu' }
  ]);

  // Data acara
  const eventData = {
    nama_acara: 'Co Kong Tik',
    mendiang: ['TJIOE YOE MOI (Alm)', 'THE LIAN KIM (Alm)'],
    tanggal: '2026-05-15T09:00:00',
    lokasi: 'Jl. Raya Kuta No. 88, Kuta, Bali',
    maps_url: 'https://maps.google.com/?q=-8.718,115.167',
    keluarga: 'Keluarga Besar Tjioe'
  };

  // Get guest name from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tamu = params.get('tamu');
    if (tamu) {
      setGuestName(tamu);
      setRsvpForm(prev => ({ ...prev, name: tamu }));
    }
  }, []);

  // Countdown timer
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

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsMusicPlaying(true);
  };

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Terima kasih atas konfirmasi Anda, ${rsvpForm.name}!`);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageForm.name && messageForm.message) {
      setMessages([
        { name: messageForm.name, message: messageForm.message, time: 'Baru saja' },
        ...messages
      ]);
      setMessageForm({ name: '', message: '' });
    }
  };

  const handleShareWhatsApp = () => {
    const url = window.location.href;
    const message = `Halo, kamu diundang ke acara ${eventData.nama_acara}. Buka undanganmu di sini: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link berhasil disalin!');
  };

  if (!isOpen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-black relative overflow-hidden">
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
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-yellow-50 relative" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Music control */}
      <button
        onClick={() => setIsMusicPlaying(!isMusicPlaying)}
        className="fixed top-6 right-6 z-50 p-4 bg-red-800 text-white rounded-full shadow-lg hover:bg-red-900 transition-all duration-300 hover:scale-110"
      >
        {isMusicPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </button>

      {/* Section 1: Sambutan */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-red-900 via-red-800 to-black text-white relative overflow-hidden">
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

      {/* Section 2: Info Acara */}
      <section id="event" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl mb-12 text-red-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Detail Acara
          </h2>

          <div className="bg-gradient-to-br from-red-50 to-yellow-50 rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-yellow-400">
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
        </div>
      </section>

      {/* Section 3: Countdown */}
      <section className="py-20 px-6 bg-gradient-to-br from-red-800 to-red-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-12" style={{ fontFamily: 'Playfair Display, serif' }}>
            Hitung Mundur Acara
          </h2>

          <div className="grid grid-cols-4 gap-4 md:gap-8">
            {[
              { label: 'Hari', value: countdown.days },
              { label: 'Jam', value: countdown.hours },
              { label: 'Menit', value: countdown.minutes },
              { label: 'Detik', value: countdown.seconds }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-yellow-400">
                <div className="text-4xl md:text-6xl font-bold text-yellow-300 mb-2">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base text-yellow-200">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Lokasi */}
      <section id="location" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl mb-12 text-red-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Lokasi Acara
          </h2>

          <div className="bg-gradient-to-br from-red-50 to-yellow-50 rounded-3xl shadow-2xl p-8 border-4 border-yellow-400">
            <div className="flex items-start gap-4 mb-8 justify-center">
              <MapPin className="w-8 h-8 text-red-800 flex-shrink-0" />
              <p className="text-lg md:text-xl text-gray-800">{eventData.lokasi}</p>
            </div>

            <a
              href={eventData.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-red-800 text-white rounded-full hover:bg-red-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">Menuju Lokasi</span>
            </a>

            <div className="mt-8 rounded-2xl overflow-hidden border-4 border-yellow-400">
              <iframe
                src={`https://maps.google.com/maps?q=-8.718,115.167&output=embed`}
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: RSVP */}
      <section id="rsvp" className="py-20 px-6 bg-gradient-to-br from-yellow-50 to-red-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-12 text-center text-red-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Konfirmasi Kehadiran
          </h2>

          <form onSubmit={handleRSVPSubmit} className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-yellow-400">
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Nama Lengkap</label>
              <input
                type="text"
                value={rsvpForm.name}
                onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-800 focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Status Kehadiran</label>
              <select
                value={rsvpForm.status}
                onChange={(e) => setRsvpForm({ ...rsvpForm, status: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-800 focus:outline-none transition-colors"
                required
              >
                <option value="">Pilih Status</option>
                <option value="hadir">Hadir</option>
                <option value="tidak">Tidak Hadir</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-2">Jumlah Tamu</label>
              <input
                type="number"
                min="1"
                value={rsvpForm.guests}
                onChange={(e) => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-800 focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-red-800 text-white rounded-full hover:bg-red-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Send className="w-5 h-5" />
              <span className="font-semibold">Kirim Konfirmasi</span>
            </button>
          </form>
        </div>
      </section>

      {/* Section 6: Ucapan & Doa */}
      <section id="messages" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-12 text-center text-red-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ucapan & Doa
          </h2>

          {/* Form */}
          <form onSubmit={handleMessageSubmit} className="bg-gradient-to-br from-red-50 to-yellow-50 rounded-3xl shadow-2xl p-8 mb-12 border-4 border-yellow-400">
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Nama</label>
              <input
                type="text"
                value={messageForm.name}
                onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-800 focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Ucapan / Doa</label>
              <textarea
                value={messageForm.message}
                onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-800 focus:outline-none transition-colors resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-red-800 text-white rounded-full hover:bg-red-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Send className="w-5 h-5" />
              <span className="font-semibold">Kirim Ucapan</span>
            </button>
          </form>

          {/* Messages list */}
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-800 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-red-900">{msg.name}</h4>
                  <span className="text-sm text-gray-500">{msg.time}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{msg.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Footer */}
      <footer className="py-16 px-6 bg-gradient-to-br from-red-900 via-red-800 to-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <p className="text-xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Bagikan Undangan Ini
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={handleShareWhatsApp}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 rounded-full hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Share2 className="w-5 h-5" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-6 py-3 bg-yellow-600 rounded-full hover:bg-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Copy className="w-5 h-5" />
                <span>Salin Link</span>
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-yellow-400/30">
            <p className="text-yellow-200/80 flex items-center justify-center gap-2">
              Dibuat dengan <Heart className="w-4 h-4 text-red-500 fill-red-500" /> oleh undangonlinebali.com
            </p>
          </div>
        </div>
      </footer>

      {/* Navigation Menu */}
      <Navigation />
    </div>
  );
}
