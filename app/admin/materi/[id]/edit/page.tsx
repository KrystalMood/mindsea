"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { IoSave } from "react-icons/io5";

interface Material {
  id: string;
  judul: string;
  prompt: string;
  konten: string;
  model: string;
  audience: string | null;
  format: string;
  created_at: string;
  updated_at: string;
}

export default function EditMateri() {
  const params = useParams();
  const router = useRouter();
  const [material, setMaterial] = useState<Material | null>(null);
  const [judul, setJudul] = useState("");
  const [audience, setAudience] = useState("");
  const [konten, setKonten] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchMaterial(params.id as string);
    }
  }, [params.id]);

  const fetchMaterial = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/materi/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Gagal memuat materi");
      }

      setMaterial(data.material);
      setJudul(data.material.judul);
      setAudience(data.material.audience || "");
      setKonten(data.material.konten);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      console.error("Error fetching material:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/materi/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          judul: judul.trim(),
          konten: konten.trim(),
          audience: audience.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Gagal menyimpan perubahan");
      }

      alert("Perubahan berhasil disimpan!");
      router.push(`/admin/materi/${params.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      console.error("Error updating material:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl p-6">
        <div className="animate-pulse">
          <div className="mb-4 h-8 w-3/4 rounded bg-gray-200"></div>
          <div className="mb-4 h-4 w-1/2 rounded bg-gray-200"></div>
          <div className="mb-4 h-64 rounded bg-gray-200"></div>
        </div>
      </div>
    );
  }

  if (error && !material) {
    return (
      <div className="container mx-auto max-w-4xl p-6">
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          <p className="mb-4 text-red-700">❌ {error}</p>
          <Link href="/admin/materi" className="text-blue-600 hover:underline">
            ← Kembali ke Daftar Materi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <Link
          href={`/admin/materi/${params.id}`}
          className="mb-4 inline-block text-blue-600 hover:underline"
        >
          ← Kembali ke Detail Materi
        </Link>
        <h1 className="mb-2 text-3xl font-bold">Edit Materi</h1>
        <p className="text-gray-600">
          Ubah judul, target kelas, atau konten materi pembelajaran
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            ❌ {error}
          </div>
        )}

        {/* Judul */}
        <div className="rounded-lg border bg-white p-6">
          <label
            htmlFor="judul"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Judul Materi <span className="text-red-500">*</span>
          </label>
          <input
            id="judul"
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={saving}
          />
        </div>

        {/* Audience */}
        <div className="rounded-lg border bg-white p-6">
          <label
            htmlFor="audience"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Target Kelas
          </label>
          <select
            id="audience"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={saving}
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

        {/* Konten */}
        <div className="rounded-lg border bg-white p-6">
          <label
            htmlFor="konten"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Konten Materi <span className="text-red-500">*</span>
          </label>
          <textarea
            id="konten"
            value={konten}
            onChange={(e) => setKonten(e.target.value)}
            required
            rows={20}
            className="resize-vertical w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={saving}
          />
          <div className="mt-1 text-sm text-gray-500">
            {konten.length} karakter
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            href={`/admin/materi/${params.id}`}
            className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-center font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={saving || !judul.trim() || !konten.trim()}
            className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {saving ? (
              <span className="flex items-center justify-center">
                <svg
                  className="mr-2 h-5 w-5 animate-spin text-white"
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
                Menyimpan...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <IoSave />
                Simpan Perubahan
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
