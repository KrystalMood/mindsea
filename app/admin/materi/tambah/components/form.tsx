"use client";

import { useState } from "react";
import { LuSparkles, LuLoader, LuFileText, LuBookOpen } from "react-icons/lu";
import Input from "@/components/common/input";
import Select from "@/components/common/select";
import TextArea from "@/components/common/textarea";
import { FormData, GeneratedMaterial, KELAS_OPTIONS } from "../types";

interface FormProps {
  onResult: (result: GeneratedMaterial) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
}

export default function Form({ onResult, onLoading, onError }: FormProps) {
  const [formData, setFormData] = useState<FormData>({
    prompt: "",
    title: "",
    audience: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onLoading(true);
    onError(null);

    try {
      const response = await fetch("/api/admin/generate-materi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: formData.prompt.trim(),
          title: formData.title.trim() || undefined,
          audience: formData.audience.trim() || undefined,
          format: "markdown",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Gagal membuat materi");
      }

      onResult(data);
      setFormData({ prompt: "", title: "", audience: "" });
    } catch (err) {
      onError(err instanceof Error ? err.message : "Terjadi kesalahan");
      console.error("Error generating material:", err);
    } finally {
      setLoading(false);
      onLoading(false);
    }
  };

  return (
    <section className="border-border rounded-xl border bg-white p-6">
      <h2 className="text-heading mb-6 text-lg font-semibold">Form Generate</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Judul Materi (Opsional)"
          name="title"
          icon={<LuBookOpen size={18} />}
          type="text"
          placeholder="Contoh: Matematika Dasar untuk kelas 1 SD"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required={false}
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
          label="Prompt / Deskripsi Materi"
          name="prompt"
          placeholder="Contoh: Buatkan materi tentang penjumlahan dan pengurangan bilangan 1-20, lengkap dengan contoh soal yang mudah dipahami anak SD kelas 1..."
          value={formData.prompt}
          onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
          required
          rows={8}
          minLength={5}
          maxLength={4000}
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading || formData.prompt.trim().length < 5}
          className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition-all hover:shadow-md disabled:opacity-50"
        >
          {loading ? (
            <>
              <LuLoader size={18} className="animate-spin" />
              Sedang membuat materi...
            </>
          ) : (
            <>
              <LuSparkles size={18} />
              Generate Materi
            </>
          )}
        </button>
      </form>
    </section>
  );
}
