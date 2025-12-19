import { Sidebar as ISidebar } from "@/types/components";
import { BarChart, Bell, BookOpen, Home, LayoutDashboard, PenTool, Users } from "lucide-react";
import { ADMIN_DASHBOARD, ADMIN_MATERIAL, ADMIN_QUIZZES, ADMIN_USERS, STUDENT_DASHBOARD, STUDENT_MATERIAL, STUDENT_NOTIFICATIONS, STUDENT_PROGRESS, STUDENT_QUIZZES } from "@/constants/route";
import { Peran } from "@/lib/generated/prisma";

const Sidebar: Record<Peran, ISidebar[]> = {
  ADMIN: [
    {
      href: ADMIN_DASHBOARD,
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dasbor Admin",
    },
    {
      href: ADMIN_USERS,
      icon: <Users className="h-5 w-5" />,
      label: "Pengguna",
    },
    {
      label: "Konten Belajar",
      icon: <BookOpen className="h-5 w-5" />,
      subMenu: [
        {
          href: ADMIN_MATERIAL,
          icon: <BookOpen className="h-4 w-4" />,
          label: "Materi",
        },
        {
          href: ADMIN_QUIZZES,
          icon: <PenTool className="h-4 w-4" />,
          label: "Soal",
        },
      ],
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