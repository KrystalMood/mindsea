"use client";

import { stats } from "@/app/latihan-soal/constants/stats";

export default function Statistics({ activeIndex }: { activeIndex: number }) {
  return (
    <section className="mx-8 grid grid-cols-1 gap-6 md:grid-cols-2">
      {stats.map((stat, index) => {
        return (
          <figure key={index} className={`group relative overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300 ${stat.borderColor} ${stat.bgColor} ${activeIndex === index + 1 ? "scale-[1.02] border-transparent shadow-xl ring-4 shadow-orange-100 ring-orange-400" : "hover:shadow-md"}`}>
            <span className={`absolute -right-6 -bottom-6 h-24 w-24 rounded-full transition-transform duration-700 group-hover:scale-125 ${stat.dotColor}`} />
            <div className="relative z-10 flex items-center gap-5">
              <i className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm transition-all duration-300 ease-in-out ${stat.color}`}>
                <stat.icon size={28} />
              </i>
              <figcaption className="flex flex-col">
                <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                  {stat.label}
                </p>
                <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-800">
                  {stat.value}
                </h2>
              </figcaption>
            </div>
          </figure>
        );
      })}
    </section>
  );
}