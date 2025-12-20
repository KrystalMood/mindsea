import { StatCardProps } from "@/app/admin/types/stat-card-props";

const colorThemes = {
  primary: {
    bg: "bg-blue-50/50",
    icon: "bg-blue-100 text-blue-600",
    border: "border-blue-100",
    dot: "bg-blue-400/20",
  },
  secondary: {
    bg: "bg-emerald-50/50",
    icon: "bg-emerald-100 text-emerald-600",
    border: "border-emerald-100",
    dot: "bg-emerald-400/20",
  },
  accent: {
    bg: "bg-orange-50/50",
    icon: "bg-orange-100 text-orange-600",
    border: "border-orange-100",
    dot: "bg-orange-400/20",
  },
};

export function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
  const theme = colorThemes[color] || colorThemes.primary;

  return (
    <figure className={`group relative overflow-hidden rounded-lg border ${theme.border} ${theme.bg} p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/60`}>
      <span className={`absolute -right-8 -bottom-8 h-32 w-32 rounded-full transition-transform duration-700 group-hover:scale-110 ${theme.dot}`} />
      <div className="relative z-10 flex flex-col items-start gap-4">
        <i className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 ${theme.icon}`}>
          {icon}
        </i>
        <figcaption className="space-y-1">
          <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
            {title}
          </p>
          <div className="flex flex-col">
            <p className="text-3xl font-black tracking-tight text-slate-800">
              {value}
            </p>
            {subtitle && (
              <p className="mt-1 text-[11px] font-medium text-slate-500/70">
                {subtitle}
              </p>
            )}
          </div>
        </figcaption>
      </div>
    </figure>
  );
}