import { Type, AlignLeft, CircleDot, ListChecks, Star, Gauge } from "lucide-react";

// 6 tipe pertanyaan yang didukung builder Surveiva
export const TYPES = {
  short: { id: "short", label: "Isian Pendek", desc: "Jawaban teks satu baris", icon: Type },
  paragraph: { id: "paragraph", label: "Paragraf", desc: "Jawaban teks panjang", icon: AlignLeft },
  radio: { id: "radio", label: "Pilihan Ganda", desc: "Pilih satu dari beberapa opsi", icon: CircleDot },
  checkbox: { id: "checkbox", label: "Checkbox", desc: "Pilih beberapa opsi sekaligus", icon: ListChecks },
  rating: { id: "rating", label: "Rating Bintang", desc: "Penilaian 1–5 bintang", icon: Star },
  scale: { id: "scale", label: "Skala 1–10", desc: "Angka dari 1 sampai 10", icon: Gauge },
};

export const TYPE_LIST = Object.values(TYPES);

export const OPTION_TYPES = ["radio", "checkbox"];

export const DEFAULT_LABEL = {
  short: "Pertanyaan isian pendek",
  paragraph: "Pertanyaan paragraf",
  radio: "Pertanyaan pilihan ganda",
  checkbox: "Pertanyaan checkbox",
  rating: "Beri rating 1–5 bintang",
  scale: "Skala penilaian 1–10",
};
