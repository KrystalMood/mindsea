import { QuickAction } from "../types/quick-action"
import { LuUserPlus, LuBookOpen, LuFileText } from "react-icons/lu"

export const quickActions: QuickAction[] = [
  {
    id: 1,
    icon: <LuUserPlus size={24} />,
    title: "Tambah Pengguna",
    description: "Daftarkan pengguna baru",
    gradient: "primary",
  },
  {
    id: 2,
    icon: <LuBookOpen size={24} />,
    title: "Tambah Materi",
    description: "Publikasikan materi baru",
    gradient: "secondary",
  },
  {
    id: 3,
    icon: <LuFileText size={24} />,
    title: "Tambah Soal",
    description: "Buat soal latihan baru",
    gradient: "accent",
  },
];