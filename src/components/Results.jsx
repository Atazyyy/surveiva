import { motion } from "framer-motion";
import {
  Download,
  RotateCcw,
  Users,
  ListChecks,
  Clock,
  TrendingUp,
  Star,
  Inbox,
  MessageSquare,
} from "lucide-react";
import { TYPES, OPTION_TYPES } from "../data/types";
import {
  num,
  relTime,
  avgFmt,
  downloadResponsesCsv,
  answerIsEmpty,
} from "../utils/format";

const INK = "#2e1a09";
const MUTE = "#8f7460";
const BRAND = "#ee6c0e";
const SOFT = "#f6c795";
const TRACK = "#f4e7d3";

// ---------- Grafik SVG: bar horizontal untuk pilihan ganda / checkbox ----------
function BarChartH({ data }) {
  const W = 540;
  const rowH = 42;
  const padL = 175;
  const padR = 70;
  const padT = 10;
  const H = padT * 2 + rowH * data.length;
  const max = Math.max(...data.map((d) => d.count), 1);
  const total = data.reduce((s, d) => s + d.count, 0) || 1;
  const barMax = W - padL - padR;
  const trunc = (s) => (s.length > 24 ? `${s.slice(0, 23)}…` : s);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Grafik distribusi pilihan jawaban"
    >
      {data.map((d, i) => {
        const y = padT + i * rowH;
        const w = Math.max(3, (d.count / max) * barMax);
        const top = i === 0;
        return (
          <g key={i}>
            <title>{`${d.label}: ${d.count} jawaban`}</title>
            <rect x={padL} y={y + 5} width={barMax} height={20} rx={9} fill={TRACK} />
            <rect
              x={padL}
              y={y + 5}
              width={w}
              height={20}
              rx={9}
              fill={top ? BRAND : SOFT}
            />
            <text
              x={padL - 10}
              y={y + 19}
              textAnchor="end"
              fontSize="12"
              fontWeight={top ? 700 : 500}
              fill={top ? INK : MUTE}
            >
              {trunc(d.label)}
            </text>
            <text x={padL + barMax + 8} y={y + 19} fontSize="12" fontWeight={700} fill={INK}>
              {d.count}
              <tspan fill={MUTE} fontWeight={500}>
                {" "}
                ({Math.round((d.count / total) * 100)}%)
              </tspan>
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ---------- Grafik SVG: distribusi vertikal untuk rating / skala ----------
function DistribChart({ buckets }) {
  const n = buckets.length;
  const W = Math.max(250, n * 46 + 16);
  const H = 175;
  const padB = 30;
  const padT = 20;
  const bw = 22;
  const max = Math.max(...buckets.map((b) => b.count), 1);
  const gap = (W - 12 - bw * n) / Math.max(n - 1, 1);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Grafik distribusi nilai"
    >
      {buckets.map((b, i) => {
        const x = 6 + i * (bw + gap);
        const h = Math.max(b.count ? 6 : 3, (b.count / max) * (H - padT - padB));
        return (
          <g key={b.v}>
            <title>{`Nilai ${b.v}: ${b.count} jawaban`}</title>
            {b.count > 0 && (
              <text
                x={x + bw / 2}
                y={H - padB - h - 6}
                textAnchor="middle"
                fontSize="10.5"
                fontWeight={700}
                fill={INK}
              >
                {b.count}
              </text>
            )}
            <rect
              x={x}
              y={H - padB - h}
              width={bw}
              height={h}
              rx={5}
              fill={b.count ? BRAND : TRACK}
            />
            <text
              x={x + bw / 2}
              y={H - 10}
              textAnchor="middle"
              fontSize="11"
              fontWeight={700}
              fill={MUTE}
            >
              {b.v}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ---------- Ringkasan rating bintang ----------
function StarSummary({ avg, count }) {
  const full = Math.round(avg);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className="text-3xl font-extrabold text-brand-deep">{avg}</p>
      <div>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((v) => (
            <Star
              key={v}
              className={`h-4.5 w-4.5 ${v <= full ? "text-brand" : "text-brand-dim"}`}
              fill={v <= full ? "currentColor" : "none"}
              strokeWidth={1.5}
            />
          ))}
        </div>
        <p className="mt-0.5 text-[11px] font-semibold text-mute">
          dari {num(count)} penilaian
        </p>
      </div>
    </div>
  );
}

// ---------- Kartu hasil per pertanyaan ----------
function QuestionResult({ q, index, answers }) {
  const meta = TYPES[q.type] || TYPES.short;
  const filled = answers.filter((a) => !answerIsEmpty(a));

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.25) }}
      className="rounded-2xl border border-edge bg-card p-5 shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="max-w-lg font-bold leading-snug text-ink">
          <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-brand-soft text-xs font-extrabold text-brand-deep">
            {index + 1}
          </span>
          {q.label}
        </p>
        <span className="inline-flex items-center gap-1 rounded-full bg-canvas px-2.5 py-1 text-[11px] font-bold text-mute">
          <meta.icon className="h-3 w-3" />
          {meta.label}
        </span>
      </div>

      {filled.length === 0 ? (
        <p className="mt-4 rounded-xl bg-canvas px-4 py-3 text-xs font-semibold text-mute">
          Belum ada jawaban untuk pertanyaan ini.
        </p>
      ) : (
        <div className="mt-4">
          {/* Pilihan ganda & checkbox → bar horizontal */}
          {OPTION_TYPES.includes(q.type) && (
            <>
              <BarChartH
                data={(q.options || []).map((opt) => ({
                  label: opt,
                  count: filled.filter((a) =>
                    Array.isArray(a) ? a.includes(opt) : a === opt
                  ).length,
                }))}
              />
              <p className="mt-2 text-[11px] font-semibold text-mute">
                {q.type === "checkbox"
                  ? "Satu responden bisa memilih beberapa opsi."
                  : "Satu responden memilih satu opsi."}
              </p>
            </>
          )}

          {/* Rating bintang → rata-rata + distribusi 1–5 */}
          {q.type === "rating" && (
            <div className="grid items-center gap-4 sm:grid-cols-2">
              <StarSummary avg={avgFmt(filled)} count={filled.length} />
              <DistribChart
                buckets={Array.from({ length: 5 }, (_, i) => ({
                  v: i + 1,
                  count: filled.filter((a) => a === i + 1).length,
                }))}
              />
            </div>
          )}

          {/* Skala 1–10 → rata-rata + distribusi 1–10 */}
          {q.type === "scale" && (
            <div className="grid items-center gap-4 sm:grid-cols-2">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-3xl font-extrabold text-brand-deep">{avgFmt(filled)}</p>
                <p className="text-[11px] font-semibold text-mute">
                  rata-rata skala
                  <br />
                  dari {num(filled.length)} penilaian
                </p>
              </div>
              <DistribChart
                buckets={Array.from({ length: 10 }, (_, i) => ({
                  v: i + 1,
                  count: filled.filter((a) => a === i + 1).length,
                }))}
              />
            </div>
          )}

          {/* Isian pendek & paragraf → daftar jawaban */}
          {(q.type === "short" || q.type === "paragraph") && (
            <div>
              <p className="inline-flex items-center gap-1.5 text-xs font-extrabold text-mute">
                <MessageSquare className="h-3.5 w-3.5 text-brand" />
                {num(filled.length)} jawaban
              </p>
              <ul className="mt-2 max-h-64 space-y-2 overflow-y-auto pr-1">
                {filled
                  .slice()
                  .reverse()
                  .map((a, i) => (
                    <li
                      key={i}
                      className="rounded-xl bg-canvas px-3.5 py-2.5 text-xs leading-relaxed text-ink"
                    >
                      <span className="text-mute">“{a}”</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </motion.article>
  );
}

// ---------- Dashboard hasil ----------
export default function Results({ surveys, formId, onSetFormId, onFill }) {
  const { forms, responses, resetDemo } = surveys;
  const form = forms.find((f) => f.id === formId) || forms[0];
  const own = responses
    .filter((r) => r.formId === form.id)
    .sort((a, b) => b.ts - a.ts);

  const lastTs = own.length ? own[0].ts : null;
  const weekCount = own.filter((r) => Date.now() - r.ts < 7 * 86400000).length;

  const exportCsv = () => downloadResponsesCsv(form, own);

  const handleReset = () => {
    if (window.confirm("Reset semua data demo (form & respons) ke kondisi awal?")) {
      resetDemo();
    }
  };

  return (
    <div className="space-y-6">
      {/* Switcher + aksi */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {forms.map((f) => (
            <button
              key={f.id}
              onClick={() => onSetFormId(f.id)}
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
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-card px-3.5 py-2 text-xs font-bold text-mute transition-colors hover:border-brand hover:text-brand-deep"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset demo
          </button>
          <button
            onClick={exportCsv}
            disabled={own.length === 0}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-deep disabled:opacity-40"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Header form */}
      <section className="rounded-2xl border border-edge bg-card p-5 shadow-sm sm:p-6">
        <p className="text-xs font-extrabold text-mute">
          DASHBOARD HASIL — {form.emoji}
        </p>
        <h1 className="mt-1 text-xl font-extrabold leading-snug text-ink sm:text-2xl">
          {form.title}
        </h1>
        {own.length === 0 ? (
          <div className="mt-4 flex flex-col items-start gap-3 rounded-xl border border-dashed border-brand/40 bg-brand-soft/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
              <Inbox className="h-4 w-4 text-brand" />
              Belum ada respons — bagikan formnya dulu atau isi sebagai contoh.
            </p>
            <button
              onClick={() => onFill(form.id)}
              className="shrink-0 rounded-full bg-brand px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-deep"
            >
              Isi Form Ini
            </button>
          </div>
        ) : (
          <p className="mt-1 text-sm text-mute">
            Analisis {num(own.length)} respons terkumpul — diperbarui otomatis
            setiap ada respons baru.
          </p>
        )}
      </section>

      {/* Stat ringkas */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Users, label: "Total respons", value: num(own.length) },
          { icon: ListChecks, label: "Pertanyaan", value: num(form.questions.length) },
          {
            icon: Clock,
            label: "Respons terakhir",
            value: lastTs ? relTime(lastTs) : "–",
          },
          { icon: TrendingUp, label: "Respons 7 hari", value: num(weekCount) },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-edge bg-card p-4 shadow-sm"
          >
            <p className="inline-flex items-center gap-1.5 text-[11px] font-bold text-mute">
              <s.icon className="h-3.5 w-3.5 text-brand" />
              {s.label}
            </p>
            <p className="mt-1 truncate text-xl font-extrabold text-ink">{s.value}</p>
          </div>
        ))}
      </section>

      {/* Grafik per pertanyaan */}
      <section className="space-y-4">
        <h2 className="text-sm font-extrabold text-ink">
          Rincian per pertanyaan
        </h2>
        {form.questions.map((q, i) => (
          <QuestionResult
            key={q.id}
            q={q}
            index={i}
            answers={own.map((r) => r.answers[q.id])}
          />
        ))}
      </section>
    </div>
  );
}
