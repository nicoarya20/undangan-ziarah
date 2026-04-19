import { useState, useEffect } from 'react';
import { Send, Users, UserCheck, UserX } from 'lucide-react';

interface RSVPItem {
  id: string;
  guestId: string;
  status: 'ATTENDING' | 'NOT_ATTENDING' | 'UNCERTAIN';
  guestCount: number;
  createdAt: string;
  guest: {
    name: string;
  };
}

interface RSVPSummary {
  attending: number;
  notAttending: number;
  totalGuests: number;
}

export default function RSVP() {
  const [rsvpForm, setRsvpForm] = useState({ name: '', status: '', guests: '1' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rsvpData, setRsvpData] = useState<{ summary: RSVPSummary; list: RSVPItem[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const invitationId = "default-invitation-id";

  const fetchRSVPData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/rsvp?invitationId=${invitationId}`);
      if (response.ok) {
        const data = await response.json();
        setRsvpData(data);
      }
    } catch (error) {
      console.error('Error fetching RSVP data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRSVPData();
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
        setRsvpForm({ name: '', status: '', guests: '1' });
        fetchRSVPData();
        alert(`Terima kasih atas konfirmasi Anda!`);
      } else {
        alert('Gagal mengirim konfirmasi.');
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
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl mb-12 text-center text-red-900" style={{ fontFamily: 'Playfair Display, serif' }}>
          Konfirmasi Kehadiran
        </h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-green-500 text-center">
            <UserCheck className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{rsvpData?.summary.attending || 0}</div>
            <div className="text-sm text-gray-500">Hadir</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-red-500 text-center">
            <UserX className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{rsvpData?.summary.notAttending || 0}</div>
            <div className="text-sm text-gray-500">Berhalangan</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-yellow-500 text-center col-span-2 md:col-span-1">
            <Users className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{rsvpData?.summary.totalGuests || 0}</div>
            <div className="text-sm text-gray-500">Total Tamu</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleRSVPSubmit} className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-yellow-400 h-fit">
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
                <option value="NOT_ATTENDING">Berhalangan</option>
              </select>
            </div>

            {rsvpForm.status === 'ATTENDING' && (
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
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-red-800 text-white rounded-full hover:bg-red-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              <span className="font-semibold">{isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}</span>
            </button>
          </form>

          {/* List */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" /> Konfirmasi Terbaru
            </h3>
            {isLoading ? (
              <p className="text-gray-500">Memuat data...</p>
            ) : rsvpData?.list.length === 0 ? (
              <p className="text-gray-500 italic text-center py-8">Belum ada konfirmasi.</p>
            ) : (
              rsvpData?.list.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between border-l-4 border-yellow-400">
                  <div>
                    <div className="font-semibold text-gray-800">{item.guest.name}</div>
                    <div className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleString('id-ID')}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.status === 'ATTENDING' ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                        <UserCheck className="w-3 h-3" /> Hadir ({item.guestCount})
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1">
                        <UserX className="w-3 h-3" /> Berhalangan
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
