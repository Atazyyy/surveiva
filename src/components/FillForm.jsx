import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Star,
  BarChart3,
  PenLine,
  ClipboardList,
} from "lucide-react";
import { TYPES } from "../data/types";
import { answerIsEmpty, num } from "../utils/format";

const REQUIRED_MSG = {
  short: "Wajib diisi.",
  paragraph: "Wajib diisi.",
  radio: "Pilih salah satu.",
  checkbox: "Pilih minimal satu.",
  rating: "Beri rating dulu.",
  scale: "Pilih angka 1–10.",
};

// ---------- Input per tipe pertanyaan ----------
function RatingInput({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-1">
      {[1, 2, 3, 4, 5].map((v) => {
        const on = value >= v;
        return (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            aria-label={`Beri ${v} bintang`}
            className={`rounded-lg p-1.5 transition-transform hover:scale-110 ${
              on ? "text-brand" : "text-brand-dim"
            }`}
          >
            <Star className="h-8 w-8" fill={on ? "currentColor" : "none"} strokeWidth={1.5} />
          </button>
        );
      })}
      {value > 0 && (
        <span className="ml-2 self-center text-sm font-extrabold text-brand-deep">
          {value}/5
        </span>
      )}
    </div>
  );
}

function ScaleInput({ value, onChange }) {
  return (
    <div>
      <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`h-10 rounded-xl border text-sm font-extrabold transition-colors ${
              value === v
                ? "border-brand bg-brand text-white shadow-sm"
                : "border-edge bg-canvas text-mute hover:border-brand hover:text-brand-deep"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] font-semibold text-mute">
        <span>1 — min</span>
        <span>10 — max</span>
      </div>
    </div>
  );
}

function QuestionBlock({ q, index, value, onChange, error }) {
  const set = (v) => {
    onChange(q.id, v);
  };
  const toggleCheckbox = (opt) => {
    const arr = Array.isArray(value) ? value : [];
    set(arr.includes(opt) ? arr.filter((o) => o !== opt) : [...arr, opt]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.05, 0.3) }}
      className={`rounded-2xl border bg-card p-5 shadow-sm ${
        error ? "border-red-300" : "border-edge"
      }`}
    >
      <p className="font-bold leading-snug text-ink">
        <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-brand-soft text-xs font-extrabold text-brand-deep">
          {index + 1}
        </span>
        {q.label}
        {q.required && <span className="ml-1 text-red-500">*</span>}
      </p>

      <div className="mt-4">
        {q.type === "short" && (
          <input
            value={value ?? ""}
            onChange={(e) => set(e.target.value)}
            className="w-full rounded-xl border border-edge bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand"
            placeholder="Ketik jawabanmu…"
          />
        )}

        {q.type === "paragraph" && (
          <textarea
            value={value ?? ""}
            onChange={(e) => set(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-edge bg-canvas px-4 py-3 text-sm leading-relaxed text-ink outline-none transition-colors focus:border-brand"
            placeholder="Tulis jawabanmu di sini…"
          />
        )}

        {q.type === "radio" && (
          <div className="grid gap-2 sm:grid-cols-2">
            {(q.options || []).map((opt) => {
              const sel = value === opt;
              return (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3 text-sm transition-colors ${
                    sel
                      ? "border-brand bg-brand-soft font-bold text-ink"
                      : "border-edge bg-canvas text-mute hover:border-brand/60"
                  }`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    checked={sel}
                    onChange={() => set(opt)}
                    className="accent-brand"
                  />
                  {opt}
                </label>
              );
            })}
          </div>
        )}

        {q.type === "checkbox" && (
          <div className="grid gap-2 sm:grid-cols-2">
            {(q.options || []).map((opt) => {
              const sel = Array.isArray(value) && value.includes(opt);
              return (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3 text-sm transition-colors ${
                    sel
                      ? "border-brand bg-brand-soft font-bold text-ink"
                      : "border-edge bg-canvas text-mute hover:border-brand/60"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={sel}
                    onChange={() => toggleCheckbox(opt)}
                    className="accent-brand"
                  />
                  {opt}
                </label>
              );
            })}
          </div>
        )}

        {q.type === "rating" && <RatingInput value={value ?? 0} onChange={set} />}

        {q.type === "scale" && <ScaleInput value={value ?? 0} onChange={set} />}
      </div>

      {error && (
        <p className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-red-500">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </motion.div>
  );
}

// ---------- Mode isi form ----------
export default function FillForm({ surveys, formId, onSetFormId, onResults }) {
  const { forms, responses, addResponse } = surveys;
  const form = forms.find((f) => f.id === formId) || forms[0];
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null); // nomor respons saat sukses

  const change = (qId, v) => {
    setAnswers((a) => ({ ...a, [qId]: v }));
    setErrors((e) => {
      if (!e[qId]) return e;
      const next = { ...e };
      delete next[qId];
      return next;
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    form.questions.forEach((q) => {
      if (q.required && answerIsEmpty(answers[q.id])) {
        errs[q.id] = REQUIRED_MSG[q.type] || "Wajib diisi.";
      }
    });
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    addResponse(form.id, answers);
    setDone(responses.filter((r) => r.formId === form.id).length + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fillAgain = () => {
    setAnswers({});
    setErrors({});
    setDone(null);
    window.scrollTo({ top: 0 });
  };

  const answeredCount = form.questions.filter((q) => !answerIsEmpty(answers[q.id])).length;
  const progress = Math.round((answeredCount / form.questions.length) * 100);

  // Layar sukses
  if (done !== null) {
    return (
      <div className="mx-auto max-w-xl py-10 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50"
        >
          <CheckCircle2 className="h-11 w-11 text-emerald-500" />
        </motion.div>
        <h1 className="mt-5 text-2xl font-extrabold text-ink">Respons tersimpan!</h1>
        <p className="mt-2 leading-relaxed text-mute">
          Terima kasih — jawabanmu menjadi respons ke-{num(done)} untuk form{" "}
          <span className="font-bold text-ink">“{form.title}”</span> dan langsung
          terhitung di dashboard hasil.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            onClick={fillAgain}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-deep"
          >
            <PenLine className="h-4 w-4" />
            Isi Lagi
          </button>
          <button
            onClick={() => onResults(form.id)}
            className="inline-flex items-center gap-2 rounded-full border border-edge bg-card px-6 py-3 text-sm font-bold text-ink transition-colors hover:border-brand hover:text-brand-deep"
          >
            <BarChart3 className="h-4 w-4" />
            Lihat Hasil
          </button>
        </div>
      </div>
    );
  }

  // Form aktif
  return (
    <div className="space-y-5">
      {/* Picker form */}
      <div className="flex flex-wrap items-center gap-2">
        <ClipboardList className="h-4 w-4 text-mute" />
        {forms.map((f) => (
          <button
            key={f.id}
            onClick={() => {
              onSetFormId(f.id);
              fillAgain();
            }}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
              form.id === f.id
                ? "bg-brand text-white shadow-sm"
                : "border border-edge bg-card text-mute hover:border-brand hover:text-brand-deep"
            }`}
          >
            {f.emoji} {f.title.split(" — ")[0]}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={form.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          {/* Header form */}
          <section className="rounded-2xl border border-edge bg-card p-5 shadow-sm sm:p-6">
            <p className="text-xs font-extrabold text-mute">
              MODE RESPONDEN — {form.emoji} ISI FORM
            </p>
            <h1 className="mt-1 text-xl font-extrabold leading-snug text-ink sm:text-2xl">
              {form.title}
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-mute">
              {form.description}
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px] font-bold text-mute">
                <span>
                  {answeredCount}/{form.questions.length} pertanyaan terjawab
                </span>
                <span>{progress}%</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-canvas">
                <motion.div
                  className="h-full rounded-full bg-brand"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
            <p className="mt-3 rounded-xl bg-brand-soft/70 px-3.5 py-2 text-[11px] font-semibold text-brand-deep">
              Demo — jawabanmu hanya tersimpan di perangkat ini (localStorage),
              tidak dikirim ke server mana pun.
            </p>
          </section>

          {Object.keys(errors).length > 0 && (
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              Masih ada {Object.keys(errors).length} pertanyaan wajib yang belum
              dijawab.
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            {form.questions.map((q, i) => (
              <QuestionBlock
                key={q.id}
                q={q}
                index={i}
                value={answers[q.id]}
                onChange={change}
                error={errors[q.id]}
              />
            ))}

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-deep"
              >
                <Send className="h-4 w-4" />
                Kirim Respons
              </button>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
