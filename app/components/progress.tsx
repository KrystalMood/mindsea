"use client";

import { BookCheck, Volume2 } from "lucide-react";
import { stats } from "@/app/constants/progress";

export default function Progress({ activeIndex }: { activeIndex: number }) {
  return (
    <section className="m-8 flex flex-col gap-6">
      <article className="flex cursor-default items-center gap-4">
        <span className="rounded-lg bg-orange-100 p-3 text-orange-600 shadow-sm">
          <BookCheck size={28} />
        </span>
        <span className="flex flex-col">
          <h3 className="text-xl font-bold text-slate-800">
            Pencapaianmu
          </h3>
          <p className="mt-0.75 text-sm text-slate-500">
            Lihat progres belajarmu sejauh ini
          </p>
        </span>
      </article>
      <article className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat, index) => (
          <figure key={index} className={`group relative flex flex-col justify-between rounded-3xl border ${stat.borderColor} bg-white p-6 transition-all hover:shadow-md ${activeIndex === index + 3 ? "ring-2 ring-blue-400 border-transparent" : ""}`}>
            <figcaption>
              <div className="mb-6 flex items-center gap-3">
                <span className={`rounded-xl ${stat.bgColor} ${stat.color} p-2`}>
                  <stat.icon size={20} fill={index === 2 ? "currentColor" : "none"} />
                </span>
                <h5 className="font-semibold text-slate-600">
                  {stat.label}
                </h5>
              </div>
              <span className="flex items-baseline gap-1">
                <h5 className="text-2xl font-black text-slate-800 lg:text-5xl">
                  {stat.value}
                </h5>
                {stat.total && (
                  <h5 className="text-base font-bold text-slate-400 lg:text-xl">
                    {stat.total}
                  </h5>
                )}
              </span>
              <p className="mt-2 text-sm text-slate-400">{stat.subLabel}</p>
            </figcaption>
            <button className={`mt-8 flex w-fit items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold transition-transform active:scale-95 ${stat.btnColor}`}>
              <Volume2 size={14} />
              Dengarkan
            </button>
          </figure>
        ))}
      </article>
    </section>
  );
}