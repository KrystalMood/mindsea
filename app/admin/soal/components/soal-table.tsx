"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { LuEye, LuTrash2 } from "react-icons/lu";

type SoalStat = {
  judul: string;
  kelas: number | null;
  count: number;
};

type Props = {
  soalStats: SoalStat[];
};

export default function SoalTable({ soalStats: initialStats }: Props) {
  const router = useRouter();
  const [stats, setStats] = useState(initialStats);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (judul: string, kelas: number | null) => {
    const confirmMessage = `Hapus semua ${stats.find(s => s.judul === judul && s.kelas === kelas)?.count || 0} soal "${judul}" untuk Kelas ${kelas} SD?`;
    
    if (!confirm(confirmMessage)) {
      return;
    }

    const key = `${judul}-${kelas}`;
    setDeleting(key);

    try {
      await axios.delete(`/api/admin/soal?judul=${encodeURIComponent(judul)}&kelas=${kelas}`);
      
      // Remove from local state
      setStats(stats.filter(s => !(s.judul === judul && s.kelas === kelas)));
      
      alert("Soal berhasil dihapus!");
      router.refresh();
    } catch (error) {
      console.error("Error deleting questions:", error);
      alert("Gagal menghapus soal!");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left text-sm font-semibold text-heading">No</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-heading">Judul Soal</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-heading">Kelas</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-heading">Jumlah Soal</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-heading">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {stats.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-sm text-text-secondary">
                Belum ada soal. Silakan buat soal baru.
              </td>
            </tr>
          ) : (
            stats.map((stat, index) => {
              const key = `${stat.judul}-${stat.kelas}`;
              const isDeleting = deleting === key;

              return (
                <tr key={key} className="border-b border-border hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-text">{index + 1}</td>
                  <td className="px-4 py-3 text-sm text-text">{stat.judul}</td>
                  <td className="px-4 py-3 text-sm text-text">
                    {stat.kelas ? `Kelas ${stat.kelas} SD` : "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-text">{stat.count} soal</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/admin/soal/${encodeURIComponent(stat.judul)}/${stat.kelas}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        <LuEye size={14} />
                        Lihat & Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(stat.judul, stat.kelas)}
                        disabled={isDeleting}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <LuTrash2 size={14} />
                        {isDeleting ? "Menghapus..." : "Hapus"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
