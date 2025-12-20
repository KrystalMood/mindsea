import { LuUsers, LuBookOpen, LuTrendingUp, LuStar } from "react-icons/lu";
import { StatCardProps } from "../types/stat-card-props";
import { colorClasses } from "../constants/color-classes";

function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
  return (
    <article className="border-border flex items-center gap-4 rounded-xl border bg-white p-5 transition-all hover:shadow-md">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colorClasses[color]}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-text-secondary text-sm">{title}</p>
        <p className="text-heading text-2xl font-bold">{value}</p>
        {subtitle && <p className="text-text-secondary text-xs">{subtitle}</p>}
      </div>
    </article>
  );
}

export default function Statistics() {
  const stats = [
    {
      title: "Total Pengguna",
      value: 128,
      icon: <LuUsers size={22} />,
      color: "primary" as const,
      subtitle: "+12 minggu ini",
    },
    {
      title: "Total Materi",
      value: 45,
      icon: <LuBookOpen size={22} />,
      color: "secondary" as const,
      subtitle: "8 materi baru",
    },
    {
      title: "Tingkat Penyelesaian",
      value: "78%",
      icon: <LuTrendingUp size={22} />,
      color: "accent" as const,
      subtitle: "+5% dari bulan lalu",
    },
    {
      title: "Rata-rata Nilai",
      value: 85,
      icon: <LuStar size={22} />,
      color: "primary" as const,
      subtitle: "dari 256 latihan",
    },
  ];

  return (
    <section className="mx-6 mt-6">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-heading text-lg font-semibold">Statistik</h2>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </section>
  );
}
