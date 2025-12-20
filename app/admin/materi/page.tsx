"use client";

import { useState } from "react";
import type { Metadata } from "next";

// Note: metadata cannot be exported from client components
// Move metadata to a layout.tsx if needed

interface GeneratedMaterial {
  id: string;
  text: string;
  model: string;
  title: string;
}

export default function Materi() {
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [audience, setAudience] = useState("");
  const [format, setFormat] = useState<"markdown" | "html">("markdown");
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
          format,
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
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Generate Materi Pembelajaran</h1>
        <p className="text-gray-600">
          Gunakan AI untuk membuat materi pembelajaran secara otomatis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Judul Materi (Opsional)
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Pengenalan React Hooks"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="audience"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Target Audiens (Opsional)
              </label>
              <select
                id="audience"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="">Pilih audiens...</option>
                <option value="Pemula">Pemula</option>
                <option value="Menengah">Menengah</option>
                <option value="Lanjutan">Lanjutan</option>
                <option value="Mahasiswa">Mahasiswa</option>
                <option value="Profesional">Profesional</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="format"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Format Output
              </label>
              <select
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value as "markdown" | "html")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="markdown">Markdown</option>
                <option value="html">HTML</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="prompt"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Prompt / Deskripsi Materi <span className="text-red-500">*</span>
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Contoh: Buatkan materi tentang cara menggunakan useState dan useEffect di React dengan contoh praktis..."
                rows={8}
                required
                minLength={5}
                maxLength={4000}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                disabled={loading}
              />
              <div className="text-sm text-gray-500 mt-1">
                {prompt.length} / 4000 karakter
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                ❌ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || prompt.trim().length < 5}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                "🤖 Generate Materi"
              )}
            </button>
          </form>
        </div>

        {/* Result Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Hasil Generate</h2>

          {!result && !loading && (
            <div className="text-center text-gray-500 py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-3"
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
            <div className="text-center text-gray-500 py-12">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6 mb-4 mx-auto"></div>
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
                  <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md text-sm border border-gray-200">
                    {result.text}
                  </pre>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result.text);
                    alert("Materi berhasil disalin!");
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  📋 Salin Teks
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  🔄 Buat Lagi
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Informasi</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Setiap materi akan disimpan otomatis ke database</li>
          <li>• Rate limit: 10 request per 10 menit</li>
          <li>• Materi akan mencakup: Tujuan, Penjelasan, Contoh, Kuis, dan Rangkuman</li>
          <li>• AI menggunakan model: {process.env.NEXT_PUBLIC_MODEL_NAME || "Gemini 2.5 Flash"}</li>
        </ul>
      </div>
    </div>
  );
}

