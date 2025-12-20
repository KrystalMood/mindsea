import { useEffect, useState } from "react";
import Hero from "./components/hero";
import Link from "next/link";
import { IoAdd, IoEye, IoPencil, IoTime, IoTrash } from "react-icons/io5";

// const rows = [
//   ["1", "Pengenalan JavaScript", "Pemula", "15 menit", "Edit"],
//   ["2", "React Hooks Advanced", "Lanjutan", "30 menit", "Edit"],
//   ["3", "Database MySQL", "Menengah", "25 menit", "Edit"],
//   ["4", "TypeScript Fundamentals", "Pemula", "20 menit", "Edit"],
//   ["5", "Next.js App Router", "Menengah", "35 menit", "Edit"],
//   ["6", "Prisma ORM", "Menengah", "28 menit", "Edit"],
//   ["7", "Authentication & Security", "Lanjutan", "40 menit", "Edit"],
// ];

type Material = {
  id: string;
  judul: string;
  audience: string | null;
  created_at: string;
}

export default function Materi() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/materi");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Gagal memuat materi");
      }

      setMaterials(data.materials);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      console.error("Error fetching materials:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus materi "${title}"?`)) {
      return;
    }

    try {
      setDeleting(id);
      const response = await fetch(`/api/admin/materi/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Gagal menghapus materi");
      }

      // Remove from local state
      setMaterials(materials.filter((m) => m.id !== id));
      alert("Materi berhasil dihapus!");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Terjadi kesalahan");
      console.error("Error deleting material:", err);
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero />
      <section className="border-border mx-6 mt-6 rounded-xl border bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Daftar Materi yang Dibuat</h2>
          <Link
            href="/admin/materi/tambah"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 flex items-center gap-2"
          >
            <IoAdd className="text-lg" />
            Buat Materi Baru
          </Link>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            ❌ {error}
          </div>
        )}

        {loading ? (
          <div className="py-12 text-center text-gray-500">
            <div className="animate-pulse">
              <div className="mx-auto mb-4 h-4 w-3/4 rounded bg-gray-200"></div>
              <div className="mb-4 h-4 w-full rounded bg-gray-200"></div>
              <div className="mx-auto mb-4 h-4 w-5/6 rounded bg-gray-200"></div>
            </div>
          </div>
        ) : materials.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <svg
              className="mx-auto mb-3 h-12 w-12 text-gray-400"
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
            <p className="mb-4">Belum ada materi yang dibuat</p>
            <Link
              href="/admin/materi/tambah"
              className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Buat Materi Pertama
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    No
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Judul Materi
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Target Kelas
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Dibuat
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material, index) => (
                  <tr
                    key={material.id}
                    className="border-b transition-colors hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm">{index + 1}</td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {material.judul}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {material.audience || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatDate(material.created_at)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/materi/${material.id}`}
                          className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 flex items-center gap-1"
                        >
                          <IoEye />
                          Lihat
                        </Link>
                        <Link
                          href={`/admin/materi/${material.id}/edit`}
                          className="rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-200 flex items-center gap-1"
                        >
                          <IoPencil />
                          Edit
                        </Link>
                        <button
                          onClick={() =>
                            handleDelete(material.id, material.judul)
                          }
                          disabled={deleting === material.id}
                          className="rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700 transition-colors hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-1"
                        >
                          {deleting === material.id ? <IoTime className="animate-spin" /> : <IoTrash />}
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}