import { motion } from "framer-motion";
import {
  Sparkles,
  PenLine,
  BarChart3,
  Settings2,
  ChevronRight,
  Files,
  ListChecks,
  Users,
} from "lucide-react";
import { HERO_IMG } from "../data/seed";

export default function FormList({ surveys, onNavigate, onOpenForm }) {
  const { forms, responses } = surveys;
  const totalQuestions = forms.reduce((s, f) => s + f.questions.length, 0);
  const totalResponses = responses.length;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-extrabold text-brand-deep">
            <Sparkles className="h-3.5 w-3.5" />
            SURVEY &amp; FORM BUILDER — CONCEPT DEMO
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            Kumpulkan jawaban,{" "}
            <span className="text-brand">baca hasilnya dalam grafik.</span>
          </h1>
          <p className="mt-4 max-w-lg leading-relaxed text-mute">
            Surveiva menyatukan builder pertanyaan, mode isi form, dan dashboard
            hasil lengkap dengan export CSV — semuanya berjalan di browser,
            tanpa backend.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate("builder")}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-deep"
            >
              <PenLine className="h-4 w-4" />
              Coba Builder
            </button>
            <button
              onClick={() => onNavigate("results")}
              className="inline-flex items-center gap-2 rounded-full border border-edge bg-card px-6 py-3 text-sm font-bold text-ink transition-colors hover:border-brand hover:text-brand-deep"
            >
              <BarChart3 className="h-4 w-4" />
              Lihat Dashboard Hasil
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <img
            src={HERO_IMG}
            alt="Ilustrasi analisis hasil survei"
            className="h-56 w-full rounded-3xl object-cover ring-1 ring-edge sm:h-72"
            loading="eager"
          />
          <div className="absolute -bottom-5 left-5 rounded-2xl border border-edge bg-card px-5 py-3.5 shadow-lg">
            <p className="text-[11px] font-bold text-mute">RESPONS TERKUMPUL</p>
            <p className="text-2xl font-extrabold text-brand-deep">
              {totalResponses}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Stat ringkas */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Files, label: "Form aktif", value: forms.length, unit: "form contoh" },
          { icon: ListChecks, label: "Total pertanyaan", value: totalQuestions, unit: "pertanyaan" },
          { icon: Users, label: "Respons terkumpul", value: totalResponses, unit: "respons" },
        ].map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-4 rounded-2xl border border-edge bg-card p-5 shadow-sm"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-deep">
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-mute">{s.label}</p>
              <p className="text-xl font-extrabold text-ink">
                {s.value}{" "}
                <span className="text-xs font-semibold text-mute">{s.unit}</span>
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Daftar form */}
      <section>
        <h2 className="text-lg font-extrabold text-ink">Pilih form</h2>
        <p className="mt-1 text-sm text-mute">
          Tiga form contoh siap diisi, dianalisis, atau dirombak di builder.
        </p>
        <div className="mt-4 grid gap-5 md:grid-cols-3">
          {forms.map((f, i) => {
            const count = responses.filter((r) => r.formId === f.id).length;
            return (
              <motion.article
                key={f.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="flex flex-col overflow-hidden rounded-2xl border border-edge bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-32">
                  <img
                    src={f.cover}
                    alt={f.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-card/95 px-2.5 py-1 text-sm">
                    {f.emoji}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-extrabold leading-snug text-ink">{f.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-mute">
                    {f.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-bold">
                    <span className="rounded-full bg-canvas px-2.5 py-1 text-mute">
                      {f.questions.length} pertanyaan
                    </span>
                    <span className="rounded-full bg-brand-soft px-2.5 py-1 text-brand-deep">
                      {count} respons
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2 border-t border-edge pt-4">
                    <button
                      onClick={() => onOpenForm("fill", f.id)}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-brand px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-deep"
                    >
                      <PenLine className="h-3.5 w-3.5" />
                      Isi Form
                    </button>
                    <button
                      onClick={() => onOpenForm("results", f.id)}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-edge px-3 py-2 text-xs font-bold text-ink transition-colors hover:border-brand hover:text-brand-deep"
                    >
                      <BarChart3 className="h-3.5 w-3.5" />
                      Hasil
                    </button>
                    <button
                      onClick={() => onOpenForm("builder", f.id)}
                      aria-label={`Kelola ${f.title} di builder`}
                      className="inline-flex items-center justify-center rounded-full border border-edge px-2.5 py-2 text-mute transition-colors hover:border-brand hover:text-brand-deep"
                    >
                      <Settings2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Ajakan kecil */}
      <section className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-dashed border-brand/40 bg-brand-soft/60 p-5 sm:flex-row sm:items-center">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-extrabold">Butuh form sendiri?</span> Duplikat
          pola form contoh di builder — tambah, edit, hapus, dan atur urutan
          pertanyaan sesuai kebutuhan.
        </p>
        <button
          onClick={() => onNavigate("builder")}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-brand-deep"
        >
          Buka Builder
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </section>
    </div>
  );
}
