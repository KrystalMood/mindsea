"use client";

import { useState } from "react";
import Hero from "./components/hero";
import Form from "./components/form";
import Preview from "./components/preview";

export type GeneratedQuestion = {
  teks_pertanyaan: string;
  pilihan: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  jawaban_benar: string;
};

export default function TambahSoal() {
  const [questions, setQuestions] = useState<GeneratedQuestion[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero />

      <div className="mx-6 mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Form
          onResult={setQuestions}
          onLoading={setLoading}
          onError={setError}
        />
        <Preview
          questions={questions}
          loading={loading}
          error={error}
          onReset={() => setQuestions(null)}
        />
      </div>
    </>
  );
}
