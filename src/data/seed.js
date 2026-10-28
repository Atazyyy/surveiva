// Data contoh Surveiva — seluruh nama brand, orang, event, dan angka
// bersifat FIKTIF. Timestamp respons dihitung relatif terhadap waktu
// halaman dibuka supaya demo selalu terlihat "hidup".

const H = 3600000; // satu jam dalam ms

export const WA_NUMBER = "6281234567890";

export const HERO_IMG =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=70";

// ---------- 3 form contoh ----------
export const FORMS = [
  {
    id: "f-kepuasan",
    emoji: "🍜",
    title: "Kepuasan Pelanggan — Rasa Nusantara",
    description:
      "Survei bulanan kedai makan Rasa Nusantara. Jawabanmu membantu kami meracik menu dan layanan yang lebih pas.",
    cover:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=70",
    questions: [
      {
        id: "q1",
        type: "radio",
        label: "Seberapa sering Anda mampir ke Rasa Nusantara?",
        required: true,
        options: ["Hampir setiap minggu", "1–3 kali sebulan", "Jarang, sekali-sekali", "Baru pertama kali"],
      },
      { id: "q2", type: "rating", label: "Nilai rasa makanan kami", required: true },
      { id: "q3", type: "rating", label: "Nilai kecepatan penyajian", required: false },
      {
        id: "q4",
        type: "scale",
        label: "Seberapa besar kemungkinan Anda merekomendasikan kami? (1 = pasti tidak, 10 = pasti ya)",
        required: true,
      },
      {
        id: "q5",
        type: "checkbox",
        label: "Menu mana saja yang paling Anda sukai?",
        required: false,
        options: ["Nasi goreng spesial", "Ayam bakar madu", "Soto Bandung", "Es cendol", "Kopi tubruk"],
      },
      {
        id: "q6",
        type: "radio",
        label: "Menurut Anda, harga di kedai kami:",
        required: false,
        options: ["Sangat terjangkau", "Terjangkau", "Sedang", "Agak mahal"],
      },
      { id: "q7", type: "paragraph", label: "Saran atau masukan untuk kami", required: false },
    ],
  },
  {
    id: "f-event",
    emoji: "🎤",
    title: "Feedback Event — Seminar Teknologi Cerdas 2026",
    description:
      "Form evaluasi untuk peserta Seminar Teknologi Cerdas 2026. Masukanmu menentukan tema dan pembicara edisi berikutnya.",
    cover:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=70",
    questions: [
      {
        id: "q1",
        type: "radio",
        label: "Dari mana Anda mengetahui acara ini?",
        required: true,
        options: ["Media sosial", "Teman atau rekan kerja", "Poster & pengumuman kampus", "Newsletter komunitas"],
      },
      { id: "q2", type: "rating", label: "Penilaian keseluruhan acara", required: true },
      { id: "q3", type: "rating", label: "Kualitas materi & pembicara", required: false },
      {
        id: "q4",
        type: "scale",
        label: "Seberapa puas Anda dengan venue dan fasilitas? (1 = sangat tidak puas, 10 = sangat puas)",
        required: false,
      },
      {
        id: "q5",
        type: "radio",
        label: "Sesi mana yang paling bermanfaat bagi Anda?",
        required: false,
        options: [
          "Sesi 1 — AI untuk UMKM",
          "Sesi 2 — Otomasi Bisnis Sehari-hari",
          "Sesi 3 — Showcase Startup Lokal",
          "Sesi networking & doorprize",
        ],
      },
      {
        id: "q6",
        type: "checkbox",
        label: "Topik apa yang Anda ingin hadir di edisi berikutnya?",
        required: false,
        options: ["Data & analitik", "Cloud & infrastruktur", "Keamanan digital", "Desain produk", "Pemasaran digital"],
      },
      { id: "q7", type: "short", label: "Tulis satu kata yang menggambarkan acara ini", required: false },
      { id: "q8", type: "paragraph", label: "Masukan untuk penyelenggara", required: false },
    ],
  },
  {
    id: "f-registrasi",
    emoji: "🎓",
    title: "Registrasi — Kelas Fotografi Pemula",
    description:
      "Pendaftaran batch kelas fotografi pemula Komunitas Lensa Kota (fiktif). Kuota tiap batch hanya 12 orang.",
    cover:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=70",
    questions: [
      { id: "q1", type: "short", label: "Nama lengkap", required: true },
      { id: "q2", type: "short", label: "Nomor WhatsApp aktif", required: true },
      {
        id: "q3",
        type: "radio",
        label: "Pengalaman fotografi Anda saat ini",
        required: true,
        options: ["Belum pernah sama sekali", "Otodidak, sering coba-coba", "Pernah ikut pelatihan"],
      },
      {
        id: "q4",
        type: "radio",
        label: "Jadwal kelas yang dipilih",
        required: true,
        options: ["Batch Pagi — Sabtu 09.00–12.00", "Batch Malam — Selasa 19.00–21.00"],
      },
      {
        id: "q5",
        type: "checkbox",
        label: "Genre yang paling ingin Anda pelajari",
        required: false,
        options: ["Lanskap", "Potret", "Produk", "Street photography"],
      },
      {
        id: "q6",
        type: "scale",
        label: "Seberapa siap Anda mengikuti kelas intensif 4 minggu? (1 = belum siap, 10 = sangat siap)",
        required: false,
      },
      { id: "q7", type: "paragraph", label: "Kenapa Anda ingin ikut kelas ini?", required: true },
    ],
  },
];

