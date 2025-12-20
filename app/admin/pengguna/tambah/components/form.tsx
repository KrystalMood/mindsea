"use client";

import Input from "@/components/common/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuLoader, LuLock, LuMail, LuUser, LuUserPlus } from "react-icons/lu";
import Select from "@/components/common/select";
import axios from "axios";

export default function Form() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    nama: "",
    surel: "",
    kata_sandi: "",
    peran: "SISWA",
    kelas: "1",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/admin/pengguna", formData);
      router.push("/admin/pengguna");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "Terjadi kesalahan pada server");
      } else {
        setError("Terjadi kesalahan. Silahkan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-border mx-6 mt-6 rounded-xl border bg-white p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <Input
          label="Nama Lengkap"
          name="nama"
          icon={<LuUser />}
          type="text"
          placeholder="Masukkan nama lengkap"
          value={formData.nama}
          onChange={handleChange}
          required
        />

        <Input
          label="Email"
          name="surel"
          icon={<LuMail />}
          type="email"
          placeholder="Masukkan email"
          value={formData.surel}
          onChange={handleChange}
          required
        />

        <Input
          label="Kata Sandi"
          name="kata_sandi"
          type="password"
          icon={<LuLock />}
          placeholder="Masukkan kata sandi"
          value={formData.kata_sandi}
          onChange={handleChange}
          required
        />

        {/* Select Peran */}
        <Select
          label="Peran"
          name="peran"
          options={[
            { value: "SISWA", label: "Siswa" },
            { value: "ADMIN", label: "Admin" },
          ]}
          value={formData.peran}
          onChange={(value) => setFormData({ ...formData, peran: value })}
          required
        />

        {/* Select Kelas - hanya ditampilkan jika peran SISWA */}
        {formData.peran === "SISWA" && (
          <Select
            label="Kelas"
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
            onChange={(value) => setFormData({ ...formData, kelas: value })}
            required
          />
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
              Menyimpan...
            </>
          ) : (
            <>
              <LuUserPlus size={18} />
              Tambah Pengguna
            </>
          )}
        </button>
      </form>
    </section>
  );
}
