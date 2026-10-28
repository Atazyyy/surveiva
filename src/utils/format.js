export const num = (n) => Number(n).toLocaleString("id-ID");

export const fmtDate = (ts) =>
  new Date(ts).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const fmtTime = (ts) =>
  new Date(ts).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const fmtDateTime = (ts) => `${fmtDate(ts)}, ${fmtTime(ts)}`;

export const relTime = (ts) => {
  const diff = Date.now() - ts;
  const m = Math.round(diff / 60000);
  if (m < 1) return "baru saja";
  if (m < 60) return `${m} menit lalu`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} jam lalu`;
  const d = Math.round(h / 24);
  return `${d} hari lalu`;
};

// Rata-rata untuk rating/skala → "4,3" (format id-ID)
export const avgFmt = (values) => {
  if (!values.length) return "–";
  const avg = values.reduce((s, v) => s + v, 0) / values.length;
  return avg.toLocaleString("id-ID", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
};

export const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// ---------- Export CSV client-side (blob download) ----------
const csvCell = (v) => `"${String(v).replace(/"/g, '""')}"`;

export const answerIsEmpty = (a) =>
  a === undefined || a === null || a === "" || (Array.isArray(a) && a.length === 0);

export function downloadResponsesCsv(form, responses) {
  const head = ["Waktu Pengiriman", ...form.questions.map((q) => q.label)];
  const rows = responses.map((r) => [
    fmtDateTime(r.ts),
    ...form.questions.map((q) => {
      const a = r.answers[q.id];
      if (answerIsEmpty(a)) return "";
      return Array.isArray(a) ? a.join("; ") : String(a);
    }),
  ]);
  // \uFEFF (BOM) agar karakter Indonesia terbaca benar di Excel
  const csv =
    "\uFEFF" + [head, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `surveiva-${slugify(form.title)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
