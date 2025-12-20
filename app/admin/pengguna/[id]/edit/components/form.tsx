"use client";

import Input from "@/components/common/input";
import Select from "@/components/common/select";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuLoader, LuLock, LuMail, LuUser, LuSave } from "react-icons/lu";

export default function Form() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    surel: "",
    kata_sandi: "",
    peran: "SISWA",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/admin/pengguna/${userId}`);
        setFormData({
          nama: response.data.nama,
          surel: response.data.surel,
          kata_sandi: "",
          peran: response.data.peran,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || "Gagal memuat data");
        }
      } finally {
        setFetching(false);
      }
    };

    fetchUser();
  }, [userId]);

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
      const payload = {
        nama: formData.nama,
        surel: formData.surel,
        peran: formData.peran,
        ...(formData.kata_sandi && { kata_sandi: formData.kata_sandi }),
      };

      await axios.put(`/api/admin/pengguna/${userId}`, payload);
      router.push("/admin/pengguna");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Terjadi kesalahan");
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <section className="border-border mx-6 mt-6 rounded-xl border bg-white p-6">
        <div className="flex items-center justify-center py-12">
          <LuLoader className="text-primary animate-spin" size={32} />
        </div>
      </section>
    );
  }

  return (
    <section className="border-border mx-6 mt-6 rounded-xl border bg-white p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
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
          label="Kata Sandi Baru (kosongkan jika tidak ingin mengubah)"
          name="kata_sandi"
          type="password"
          icon={<LuLock />}
          placeholder="Masukkan kata sandi baru"
          value={formData.kata_sandi}
          onChange={handleChange}
          required={false}
        />

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
              <LuSave size={18} />
              Simpan Perubahan
            </>
          )}
        </button>
      </form>
    </section>
  );
}
