import statsConfig from "@/app/materi/constants/stats-config";
import { StatsData } from "../type/stats";

export default function Statistics({
  stats,
  activeIndex,
}: {
  stats: StatsData;
  activeIndex?: number;
}) {
  return (
    <section className="mx-8 mt-6 grid cursor-default grid-cols-1 gap-4 md:grid-cols-3">
      {statsConfig(stats).map((stat, index) => {
        const isActive = activeIndex === index + 1;
        return (
          <figure
            key={index}
            className={`flex items-center gap-4 rounded-2xl border bg-white p-5 transition-all duration-300 ${
              isActive
                ? "scale-[1.02] border-transparent shadow-xl ring-4 ring-indigo-400"
                : "border-gray-200 hover:border-indigo-200 hover:shadow-sm"
            }`}
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-sm`}
            >
              <stat.icon size={24} />
            </span>
            <figcaption>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            </figcaption>
          </figure>
        );
      })}
    </section>
  );
}
