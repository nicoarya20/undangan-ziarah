import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

export default function Messages() {
  const [messageForm, setMessageForm] = useState({ name: '', message: '' });
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const invitationId = "default-invitation-id";

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:3001/messages?invitationId=${invitationId}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error(`Failed to fetch messages: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageForm.name || !messageForm.message) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3001/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invitationId,
          name: messageForm.name,
          message: messageForm.message
        }),
      });

      if (response.ok) {
        setMessageForm({ name: '', message: '' });
        fetchMessages();
      } else {
        alert('Gagal mengirim ucapan.');
      }
    } catch (error) {
      console.error('Error submitting message:', error);
      alert('Terjadi kesalahan koneksi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-6 bg-white">
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-red-800 text-white rounded-full hover:bg-red-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
            <span className="font-semibold">{isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}</span>
          </button>
        </form>

        {/* Messages list */}
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-center text-gray-500">Memuat ucapan...</p>
          ) : messages.length === 0 ? (
            <p className="text-center text-gray-500">Belum ada ucapan.</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-800 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-red-900">{msg.name}</h4>
                  <span className="text-sm text-gray-500">
                    {new Date(msg.createdAt).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{msg.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
