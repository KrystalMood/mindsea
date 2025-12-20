"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Input from "@/components/common/input";
import Select from "@/components/common/select";
import { LuHash, LuLoader, LuSparkles, LuUpload } from "react-icons/lu";
import { GeneratedQuestion } from "../page";

type FormProps = {
  onResult: (questions: GeneratedQuestion[]) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
};

export default function Form({ onResult, onLoading, onError }: FormProps) {
  const [formData, setFormData] = useState({
    jumlahSoal: "5",
    sumberKonteks: "materi",
    idMateri: "",
    kelas: "1",
    judul: "",
    file: null as File | null,
  });

  const [materiList, setMateriList] = useState<
    Array<{ id: string; judul: string; kelas: number | null }>
  >([]);
  const [loading, setLoading] = useState(false);

  // Fetch materi
  useEffect(() => {
    const fetchMateri = async () => {
      try {
        const params = formData.kelas ? `?kelas=${formData.kelas}` : "";
        const materiRes = await axios.get(`/api/admin/materi${params}`);
        setMateriList(materiRes.data.data || []);
      } catch (error) {
        console.error("Error fetching materi:", error);
      }
    };

    fetchMateri();
  }, [formData.kelas]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        onError("File harus berformat PDF");
        return;
      }
      setFormData({ ...formData, file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onLoading(true);
    onError(null);

    try {
      const form = new FormData();
      form.append("jumlahSoal", formData.jumlahSoal);
      form.append("sumberKonteks", formData.sumberKonteks);
      form.append("kelas", formData.kelas);
      if (formData.judul) {
        form.append("judul", formData.judul);
      }

      if (formData.sumberKonteks === "materi") {
        form.append("idMateri", formData.idMateri);
      } else if (formData.file) {
        form.append("file", formData.file);
      }

      const response = await axios.post("/api/admin/generate-soal", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onResult(response.data.questions);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        onError(
          error.response?.data?.message || "Gagal generate soal dari AI"
        );
      } else {
        onError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
      onLoading(false);
    }
  };

  return (
    <section className="border-border rounded-xl border bg-white p-6">
      <h2 className="text-heading mb-4 text-lg font-semibold">
        Konfigurasi Generate Soal
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Jumlah Soal */}
        <Input
          label="Jumlah Soal"
          name="jumlahSoal"
          type="number"
          icon={<LuHash />}
          placeholder="Masukkan jumlah soal (1-20)"
          value={formData.jumlahSoal}
          onChange={(e) =>
            setFormData({ ...formData, jumlahSoal: e.target.value })
          }
          required
        />

        {/* Judul Soal */}
        <Input
          label="Judul Soal"
          name="judul"
          type="text"
          placeholder="Contoh: UAS, UTS, Ulangan Harian"
          value={formData.judul}
          onChange={(e) =>
            setFormData({ ...formData, judul: e.target.value })
          }
        />

        {/* Soal Kelas */}
        <Select
          label="Soal Kelas"
          name="kelas"
          options={[
            { value: "1", label: "Kelas 1 SD" },
            { value: "2", label: "Kelas 2 SD" },
            { value: "3", label: "Kelas 3 SD" },
            { value: "4", label: "Kelas 4 SD" },
            { value: "5", label: "Kelas 5 SD" },
            { value: "6", label: "Kelas 6 SD" },
          ]}
          value={formData.kelas}
          onChange={(value) =>
            setFormData({ ...formData, kelas: value, idMateri: "" })
          }
          required
        />

        {/* Sumber Konteks */}
        <Select
          label="Sumber Konteks"
          name="sumberKonteks"
          options={[
            { value: "materi", label: "Dari Materi" },
            { value: "pdf", label: "Upload PDF" },
          ]}
          value={formData.sumberKonteks}
          onChange={(value) =>
            setFormData({ ...formData, sumberKonteks: value })
          }
          required
        />

        {/* Conditional: Pilih Materi atau Upload PDF */}
        {formData.sumberKonteks === "materi" ? (
          <div className="space-y-2">
            <label className="text-heading text-sm font-medium">
              Pilih Materi <span className="text-red-500">*</span>
            </label>
            <select
              className="border-border focus:border-primary w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors"
              value={formData.idMateri}
              onChange={(e) =>
                setFormData({ ...formData, idMateri: e.target.value })
              }
              required
            >
              <option value="">-- Pilih Materi --</option>
              {materiList.map((materi) => (
                <option key={materi.id} value={materi.id}>
                  {materi.kelas ? `Kelas ${materi.kelas} - ${materi.judul}` : materi.judul}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="text-heading text-sm font-medium">
              Upload PDF <span className="text-red-500">*</span>
            </label>
            <div className="border-border flex items-center gap-3 rounded-lg border bg-gray-50 px-4 py-2.5">
              <LuUpload className="text-text-secondary" size={18} />
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="text-text-secondary flex-1 text-sm"
                required
              />
            </div>
            {formData.file && (
              <p className="text-primary text-sm">
                File dipilih: {formData.file.name}
              </p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition-all hover:shadow-md disabled:opacity-50"
        >
          {loading ? (
            <>
              <LuLoader size={18} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <LuSparkles size={18} />
              Generate Soal dengan AI
            </>
          )}
        </button>
      </form>
    </section>
  );
}
