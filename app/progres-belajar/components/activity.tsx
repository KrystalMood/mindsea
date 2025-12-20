import { BookOpen, PenTool, TrendingUp, CheckCircle } from "lucide-react";
import { type LucideIcon } from "lucide-react";

type ActivityLog = {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
};

const activityLogs: ActivityLog[] = [
  {
    id: 1,
    title: "Menyelesaikan Materi",
    description: "Pengenalan JavaScript",
    time: "2 jam lalu",
    icon: BookOpen,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    id: 2,
    title: "Latihan Selesai",
    description: "Quiz Matematika Dasar",
    time: "3 jam lalu",
    icon: PenTool,
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    id: 3,
    title: "Nilai Meningkat",
    description: "Rata-rata naik 5%",
    time: "5 jam lalu",
    icon: TrendingUp,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    id: 4,
    title: "Badge Diraih",
    description: "Pembelajar Aktif",
    time: "1 hari lalu",
    icon: CheckCircle,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50",
  },
];

export default function Activity() {
  return (
    <section className="p-6 border border-gray-100 bg-white shadow-sm rounded-xl">
      <h2 className="text-heading mb-6 text-lg font-semibold">
        Aktivitas Terakhir
      </h2>
      <div className="space-y-4">
        {activityLogs.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between rounded-xl border border-gray-100 p-3 transition-all hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${log.bgColor} ${log.iconColor}`}
              >
                <log.icon size={18} />
              </span>
              <div>
                <p className="text-heading text-sm font-medium">{log.title}</p>
                <p className="text-text-secondary text-xs">{log.description}</p>
              </div>
            </div>
            <span className="text-text-secondary text-xs">{log.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
