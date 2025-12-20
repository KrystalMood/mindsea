import { BarChart3, CheckCircle, LayoutGrid } from "lucide-react";
import { StatsData } from "@/app/materi/type/stats";

const statsConfig = (stats: StatsData) => [
  {
    label: "Total Materi",
    value: stats.totalMateri.toString(),
    icon: LayoutGrid,
    iconColor: "text-red-500",
  },
  {
    label: "Materi Selesai",
    value: `${stats.materiSelesai} / ${stats.totalMateri}`,
    icon: CheckCircle,
    iconColor: "text-emerald-500",
  },
  {
    label: "Progress Belajar",
    value: `${stats.progress}%`,
    icon: BarChart3,
    iconColor: "text-blue-500",
  },
];

export default statsConfig;
