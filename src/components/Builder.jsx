import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  Plus,
  X,
  Check,
  Eye,
  Settings2,
  ListChecks,
} from "lucide-react";
import { TYPE_LIST, TYPES, OPTION_TYPES, DEFAULT_LABEL } from "../data/types";

// ---------- Kartu pertanyaan (mode lihat) ----------
function QuestionCard({ q, index, total, editing, onEdit, onMove, onDelete }) {
  const meta = TYPES[q.type] || TYPES.short;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.22 }}
      className="rounded-2xl border border-edge bg-card p-4 shadow-sm sm:p-5"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-xs font-extrabold text-brand-deep">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-bold leading-snug text-ink">{q.label}</p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
            <span className="inline-flex items-center gap-1 rounded-full bg-canvas px-2.5 py-1 text-mute">
              <meta.icon className="h-3 w-3" />
              {meta.label}
            </span>
            {OPTION_TYPES.includes(q.type) && q.options && (
              <span className="rounded-full bg-canvas px-2.5 py-1 text-mute">
                {q.options.length} opsi
              </span>
            )}
            {q.required && (
              <span className="rounded-full bg-red-50 px-2.5 py-1 text-red-600">wajib</span>
            )}
          </div>
          {OPTION_TYPES.includes(q.type) && q.options && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {q.options.map((o, i) => (
                <span
                  key={i}
                  className="rounded-lg border border-edge bg-brand-faint px-2 py-0.5 text-[11px] font-semibold text-ink"
                >
                  {o}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Kontrol */}
        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => onMove(q.id, -1)}
            disabled={index === 0}
            aria-label="Naikkan pertanyaan"
            className="rounded-lg p-1.5 text-mute transition-colors hover:bg-brand-soft hover:text-brand-deep disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-mute"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
          <button
            onClick={() => onMove(q.id, 1)}
            disabled={index === total - 1}
            aria-label="Turunkan pertanyaan"
            className="rounded-lg p-1.5 text-mute transition-colors hover:bg-brand-soft hover:text-brand-deep disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-mute"
          >
            <ArrowDown className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(q)}
            aria-label="Edit pertanyaan"
            className="rounded-lg p-1.5 text-mute transition-colors hover:bg-brand-soft hover:text-brand-deep"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(q.id)}
            aria-label="Hapus pertanyaan"
            className="rounded-lg p-1.5 text-mute transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ---------- Kartu pertanyaan (mode edit) ----------
