"use client";

import Table from "@/components/common/table";
import { LucideEdit, Trash, Eye } from "lucide-react";
import Link from "next/link";
import axios from "axios";

type Material = {
  no: number;
  id: string;
  judul: string;
  audience: string;
  format: string;
  created_at: Date;
};

export default function MateriTable({ materials }: { materials: Material[] }) {
  const handleDelete = async (id: string, judul: string) => {
    if (!confirm(`Yakin ingin menghapus materi "${judul}"?`)) return;

    try {
      await axios.delete(`/api/admin/materi/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting material:", error);
      alert("Gagal menghapus materi");
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const rows = materials.map((material) => [
    material.no.toString(),
    material.judul,
    material.audience,
    formatDate(material.created_at),
    <div key={material.id} className="flex items-center justify-center gap-3">
      <Link
        href={`/admin/materi/${material.id}`}
        className="text-text-secondary hover:text-heading inline-flex items-center gap-1 text-sm font-medium"
      >
        <Eye size={14} />
        Lihat
      </Link>
      <Link
        href={`/admin/materi/${material.id}/edit`}
        className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-sm font-medium"
      >
        <LucideEdit size={14} />
        Edit
      </Link>
      <button
        onClick={() => handleDelete(material.id, material.judul)}
        className="inline-flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600"
      >
        <Trash size={14} />
        Hapus
      </button>
    </div>,
  ]);

  return (
    <Table
      headers={["No", "Judul Materi", "Target Kelas", "Dibuat", "Aksi"]}
      sortable={["Judul Materi", "Target Kelas"]}
      rows={rows}
      itemsPerPage={5}
    />
  );
}
