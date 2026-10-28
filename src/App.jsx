import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FormList from "./components/FormList";
import Builder from "./components/Builder";
import FillForm from "./components/FillForm";
import Results from "./components/Results";
import { useSurveys } from "./hooks/useSurveys";

export default function App() {
  const surveys = useSurveys();
  const [view, setView] = useState("forms");
  const [formId, setFormId] = useState(null);

  const navigate = (v, id = null) => {
    setView(v);
    if (id !== null) setFormId(id);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas font-sans text-ink antialiased">
      <Navbar view={view} onNavigate={navigate} />
      <main className="flex-1 pb-20 sm:pb-0">
        <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">
          {view === "forms" && (
            <FormList surveys={surveys} onNavigate={navigate} onOpenForm={navigate} />
          )}
          {view === "builder" && (
            <Builder
              surveys={surveys}
              formId={formId}
              onSetFormId={setFormId}
              onFill={(id) => navigate("fill", id)}
            />
          )}
          {view === "fill" && (
            <FillForm
              surveys={surveys}
              formId={formId}
              onSetFormId={setFormId}
              onResults={(id) => navigate("results", id)}
            />
          )}
          {view === "results" && (
            <Results
              surveys={surveys}
              formId={formId}
              onSetFormId={setFormId}
              onFill={(id) => navigate("fill", id)}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
