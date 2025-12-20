import { Sidebar as ISidebar } from "@/types/components";
import { BarChart, Bell, BookOpen, ClipboardList, ClipboardPlus, FilePlus, Home, LayoutDashboard, List, PenTool, Users } from "lucide-react";
import { ADMIN_DASHBOARD, ADMIN_MATERIAL, ADMIN_MATERIAL_ADD, ADMIN_QUIZZES, ADMIN_QUIZZES_ADD, ADMIN_USERS, STUDENT_DASHBOARD, STUDENT_MATERIAL, STUDENT_NOTIFICATIONS, STUDENT_PROGRESS, STUDENT_QUIZZES } from "@/constants/route";
import { Peran } from "@/lib/generated/prisma";

const Sidebar: Record<Peran, ISidebar[]> = {
  ADMIN: [
    {
      href: ADMIN_DASHBOARD,
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dasbor",
    },
    {
      href: ADMIN_USERS,
      icon: <Users className="h-5 w-5" />,
      label: "Pengguna",
    },
    {
      label: "Materi",
      href: ADMIN_MATERIAL,
      icon: <BookOpen className="h-5 w-5" />,
      subMenu: [
        {
          href: ADMIN_MATERIAL,
          icon: <List className="h-5 w-5" />,
          label: "Daftar",
        },
        {
          href: ADMIN_MATERIAL_ADD,
          icon: <FilePlus className="h-5 w-5" />,
          label: "Tambah",
        },
      ]
    },
    {
      label: "Soal",
      href: ADMIN_QUIZZES,
      icon: <PenTool className="h-5 w-5" />,
      subMenu: [
        {
          href: ADMIN_QUIZZES,
          icon: <ClipboardList className="h-5 w-5" />,
          label: "Daftar",
        },
        {
          href: ADMIN_QUIZZES_ADD,
          icon: <ClipboardPlus className="h-5 w-5" />,
          label: "Tambah",
        }
      ]
    },
  ],
  SISWA: [
    {
      href: STUDENT_DASHBOARD,
      icon: <Home className="h-5 w-5" />,
      label: "Beranda",
    },
    {
      href: STUDENT_MATERIAL,
      icon: <BookOpen className="h-5 w-5" />,
      label: "Materi",
    },
    {
      href: STUDENT_QUIZZES,
      icon: <PenTool className="h-5 w-5" />,
      label: "Latihan Soal",
    },
    {
      href: STUDENT_PROGRESS,
      icon: <BarChart className="h-5 w-5" />,
      label: "Progres Belajar",
    },
    {
      href: STUDENT_NOTIFICATIONS,
      icon: <Bell className="h-5 w-5" />,
      label: "Notifikasi",
    },
  ],
};

export { Sidebar };