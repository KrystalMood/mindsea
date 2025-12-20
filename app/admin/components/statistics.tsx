"use client";

import { FaRegChartBar } from "react-icons/fa";
import { LuUsers, LuBookOpen, LuTrendingUp, LuStar } from "react-icons/lu";
import { StatCard } from "@/app/admin/atoms/stats-card";

export default function Statistics() {
  const stats = [
    {
      title: "Total Pengguna",
      value: 128,
      icon: <LuUsers size={26} />,
      color: "primary" as const,
      subtitle: "+12 minggu ini",
    },
    {
      title: "Total Materi",
      value: 45,
      icon: <LuBookOpen size={26} />,
      color: "secondary" as const,
      subtitle: "8 materi baru",
    },
    {
      title: "Tingkat Penyelesaian",
      value: "78%",
      icon: <LuTrendingUp size={26} />,
      color: "accent" as const,
      subtitle: "+5% dari bulan lalu",
    },
    {
      title: "Rata-rata Nilai",
      value: 85,
      icon: <LuStar size={26} />,
      color: "primary" as const,
      subtitle: "dari 256 latihan",
    },
  ];

  return (
    <section className="mx-6 mt-8">
      <div className="mb-6 flex cursor-default items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-100">
          <FaRegChartBar className="h-4 w-4 lg:h-6 lg:w-6" />
        </span>
        <span className="flex flex-col">
          <h2 className="text-xl leading-tight font-black tracking-tight text-slate-800">
            Statistik Utama
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Ringkasan data real-time platform Mindsea
          </p>
        </span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </section>
  );
}