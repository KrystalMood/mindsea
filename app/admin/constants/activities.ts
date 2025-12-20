import { Activity } from "../types/activity";

export const activities: Activity[] = [
  {
    id: 1,
    title: "Pengguna baru bergabung",
    description: "Ahmad Rizki mendaftar sebagai siswa baru",
    time: "5 menit lalu",
    type: "user",
  },
  {
    id: 2,
    title: "Materi baru ditambahkan",
    description: "Modul Matematika Dasar telah dipublikasikan",
    time: "30 menit lalu",
    type: "content",
  },
  {
    id: 3,
    title: "Komentar baru",
    description: "Siti Nurhaliza mengomentari Modul Fisika",
    time: "1 jam lalu",
    type: "comment",
  },
];