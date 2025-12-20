"use client";

import Table from "@/components/common/table";
import { LucideEdit, Trash } from "lucide-react";
import Link from "next/link";
import User from "../type/user";
import axios from "axios";

export default function UserTable({ users }: { users: User[] }) {
  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus pengguna ini?")) return;

    try {
      await axios.delete(`/api/admin/pengguna/${id}`);

      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const rows = users.map((user, index) => [
    index + 1,
    user.nama,
    user.surel,
    user.peran === "ADMIN" ? "Admin" : "Siswa",
    user.peran === "SISWA" && user.kelas ? `Kelas ${user.kelas} SD` : "-",
    <div
      key={user.id.toString()}
      className="flex items-center justify-center gap-3"
    >
      <Link
        href={`/admin/pengguna/${user.id}/edit`}
        className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-sm font-medium"
      >
        <LucideEdit size={14} />
        Edit
      </Link>
      <button
        onClick={() => handleDelete(user.id.toString())}
        className="inline-flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600"
      >
        <Trash size={14} />
        Hapus
      </button>
    </div>,
  ]);

  return (
    <Table
      headers={["No", "Nama", "Surel", "Peran", "Kelas", "Aksi"]}
      sortable={["Nama", "Surel"]}
      rows={rows}
      itemsPerPage={5}
    />
  );
}
