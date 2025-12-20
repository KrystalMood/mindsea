import { stats } from "@/app/progres-belajar/constants/stats";

export default function Statistics({ activeIndex }: { activeIndex: number }) {
  return (
    <section className="mx-8 mt-6 grid cursor-default grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <figure
          key={index}
          className={`flex items-center gap-4 rounded-2xl border bg-white p-5 transition-all duration-300 ${
            activeIndex === index + 1
              ? "scale-[1.02] border-transparent shadow-xl ring-4 ring-emerald-400"
              : "border-gray-200 hover:border-emerald-200 hover:shadow-sm"
          }`}
        >
          <span
            className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl shadow-sm ${stat.bgColor} ${stat.iconColor}`}
          >
            <stat.icon size={24} />
          </span>
          <figcaption>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}
