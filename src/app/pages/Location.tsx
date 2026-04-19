import { MapPin } from 'lucide-react';

export default function Location() {
  const eventData = {
    lokasi: 'Jl. Raya Kuta No. 88, Kuta, Bali',
    maps_url: 'https://maps.google.com/?q=-8.718,115.167'
  };

  return (
    <div className="min-h-screen py-20 px-6">
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

          <div className="mt-8 rounded-2xl overflow-hidden border-4 border-yellow-400 shadow-inner">
            <iframe
              src={`https://maps.google.com/maps?q=-8.718,115.167&output=embed`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              title="Lokasi Acara"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