function QuestionEditor({ initial, onSave, onCancel }) {
  const [draft, setDraft] = useState({
    ...initial,
    label: initial.label,
    options: initial.options ? [...initial.options] : undefined,
  });
  const isOption = OPTION_TYPES.includes(draft.type);
  const optionError =
    isOption && (draft.options || []).filter((o) => o.trim()).length < 2;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.22 }}
      className="rounded-2xl border-2 border-brand/60 bg-card p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-wrap gap-4">
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <label className="text-xs font-extrabold text-mute">PERTANYAAN</label>
            <input
              value={draft.label}
              onChange={(e) => setDraft({ ...draft, label: e.target.value })}
              className="mt-1 w-full rounded-xl border border-edge bg-canvas px-3.5 py-2.5 text-sm font-semibold text-ink outline-none transition-colors focus:border-brand"
              placeholder="Tulis pertanyaannya…"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-extrabold text-mute">TIPE JAWABAN</label>
              <select
                value={draft.type}
                onChange={(e) => setDraft({ ...draft, type: e.target.value })}
                className="mt-1 w-full rounded-xl border border-edge bg-canvas px-3.5 py-2.5 text-sm font-semibold text-ink outline-none transition-colors focus:border-brand"
              >
                {TYPE_LIST.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-extrabold text-mute">WAJIB DIISI</label>
              <button
                onClick={() => setDraft({ ...draft, required: !draft.required })}
                className={`mt-1 flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                  draft.required
                    ? "border-brand bg-brand-soft text-brand-deep"
                    : "border-edge bg-canvas text-mute"
                }`}
              >
                {draft.required ? "Ya, wajib diisi" : "Tidak, opsional"}
                <span
                  className={`relative h-5 w-9 rounded-full transition-colors ${
                    draft.required ? "bg-brand" : "bg-edge"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
                      draft.required ? "left-4.5" : "left-0.5"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          {isOption && (
            <div>
              <label className="text-xs font-extrabold text-mute">OPSI JAWABAN</label>
              <div className="mt-1 space-y-2">
                {(draft.options || []).map((o, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-5 text-center text-xs font-extrabold text-mute">
                      {i + 1}
                    </span>
                    <input
                      value={o}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          options: draft.options.map((v, j) =>
                            j === i ? e.target.value : v
                          ),
                        })
                      }
                      className="min-w-0 flex-1 rounded-xl border border-edge bg-canvas px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-brand"
                    />
                    <button
                      onClick={() =>
                        setDraft({
                          ...draft,
                          options: draft.options.filter((_, j) => j !== i),
                        })
                      }
                      aria-label={`Hapus opsi ${i + 1}`}
                      className="rounded-lg p-1.5 text-mute transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              {optionError && (
                <p className="mt-1.5 text-xs font-semibold text-red-500">
                  Minimal 2 opsi terisi.
                </p>
              )}
              <button
                onClick={() =>
                  setDraft({
                    ...draft,
                    options: [...(draft.options || []), `Opsi ${(draft.options || []).length + 1}`],
                  })
                }
                className="mt-2 inline-flex items-center gap-1 rounded-full border border-dashed border-brand/50 px-3 py-1.5 text-xs font-bold text-brand-deep transition-colors hover:bg-brand-soft"
              >
                <Plus className="h-3.5 w-3.5" />
                Tambah opsi
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2 border-t border-edge pt-4">
        <button
          onClick={onCancel}
          className="rounded-full px-4 py-2 text-xs font-bold text-mute transition-colors hover:bg-canvas"
        >
          Batal
        </button>
        <button
          onClick={() =>
            onSave({
              label: draft.label.trim() || DEFAULT_LABEL[draft.type],
              type: draft.type,
              required: draft.required,
              options: isOption
                ? (draft.options || []).map((o) => o.trim()).filter(Boolean)
                : undefined,
            })
          }
          disabled={optionError}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-deep disabled:opacity-40"
        >
          <Check className="h-3.5 w-3.5" />
          Simpan Pertanyaan
        </button>
      </div>
    </motion.div>
  );
}

// ---------- Builder utama ----------
export default function Builder({ surveys, formId, onSetFormId, onFill }) {
  const { forms, updateFormMeta, addQuestion, updateQuestion, deleteQuestion, moveQuestion } =
    surveys;
  const form = forms.find((f) => f.id === formId) || forms[0];
  const [editing, setEditing] = useState(null); // { id, initial } | "new"
  const [adding, setAdding] = useState(false);
  const [metaEdit, setMetaEdit] = useState(false);
  const [meta, setMeta] = useState({ title: form.title, description: form.description });

  const startEdit = (q) => {
    setAdding(false);
    setEditing({ id: q.id, initial: q });
  };

  const handleAdd = (type) => {
    const id = addQuestion(form.id, {
      type,
      label: DEFAULT_LABEL[type],
      required: false,
      ...(OPTION_TYPES.includes(type) ? { options: ["Opsi 1", "Opsi 2", "Opsi 3"] } : {}),
    });
    setAdding(false);
    setEditing({
      id,
      initial: {
        type,
        label: DEFAULT_LABEL[type],
        required: false,
        ...(OPTION_TYPES.includes(type) ? { options: ["Opsi 1", "Opsi 2", "Opsi 3"] } : {}),
      },
    });
  };

  const saveEdit = (patch) => {
    updateQuestion(form.id, editing.id, patch);
    setEditing(null);
  };

  const handleDelete = (qId) => {
    if (!window.confirm("Hapus pertanyaan ini dari form?")) return;
    if (editing && editing.id === qId) setEditing(null);
    deleteQuestion(form.id, qId);
  };

  const saveMeta = () => {
    if (!meta.title.trim()) return;
    updateFormMeta(form.id, {
      title: meta.title.trim(),
      description: meta.description.trim(),
    });
    setMetaEdit(false);
  };

  return (
    <div className="space-y-6">
      {/* Switcher form */}
      <div className="flex flex-wrap items-center gap-2">
        {forms.map((f) => (
          <button
            key={f.id}
            onClick={() => {
              onSetFormId(f.id);
              setEditing(null);
              setAdding(false);
              setMetaEdit(false);
              setMeta({ title: f.title, description: f.description });
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

      {/* Meta form */}
      <section className="rounded-2xl border border-edge bg-card p-5 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {metaEdit ? (
              <div className="space-y-3">
                <input
                  value={meta.title}
                  onChange={(e) => setMeta({ ...meta, title: e.target.value })}
                  className="w-full rounded-xl border border-edge bg-canvas px-3.5 py-2.5 text-sm font-extrabold text-ink outline-none focus:border-brand"
                  placeholder="Judul form"
                />
                <textarea
                  value={meta.description}
                  onChange={(e) => setMeta({ ...meta, description: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl border border-edge bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand"
                  placeholder="Deskripsi form"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveMeta}
                    disabled={!meta.title.trim()}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-deep disabled:opacity-40"
                  >
                    <Check className="h-3.5 w-3.5" /> Simpan
                  </button>
                  <button
                    onClick={() => setMetaEdit(false)}
                    className="rounded-full px-4 py-2 text-xs font-bold text-mute transition-colors hover:bg-canvas"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-xs font-extrabold text-mute">BUILDER — {form.emoji} FORM AKTIF</p>
                <h1 className="mt-1 text-xl font-extrabold leading-snug text-ink">{form.title}</h1>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-mute">
                  {form.description}
                </p>
              </>
            )}
          </div>
          <div className="flex shrink-0 flex-col gap-2">
            <button
              onClick={() => {
                setMeta({ title: form.title, description: form.description });
                setMetaEdit((v) => !v);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-edge px-3.5 py-2 text-xs font-bold text-ink transition-colors hover:border-brand hover:text-brand-deep"
            >
              <Settings2 className="h-3.5 w-3.5" />
              {metaEdit ? "Tutup" : "Judul & Deskripsi"}
            </button>
            <button
              onClick={() => onFill(form.id)}
              className="inline-flex items-center gap-1.5 rounded-full border border-edge px-3.5 py-2 text-xs font-bold text-ink transition-colors hover:border-brand hover:text-brand-deep"
            >
              <Eye className="h-3.5 w-3.5" />
              Pratinjau Isi
            </button>
          </div>
        </div>
      </section>

      {/* Daftar pertanyaan */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="inline-flex items-center gap-2 text-sm font-extrabold text-ink">
            <ListChecks className="h-4 w-4 text-brand" />
            Daftar Pertanyaan ({form.questions.length})
          </h2>
          <span className="text-[11px] font-semibold text-mute">
            urutkan dengan tombol ↑ ↓
          </span>
        </div>

        <AnimatePresence initial={false} mode="popLayout">
          {form.questions.map((q, i) =>
            editing && editing.id === q.id ? (
              <QuestionEditor
                key={q.id}
                initial={editing.initial}
                onSave={saveEdit}
                onCancel={() => setEditing(null)}
              />
            ) : (
              <QuestionCard
                key={q.id}
                q={q}
                index={i}
                total={form.questions.length}
                onEdit={startEdit}
                onMove={(id, dir) => moveQuestion(form.id, id, dir)}
                onDelete={handleDelete}
              />
            )
          )}
        </AnimatePresence>

        {/* Tambah pertanyaan */}
        {adding ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border-2 border-dashed border-brand/50 bg-brand-soft/50 p-5"
          >
            <p className="text-sm font-extrabold text-ink">Pilih tipe pertanyaan</p>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {TYPE_LIST.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleAdd(t.id)}
                  className="flex items-start gap-3 rounded-xl border border-edge bg-card p-3.5 text-left transition-colors hover:border-brand"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand-deep">
                    <t.icon className="h-4.5 w-4.5" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-ink">{t.label}</span>
                    <span className="mt-0.5 block text-[11px] text-mute">{t.desc}</span>
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setAdding(false)}
              className="mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-mute transition-colors hover:bg-card"
            >
              <X className="h-3.5 w-3.5" /> Batal
            </button>
          </motion.div>
        ) : (
          !editing && (
            <button
              onClick={() => setAdding(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand/50 bg-brand-soft/40 py-4 text-sm font-bold text-brand-deep transition-colors hover:bg-brand-soft"
            >
              <Plus className="h-4 w-4" />
              Tambah Pertanyaan
            </button>
          )
        )}
      </section>
    </div>
  );
}
