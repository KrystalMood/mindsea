"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LuLoader } from "react-icons/lu";
import Link from "next/link";
import Hero from "./components/hero";
import Form from "./components/form";
import { Material } from "../types";

export default function EditMateri() {
  const params = useParams();
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

  if (loading) {
    return (
      <>
        <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
        <section className="border-border mx-6 mt-6 flex items-center justify-center rounded-xl border bg-white p-12">
          <LuLoader size={32} className="text-primary animate-spin" />
        </section>
      </>
    );
  }

  if (error || !material) {
    return (
      <>
        <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
        <section className="mx-6 mt-6 rounded-xl bg-red-50 p-6">
          <p className="mb-4 text-red-600">
            {error || "Materi tidak ditemukan"}
          </p>
          <Link
            href="/admin/materi"
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            ← Kembali ke Daftar Materi
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero materialId={params.id as string} />
      <Form material={material} />
    </>
  );
}
