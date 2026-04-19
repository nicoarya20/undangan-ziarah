import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function RSVP() {
  const [rsvpForm, setRsvpForm] = useState({ name: '', status: '', guests: '1' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fixed invitation ID for this instance (should be fetched from DB in production)
  const invitationId = "default-invitation-id";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tamu = params.get('tamu');
    if (tamu) {
      setRsvpForm(prev => ({ ...prev, name: tamu }));
    }
  }, []);

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3001/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invitationId,
          ...rsvpForm
        }),
      });
      
      if (response.ok) {
        alert(`Terima kasih atas konfirmasi Anda, ${rsvpForm.name}!`);
      } else {
        alert('Gagal mengirim konfirmasi. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Terjadi kesalahan koneksi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-yellow-50 to-red-50">
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
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Status Kehadiran</label>
            <select
              value={rsvpForm.status}
              onChange={(e) => setRsvpForm({ ...rsvpForm, status: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-800 focus:outline-none transition-colors"
              required
              disabled={isSubmitting}
            >
              <option value="">Pilih Status</option>
              <option value="ATTENDING">Hadir</option>
              <option value="NOT_ATTENDING">Tidak Hadir</option>
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
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-red-800 text-white rounded-full hover:bg-red-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
          >
            <Send className="w-5 h-5" />
            <span className="font-semibold">{isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
