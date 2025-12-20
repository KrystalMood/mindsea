"use client";

import { useState } from "react";
import { IoSparkles, IoCopy, IoRefresh } from "react-icons/io5";

interface GeneratedMaterial {
  id: string;
  text: string;
  model: string;
  title: string;
}

export default function TambahMateri() {
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [audience, setAudience] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedMaterial | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/admin/generate-materi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          title: title.trim() || undefined,
          audience: audience.trim() || undefined,
          format: "markdown",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Gagal membuat materi");
      }

      setResult(data);
      // Clear form after success
      setPrompt("");
      setTitle("");
      setAudience("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      console.error("Error generating material:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">
          Generate Materi Pembelajaran
        </h1>
        <p className="text-gray-600">
          Gunakan AI untuk membuat materi pembelajaran secara otomatis
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Form Section */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Judul Materi (Opsional)
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Matematika Dasar untuk kelas 1 SD"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="audience"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Target Kelas (Opsional)
              </label>
              <select
                id="audience"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={loading}
              >
                <option value="">Pilih kelas...</option>
                <option value="Kelas 1 SD">Kelas 1 SD</option>
                <option value="Kelas 2 SD">Kelas 2 SD</option>
                <option value="Kelas 3 SD">Kelas 3 SD</option>
                <option value="Kelas 4 SD">Kelas 4 SD</option>
                <option value="Kelas 5 SD">Kelas 5 SD</option>
                <option value="Kelas 6 SD">Kelas 6 SD</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="prompt"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Prompt / Deskripsi Materi{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Contoh: Buatkan materi tentang penjumlahan dan pengurangan bilangan 1-20, lengkap dengan contoh soal yang mudah dipahami anak SD kelas 1..."
                rows={8}
                required
                minLength={5}
                maxLength={4000}
                className="resize-vertical w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={loading}
              />
              <div className="mt-1 text-sm text-gray-500">
                {prompt.length} / 4000 karakter
              </div>
            </div>

            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                ❌ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || prompt.trim().length < 5}
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sedang membuat materi...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <IoSparkles className="mr-2" />
                  Generate Materi
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Result Section */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Hasil Generate</h2>

          {!result && !loading && (
            <div className="py-12 text-center text-gray-500">
              <svg
                className="mx-auto mb-3 h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p>Materi yang di-generate akan muncul di sini</p>
            </div>
          )}

          {loading && (
            <div className="py-12 text-center text-gray-500">
              <div className="animate-pulse">
                <div className="mx-auto mb-4 h-4 w-3/4 rounded bg-gray-200"></div>
                <div className="mb-4 h-4 w-full rounded bg-gray-200"></div>
                <div className="mx-auto mb-4 h-4 w-5/6 rounded bg-gray-200"></div>
                <div className="mx-auto mb-4 h-4 w-4/6 rounded bg-gray-200"></div>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div className="border-b pb-3">
                <h3 className="text-lg font-semibold text-green-700">
                  ✅ {result.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Model: {result.model} | ID: {result.id}
                </p>
              </div>

              <div className="max-h-[600px] overflow-y-auto">
                <div className="prose prose-sm max-w-none">
                  <pre className="rounded-md border border-gray-200 bg-gray-50 p-4 text-sm whitespace-pre-wrap">
                    {result.text}
                  </pre>
                </div>
              </div>

              <div className="flex gap-2 border-t pt-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result.text);
                    alert("Materi berhasil disalin!");
                  }}
                  className="flex-1 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 flex items-center justify-center"
                >
                  <IoCopy className="mr-2" />
                  Salin Teks
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="flex-1 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 flex items-center justify-center"
                >
                  <IoRefresh className="mr-2" />
                  Buat Lagi
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
