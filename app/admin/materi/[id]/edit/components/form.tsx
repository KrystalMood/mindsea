"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { LuLoader, LuSave, LuBookOpen } from "react-icons/lu";
import Link from "next/link";
import Input from "@/components/common/input";
import Select from "@/components/common/select";
import TextArea from "@/components/common/textarea";
import { Material, KELAS_OPTIONS } from "../../types";

interface FormProps {
  material: Material;
}

export default function Form({ material }: FormProps) {
  const router = useRouter();
  const params = useParams();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    judul: material.judul,
    audience: material.audience || "",
    konten: material.konten,
  });

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
          judul: formData.judul.trim(),
          konten: formData.konten.trim(),
          audience: formData.audience.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.details || data.error || "Gagal menyimpan perubahan",
        );
      }

      router.push(`/admin/materi/${params.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      console.error("Error updating material:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="border-border mx-6 mt-6 rounded-xl border bg-white p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <Input
          label="Judul Materi"
          name="judul"
          icon={<LuBookOpen size={18} />}
          type="text"
          placeholder="Masukkan judul materi"
          value={formData.judul}
          onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
          required
        />

        <Select
          label="Target Kelas (Opsional)"
          name="audience"
          value={formData.audience}
          onChange={(value) => setFormData({ ...formData, audience: value })}
          options={KELAS_OPTIONS}
          required={false}
        />

        <TextArea
          label="Konten Materi"
          name="konten"
          placeholder="Masukkan konten materi..."
          value={formData.konten}
          onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
          required
          rows={20}
          disabled={saving}
        />

        <div className="flex gap-3">
          <Link
            href={`/admin/materi/${params.id}`}
            className="border-border flex flex-1 items-center justify-center gap-2 rounded-xl border bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={
              saving || !formData.judul.trim() || !formData.konten.trim()
            }
            className="bg-primary hover:bg-primary/90 flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white transition-all hover:shadow-md disabled:opacity-50"
          >
            {saving ? (
              <>
                <LuLoader size={18} className="animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <LuSave size={18} />
                Simpan Perubahan
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
