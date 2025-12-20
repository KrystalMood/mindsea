import { stats } from "@/app/progres-belajar/constants/stats";

export default function Statistics({ activeIndex }: { activeIndex: number }) {
  return (
    <section className="mx-8 mt-6 grid cursor-default grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <figure key={index} className={`flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-md ${activeIndex === index + 1 ? "ring-4 ring-emerald-400 border-transparent scale-[1.02]" : "border-gray-100"}`}>
          <span className={`flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm lg:h-14 lg:w-14 ${stat.iconColor}`}>
            <stat.icon className="h-4 w-4 lg:h-6 lg:w-6" />
          </span>
          <figcaption>
            <p className="text-text-secondary text-sm font-medium">
              {stat.label}
            </p>
            <p className="text-heading text-2xl font-bold">{stat.value}</p>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}