"use client";

import { useState } from "react";
import axios from "axios";
import { LuLoader, LuSave } from "react-icons/lu";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { GeneratedQuestion } from "../page";

type PreviewProps = {
  questions: GeneratedQuestion[] | null;
  loading: boolean;
  error: string | null;
  onReset: () => void;
};

export default function Preview({
  questions,
  loading,
  error,
}: PreviewProps) {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!questions) return;

    setSaving(true);
    try {
      await axios.post("/api/admin/soal", { questions });
      setSuccess(true);
      
      setTimeout(() => {
        router.push("/admin/soal");
      }, 2000);
    } catch (error) {
      console.error("Error saving questions:", error);
      alert("Gagal menyimpan soal. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="border-border rounded-xl border bg-white p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <LuLoader className="text-primary mb-4 animate-spin" size={48} />
          <p className="text-text-secondary text-sm">
            AI sedang membuat soal untuk Anda...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="border-border rounded-xl border bg-white p-6">
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  if (success) {
    return (
      <section className="border-border rounded-xl border bg-white p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <CheckCircle2 className="text-green-500 mb-4" size={48} />
          <p className="text-heading mb-2 text-lg font-semibold">
            Soal Berhasil Disimpan!
          </p>
          <p className="text-text-secondary text-sm">
            Mengalihkan ke halaman soal...
          </p>
        </div>
      </section>
    );
  }

  if (!questions) {
    return (
      <section className="border-border rounded-xl border bg-white p-6">
        <div className="text-text-secondary flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-primary/10 mb-4 rounded-full p-6">
            <LuLoader size={32} className="text-primary" />
          </div>
          <p className="text-sm">
            Soal yang di-generate akan muncul di sini
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-border rounded-xl border bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-heading text-lg font-semibold">
          Preview Soal ({questions.length})
        </h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all disabled:opacity-50"
        >
          {saving ? (
            <>
              <LuLoader size={16} className="animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <LuSave size={16} />
              Simpan Semua Soal
            </>
          )}
        </button>
      </div>

      <div className="max-h-150 space-y-6 overflow-y-auto pr-2">
        {questions.map((question, index) => (
          <div
            key={index}
            className="border-border rounded-lg border bg-gray-50 p-4"
          >
            <div className="mb-3 flex items-start gap-3">
              <span className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white">
                {index + 1}
              </span>
              <p className="text-heading flex-1 text-sm font-medium leading-relaxed">
                {question.teks_pertanyaan}
              </p>
            </div>

            <div className="ml-11 space-y-2">
              {Object.entries(question.pilihan).map(([key, value]) => (
                <div
                  key={key}
                  className={`rounded-lg border px-3 py-2 text-sm ${
                    key === question.jawaban_benar.toLowerCase()
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-border bg-white"
                  }`}
                >
                  <span className="font-semibold uppercase">{key}.</span> {value}
                  {key === question.jawaban_benar.toLowerCase() && (
                    <span className="ml-2 text-xs font-medium">
                      ✓ Jawaban Benar
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
