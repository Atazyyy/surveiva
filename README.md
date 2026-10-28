Kategori: Web App — Survey/Form Builder

# Surveiva — Survey & Form Builder

> **Kategori proyek: Web App — Survey/Form Builder.**
> Responden mengisi form; penyusun meracik pertanyaan di builder dan membaca
> hasilnya sebagai grafik, lengkap dengan export CSV.

Aplikasi survey/form builder fiktif "Surveiva" — dari builder pertanyaan 6
tipe sampai dashboard hasil dengan grafik SVG buatan sendiri. Proyek ini adalah
**concept demo** untuk portofolio jasa pembuatan web app — seluruh nama brand,
event, responden, dan angka bersifat fiktif. Nama "Surveiva" sengaja dibuat
unik (belum dipakai entitas mana pun di internet).

**Live:** https://surveiva.vercel.app

## Fitur

- **3 form contoh** siap pakai: kepuasan pelanggan kedai makan, feedback
  seminar/event, dan registrasi kelas — masing-masing dengan foto, deskripsi,
  dan 7–8 pertanyaan.
- **Builder pertanyaan**: tambah, edit, hapus, dan urutkan ulang (tombol
  naik/turun) dengan 6 tipe — isian pendek, paragraf, pilihan ganda, checkbox,
  rating bintang, dan skala 1–10. Judul & deskripsi form juga bisa diedit.
- **Mode isi form (responden)**: progres terjawab, validasi pertanyaan wajib
  per tipe, input bintang & skala yang ramah sentuhan, dan layar sukses
  "respons ke-N" setelah dikirim.
- **Dashboard hasil**: jumlah respons, respons terakhir, respons 7 hari, dan
  grafik per tipe pertanyaan — bar horizontal untuk pilihan ganda/checkbox,
  rata-rata + distribusi untuk rating/skala, daftar jawaban untuk teks.
  Semua grafik adalah **SVG buatan sendiri** (tanpa library chart).
- **Export CSV client-side** (Blob download, BOM UTF-8 agar aman dibuka di
  Excel) berisi waktu pengiriman dan seluruh jawaban per kolom pertanyaan.
- **Data persist di localStorage** — respons baru, edit builder, dan reset
  demo bertahan antar kunjungan; 30 respons mock dengan timestamp relatif
  membuat dashboard langsung "hidup".
- Responsif desktop + mobile (tab navigasi bawah di layar kecil), animasi
  halus Framer Motion, ikon Lucide, tanpa backend & tanpa API eksternal.

## Untuk siapa demo ini?

Penyelenggara event, komunitas, sekolah/kursus, atau bisnis yang butuh
mengumpulkan data responden (survei kepuasan, registrasi, pendaftaran) dengan
form yang rapi dan hasil yang mudah dibaca.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4 (token tema `@theme`)
- Framer Motion
- Lucide Icons
- Grafik SVG custom (tanpa library chart)
- localStorage untuk persistensi data demo

## Menjalankan

```bash
npm install
npm run dev      # development
npm run build    # production build ke folder dist/
npm run preview  # preview hasil build
```

---

Dibuat oleh [Agni Miftah Fauzi](https://github.com/Atazyyy) — jasa pembuatan
website & web app.
