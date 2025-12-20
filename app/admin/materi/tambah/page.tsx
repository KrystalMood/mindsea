"use client";

import { useState } from "react";
import Hero from "./components/hero";
import Form from "./components/form";
import Result from "./components/result";
import { GeneratedMaterial } from "./types";

export default function TambahMateri() {
  const [result, setResult] = useState<GeneratedMaterial | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero />

      <div className="mx-6 mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Form onResult={setResult} onLoading={setLoading} onError={setError} />
        <Result
          result={result}
          loading={loading}
          error={error}
          onReset={() => setResult(null)}
        />
      </div>
    </>
  );
}