export const formById = (id) => FORMS.find((f) => f.id === id) || null;

// ---------- Respons mock ----------
let seq = 0;
const resp = (formId, h, answers) => ({
  id: `r-${++seq}`,
  formId,
  ts: Date.now() - h * H,
  answers,
});

export const SEED_RESPONSES = [
  // Form 1 — Kepuasan Pelanggan (12 respons)
  resp("f-kepuasan", 2, {
    q1: "Hampir setiap minggu", q2: 5, q3: 4, q4: 9,
    q5: ["Nasi goreng spesial", "Es cendol"], q6: "Terjangkau",
    q7: "Rasa nasi gorengnya juara dan penyajian cepat. Semoga porsi large kembali tersedia.",
  }),
  resp("f-kepuasan", 5, {
    q1: "1–3 kali sebulan", q2: 4, q3: 3, q4: 7,
    q5: ["Ayam bakar madu"], q6: "Terjangkau",
    q7: "Enak, tapi saat jam makan siang es cendol sering kehabisan.",
  }),
  resp("f-kepuasan", 9, {
    q1: "Baru pertama kali", q2: 5, q3: 5, q4: 10,
    q5: ["Nasi goreng spesial", "Kopi tubruk"], q6: "Sangat terjangkau",
    q7: "Recommended banget! Suasana kedainya nyaman buat nugas juga.",
  }),
  resp("f-kepuasan", 27, {
    q1: "Hampir setiap minggu", q2: 3, q3: 2, q4: 5,
    q5: ["Soto Bandung"], q6: "Sedang",
    q7: "Akhir-akhir ini tunggunya lama padahal tidak terlalu ramai. Mohon diperbanyak stafnya.",
  }),
  resp("f-kepuasan", 33, {
    q1: "1–3 kali sebulan", q2: 4, q3: 4, q4: 8,
    q5: ["Ayam bakar madu", "Es cendol"], q6: "Terjangkau", q7: "",
  }),
  resp("f-kepuasan", 56, {
    q1: "Jarang, sekali-sekali", q2: 4, q3: 3, q4: 6,
    q5: ["Nasi goreng spesial"], q6: "Sedang",
    q7: "Tolong sediakan opsi tanpa pedas juga.",
  }),
  resp("f-kepuasan", 74, {
    q1: "Hampir setiap minggu", q2: 5, q3: 4, q4: 9,
    q5: ["Nasi goreng spesial", "Ayam bakar madu", "Kopi tubruk"], q6: "Terjangkau",
    q7: "Pelayanannya ramah, kopi tubruknya paling mantap.",
  }),
  resp("f-kepuasan", 99, {
    q1: "Baru pertama kali", q2: 2, q3: 2, q4: 4,
    q5: ["Soto Bandung"], q6: "Agak mahal",
    q7: "Porsi kecil untuk harganya. Mungkin cocoknya untuk cemilan.",
  }),
  resp("f-kepuasan", 123, {
    q1: "1–3 kali sebulan", q2: 5, q3: 4, q4: 8,
    q5: ["Es cendol", "Kopi tubruk"], q6: "Terjangkau", q7: "",
  }),
  resp("f-kepuasan", 150, {
    q1: "Hampir setiap minggu", q2: 4, q3: 3, q4: 7,
    q5: ["Ayam bakar madu"], q6: "Sedang",
    q7: "Parkirnya sempit kalau bawa mobil, sebaiknya perlu aturan khusus.",
  }),
  resp("f-kepuasan", 180, {
    q1: "Jarang, sekali-sekali", q2: 3, q3: 3, q4: 6,
    q5: [], q6: "Sedang",
    q7: "Standar, tidak buruk tapi juga belum istimewa.",
  }),
  resp("f-kepuasan", 210, {
    q1: "1–3 kali sebulan", q2: 5, q3: 5, q4: 9,
    q5: ["Nasi goreng spesial", "Es cendol"], q6: "Terjangkau",
    q7: "Cendolnya jangan pernah diubah resepnya. Sumpah enak.",
  }),

  // Form 2 — Feedback Event (10 respons)
  resp("f-event", 3, {
    q1: "Media sosial", q2: 5, q3: 5, q4: 9,
    q5: "Sesi 1 — AI untuk UMKM", q6: ["Data & analitik", "Pemasaran digital"], q7: "Inspiratif",
    q8: "Durasi Q&A bisa lebih panjang, tapi keseluruhan rapi.",
  }),
  resp("f-event", 7, {
    q1: "Teman atau rekan kerja", q2: 4, q3: 4, q4: 8,
    q5: "Sesi 2 — Otomasi Bisnis Sehari-hari", q6: ["Cloud & infrastruktur"], q7: "Mantap", q8: "",
  }),
  resp("f-event", 20, {
    q1: "Poster & pengumuman kampus", q2: 4, q3: 5, q4: 7,
    q5: "Sesi 3 — Showcase Startup Lokal", q6: ["Keamanan digital", "Desain produk"], q7: "Keren",
    q8: "Sound system sempat bermasalah di sesi pagi.",
  }),
  resp("f-event", 30, {
    q1: "Media sosial", q2: 5, q3: 4, q4: 9,
    q5: "Sesi 1 — AI untuk UMKM", q6: ["Data & analitik", "Keamanan digital"], q7: "Bermanfaat",
    q8: "Pembicara sesi 1 sangat komunikatif.",
  }),
  resp("f-event", 52, {
    q1: "Newsletter komunitas", q2: 3, q3: 3, q4: 6,
    q5: "Sesi networking & doorprize", q6: ["Pemasaran digital"], q7: "Lumayan",
    q8: "Materi sesi 2 agak terlalu dasar untuk saya.",
  }),
  resp("f-event", 76, {
    q1: "Teman atau rekan kerja", q2: 4, q3: 4, q4: 7,
    q5: "Sesi 2 — Otomasi Bisnis Sehari-hari",
    q6: ["Data & analitik", "Cloud & infrastruktur", "Desain produk"], q7: "Oke", q8: "",
  }),
  resp("f-event", 100, {
    q1: "Media sosial", q2: 5, q3: 5, q4: 10,
    q5: "Sesi 1 — AI untuk UMKM", q6: ["Data & analitik"], q7: "Luar biasa",
    q8: "Event tahun depan saya ikut lagi. Konsumsinya juga enak.",
  }),
  resp("f-event", 130, {
    q1: "Poster & pengumuman kampus", q2: 4, q3: 3, q4: 6,
    q5: "Sesi 3 — Showcase Startup Lokal", q6: ["Desain produk"], q7: "Seru",
    q8: "Antrean registrasi pagi panjang, mungkin perlu jalur check-in kedua.",
  }),
  resp("f-event", 160, {
    q1: "Teman atau rekan kerja", q2: 4, q3: 4, q4: 8,
    q5: "Sesi networking & doorprize", q6: ["Pemasaran digital", "Keamanan digital"], q7: "Asyik", q8: "",
  }),
  resp("f-event", 200, {
    q1: "Media sosial", q2: 3, q3: 4, q4: 5,
    q5: "Sesi 2 — Otomasi Bisnis Sehari-hari", q6: ["Cloud & infrastruktur", "Pemasaran digital"], q7: "Padat",
    q8: "Venue agak jauh dari stasiun. Mohon pertimbangkan lokasi yang lebih strategis.",
  }),

  // Form 3 — Registrasi Kelas (8 respons)
  resp("f-registrasi", 4, {
    q1: "Dimas Prakoso", q2: "0812-3345-6712", q3: "Otodidak, sering coba-coba",
    q4: "Batch Pagi — Sabtu 09.00–12.00", q5: ["Lanskap", "Street photography"], q6: 8,
    q7: "Saya mau serius belajar komposisi karena sering dokumentasi perjalanan.",
  }),
  resp("f-registrasi", 14, {
    q1: "Anisa Rahmadani", q2: "0857-1122-9087", q3: "Belum pernah sama sekali",
    q4: "Batch Malam — Selasa 19.00–21.00", q5: ["Potret"], q6: 7,
    q7: "Ingin punya skill baru buat foto keluarga di rumah.",
  }),
  resp("f-registrasi", 26, {
    q1: "Bayu Segara", q2: "0813-9988-2210", q3: "Pernah ikut pelatihan",
    q4: "Batch Pagi — Sabtu 09.00–12.00", q5: ["Produk"], q6: 9,
    q7: "Saya pegang toko online, butuh foto produk yang lebih profesional.",
  }),
  resp("f-registrasi", 48, {
    q1: "Citra Larasati", q2: "0895-4455-7321", q3: "Belum pernah sama sekali",
    q4: "Batch Pagi — Sabtu 09.00–12.00", q5: ["Lanskap", "Potret"], q6: 6,
    q7: "Baru beli kamera bekas, mau belajar dari nol bareng teman.",
  }),
  resp("f-registrasi", 72, {
    q1: "Farhan Maulana", q2: "0821-7744-1099", q3: "Otodidak, sering coba-coba",
    q4: "Batch Malam — Selasa 19.00–21.00", q5: ["Street photography"], q6: 8,
    q7: "Kerja saya selesai jam 8, kelas malam pas banget buat jadwal.",
  }),
  resp("f-registrasi", 110, {
    q1: "Gita Purnama", q2: "0812-6600-3355", q3: "Belum pernah sama sekali",
    q4: "Batch Malam — Selasa 19.00–21.00", q5: ["Potret", "Produk"], q6: 5,
    q7: "Wishlist pribadi tahun ini: berani tampil di pameran foto mini.",
  }),
  resp("f-registrasi", 150, {
    q1: "Hendra Wijaksana", q2: "0838-2233-8844", q3: "Otodidak, sering coba-coba",
    q4: "Batch Pagi — Sabtu 09.00–12.00", q5: ["Lanskap"], q6: 7,
    q7: "Sudah lama tertunda, tahun ini eksekusi. Saya prefer hunting pagi.",
  }),
  resp("f-registrasi", 190, {
    q1: "Intan Permata", q2: "0856-0912-4478", q3: "Belum pernah sama sekali",
    q4: "Batch Pagi — Sabtu 09.00–12.00", q5: ["Produk", "Potret"], q6: 6,
    q7: "Bisnis kue rumahan saya butuh foto katalog yang menggugah.",
  }),
];
