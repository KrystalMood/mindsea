import { stats } from "@/app/progres-belajar/constants/stats";

export default function Statistics() {
  return (
    <section className="mx-8 mt-6 grid cursor-default grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <figure
          key={index}
          className={`flex items-center gap-4 rounded-2xl border bg-white shadow-sm p-5 transition-all hover:shadow-md`}
        >
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm lg:h-14 lg:w-14 ${stat.iconColor}`}
          >
            <stat.icon className="h-4 w-4 lg:h-6 lg:w-6" />
          </span>
          <figcaption>
            <p className="text-sm font-medium text-text-secondary">{stat.label}</p>
            <p className="text-2xl font-bold text-heading">{stat.value}</p>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}
