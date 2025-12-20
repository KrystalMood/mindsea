"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { IoCopy, IoPencil } from "react-icons/io5";

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

export default function ViewMateri() {
  const params = useParams();
  const router = useRouter();
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      console.error("Error fetching material:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  if (error || !material) {
    return (
      <div className="container mx-auto max-w-4xl p-6">
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          <p className="mb-4 text-red-700">❌ {error || "Materi tidak ditemukan"}</p>
          <Link
            href="/admin/materi"
            className="text-blue-600 hover:underline"
          >
            ← Kembali ke Daftar Materi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/materi"
          className="mb-4 inline-block text-blue-600 hover:underline"
        >
          ← Kembali ke Daftar Materi
        </Link>
        <h1 className="mb-2 text-3xl font-bold">{material.judul}</h1>
        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
            {material.audience || "Umum"}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1">
            {material.format.toUpperCase()}
          </span>
          <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
            {material.model}
          </span>
        </div>
      </div>

      {/* Metadata */}
      <div className="mb-6 rounded-lg border bg-gray-50 p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold">Dibuat:</span>{" "}
            {formatDate(material.created_at)}
          </div>
          <div>
            <span className="font-semibold">Diupdate:</span>{" "}
            {formatDate(material.updated_at)}
          </div>
        </div>
        <div className="mt-3 border-t pt-3">
          <span className="font-semibold">Prompt:</span>
          <p className="mt-1 text-gray-700">{material.prompt}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mb-6 rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Konten Materi</h2>
        <div className="prose prose-sm max-w-none">
          <pre className="whitespace-pre-wrap rounded-md border bg-gray-50 p-4 text-sm">
            {material.konten}
          </pre>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            navigator.clipboard.writeText(material.konten);
            alert("Konten berhasil disalin!");
          }}
          className="flex-1 rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200 flex items-center justify-center gap-2"
        >
          <IoCopy />
          Salin Konten
        </button>
        <Link
          href={`/admin/materi/${material.id}/edit`}
          className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <IoPencil />
          Edit Materi
        </Link>
      </div>
    </div>
  );
}
