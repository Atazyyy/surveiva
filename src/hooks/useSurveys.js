import { useEffect, useState } from "react";
import { FORMS, SEED_RESPONSES } from "../data/seed";

const KEY = "surveiva-data-v1";

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (
        parsed &&
        Array.isArray(parsed.forms) &&
        Array.isArray(parsed.responses) &&
        parsed.forms.length > 0
      ) {
        return parsed;
      }
    }
  } catch {
    // fallback ke seed
  }
  return { forms: FORMS, responses: SEED_RESPONSES };
}

const newId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

// State sentral demo: forms + responses, persist di localStorage.
export function useSurveys() {
  const [data, setData] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      // storage penuh / private mode — abaikan
    }
  }, [data]);

  const mutateForms = (fn) =>
    setData((d) => ({ ...d, forms: fn(d.forms) }));

  const addResponse = (formId, answers) =>
    setData((d) => ({
      ...d,
      responses: [
        ...d.responses,
        { id: newId("r"), formId, ts: Date.now(), answers },
      ],
    }));

  const updateFormMeta = (formId, meta) =>
    mutateForms((fs) => fs.map((f) => (f.id === formId ? { ...f, ...meta } : f)));

  const addQuestion = (formId, q) => {
    const id = newId("q");
    mutateForms((fs) =>
      fs.map((f) =>
        f.id === formId ? { ...f, questions: [...f.questions, { id, ...q }] } : f
      )
    );
    return id;
  };

  const updateQuestion = (formId, qId, patch) =>
    mutateForms((fs) =>
      fs.map((f) =>
        f.id === formId
          ? {
              ...f,
              questions: f.questions.map((q) =>
                q.id === qId ? { ...q, ...patch } : q
              ),
            }
          : f
      )
    );

  const deleteQuestion = (formId, qId) =>
    mutateForms((fs) =>
      fs.map((f) =>
        f.id === formId
          ? { ...f, questions: f.questions.filter((q) => q.id !== qId) }
          : f
      )
    );

  const moveQuestion = (formId, qId, dir) =>
    mutateForms((fs) =>
      fs.map((f) => {
        if (f.id !== formId) return f;
        const i = f.questions.findIndex((q) => q.id === qId);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= f.questions.length) return f;
        const questions = [...f.questions];
        [questions[i], questions[j]] = [questions[j], questions[i]];
        return { ...f, questions };
      })
    );

  const resetDemo = () => setData({ forms: FORMS, responses: SEED_RESPONSES });

  return {
    forms: data.forms,
    responses: data.responses,
    addResponse,
    updateFormMeta,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    moveQuestion,
    resetDemo,
  };
}
