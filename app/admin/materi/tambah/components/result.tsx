"use client";

import { LuBookOpen, LuCopy, LuLoader } from "react-icons/lu";
import { LucideRefreshCcw } from "lucide-react";
import { GeneratedMaterial } from "../types";

interface ResultProps {
  result: GeneratedMaterial | null;
  loading: boolean;
  error: string | null;
  onReset: () => void;
}

export default function Result({
  result,
  loading,
  error,
  onReset,
}: ResultProps) {
  return (
    <section className="border-border rounded-xl border bg-white p-6">
      <h2 className="text-heading mb-6 text-lg font-semibold">
        Hasil Generate
      </h2>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!result && !loading && !error && (
        <div className="text-text-secondary flex flex-col items-center justify-center py-12 h-[calc(100vh-24rem)] border-border rounded-xl border">
          <LuBookOpen size={48} className="mb-4 opacity-50" />
          <p>Materi yang di-generate akan muncul di sini</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 h-[calc(100vh-24rem)]">
          <LuLoader size={32} className="text-primary mb-4 animate-spin" />
          <p className="text-text-secondary">Sedang membuat materi...</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-4">
          <div className="border-border border-b pb-4">
            <h3 className="text-lg font-semibold text-emerald-600">
              {result.title}
            </h3>
            <p className="text-text-secondary text-sm">
              Model: {result.model} | ID: {result.id}
            </p>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            <pre className="border-border text-heading rounded-xl border bg-gray-50 p-4 text-sm whitespace-pre-wrap">
              {result.text}
            </pre>
          </div>

          <div className="border-border flex gap-3 border-t pt-4">
            <button
              onClick={() => {
                navigator.clipboard.writeText(result.text);
                alert("Materi berhasil disalin!");
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              <LuCopy size={16} />
              Salin Teks
            </button>
            <button
              onClick={onReset}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              <LucideRefreshCcw size={16} />
              Buat Lagi
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
