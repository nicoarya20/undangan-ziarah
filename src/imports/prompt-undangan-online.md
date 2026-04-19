# Prompt: Buat Website Undangan Online (Single Page)

## Konteks

Kamu adalah developer web yang bertugas membangun **halaman undangan online single-page** berbasis struktur menu yang sudah dianalisis dari situs `undangonlinebali.com/co-kong-tik/`.

Website ini adalah undangan digital untuk acara **Co Kong Tik** (upacara ritual leluhur Tionghoa-Bali), namun strukturnya bisa digunakan untuk acara serupa (pernikahan, ulang tahun, duka, dll).

---

## Struktur Menu / Section (Urutan dari Atas ke Bawah)

### ① Cover / Hero Section
- Tampilkan **nama acara** (contoh: "Co Kong Tik") sebagai judul utama
- Tampilkan **nama mendiang** (contoh: TJIOE YOE MOI (Alm) & THE LIAN KIM (Alm))
- Tombol **"Buka Undangan"** yang memicu animasi reveal ke section berikutnya
- **Musik backsound** autoplay (contoh: lagu Buddha - Amithofo) dengan tombol mute/unmute
- Animasi masuk: fade-in atau slide-up saat halaman pertama dibuka

### ② Sambutan / Teks Undangan
- Kalimat pembuka formal:
  > "Atas Karunia Tuhan Yang Maha Esa, Kami Sekeluarga Mengundang Bapak/Ibu/Saudara/i"
- **Nama tamu** ditampilkan secara dinamis dari query string URL
  - Contoh URL: `/co-kong-tik/?tamu=Handi`
  - Jika tidak ada parameter, tampilkan teks default: "Tamu Undangan"

### ③ Info Acara / Detail Upacara
- Nama acara lengkap
- Tanggal, hari, dan jam pelaksanaan
- Nama keluarga penyelenggara
- Deskripsi singkat acara (opsional)

### ④ Countdown Timer
- Hitung mundur otomatis menuju tanggal acara
- Format tampilan: `00 Hari · 00 Jam · 00 Menit · 00 Detik`
- Jika acara sudah lewat, tampilkan teks: "Acara telah berlangsung. Terima kasih atas kehadiran Anda."

### ⑤ Lokasi / Peta Acara
- Tampilkan alamat lengkap lokasi acara
- Tombol **"Menuju Lokasi"** yang membuka Google Maps (gunakan link `https://maps.google.com/?q=...`)
- Opsional: embed Google Maps iframe

### ⑥ RSVP / Konfirmasi Kehadiran
- Form sederhana dengan field:
  - Nama tamu (pre-fill dari query string jika ada)
  - Status kehadiran: `Hadir` / `Tidak Hadir`
  - Jumlah tamu yang dibawa (opsional)
- Tombol **"Kirim Konfirmasi"**
- Data RSVP dikirim ke Google Sheets via Google Apps Script (endpoint POST)

### ⑦ Ucapan Doa / Pesan Tamu
- Wall ucapan publik — semua tamu bisa melihat ucapan satu sama lain
- Form input: nama + isi ucapan/doa
- Tampilkan daftar ucapan yang sudah masuk (load dari API / Google Sheets)
- Contoh ucapan:
  > "Semoga mendiang diberi jalan cerah dan kebahagiaan 🙏"

### ⑧ Footer / Branding
- Credit: "Dibuat dengan ❤️ oleh undangonlinebali.com"
- Tombol **share WhatsApp** dengan pesan pre-fill:
  > "Halo, kamu diundang ke acara Co Kong Tik. Buka undanganmu di sini: [link]"
- Tombol share link (copy to clipboard)

---

## Spesifikasi Teknis

### Stack yang Digunakan
- **HTML5 + CSS3 + Vanilla JavaScript** (single file `index.html`)
- Atau **React** jika butuh state management lebih kompleks
- **Tidak menggunakan framework berat** — prioritas loading cepat di mobile

### Desain
- Mobile-first, responsive
- Tema: **tradisional Tionghoa-Bali** — warna merah, emas, dan hitam
- Font: Google Fonts (`Noto Serif` atau `Playfair Display` untuk judul, `Poppins` untuk body)
- Ornamen dekoratif: motif batik / ukiran Bali sebagai border atau background

### Fitur Tambahan (Opsional)
- [ ] Animasi scroll AOS (Animate On Scroll)
- [ ] Amplop digital (tombol buka undangan dengan animasi amplop terbuka)
- [ ] Galeri foto mendiang / keluarga
- [ ] Tombol musik (play/pause backsound)
- [ ] Dark/light mode toggle

---

## Data Dummy untuk Testing

```json
{
  "nama_acara": "Co Kong Tik",
  "mendiang": ["TJIOE YOE MOI (Alm)", "THE LIAN KIM (Alm)"],
  "tanggal": "2024-11-10T09:00:00",
  "lokasi": "Jl. Raya Kuta No. 88, Kuta, Bali",
  "maps_url": "https://maps.google.com/?q=-8.718,115.167",
  "musik_url": "https://example.com/amithofo.mp3",
  "keluarga": "Keluarga Besar Tjioe"
}
```

---

## Output yang Diharapkan

Hasilkan **satu file HTML lengkap** (`index.html`) yang:

1. Memuat semua 8 section di atas dalam urutan yang benar
2. Smooth scroll antar section saat klik navigasi
3. Countdown timer berjalan real-time
4. Nama tamu terbaca dari URL query string `?tamu=NamaTamu`
5. Tombol WhatsApp share berfungsi
6. Responsive di mobile (min-width: 320px) dan desktop
7. Loading cepat — tidak ada dependency eksternal selain Google Fonts dan icon library (FontAwesome atau Heroicons)

---

## Catatan Tambahan

> Website ini bersifat **read-only** untuk pengunjung umum. Hanya pemilik (admin) yang bisa mengubah konten melalui panel atau langsung edit file. Tidak perlu sistem login atau CMS.

> Untuk deployment: cukup upload `index.html` ke hosting statis (Netlify, Vercel, GitHub Pages, atau shared hosting).
