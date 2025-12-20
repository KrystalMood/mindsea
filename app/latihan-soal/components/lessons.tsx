"use client";

import { Calculator, Volume2, MoveRight } from "lucide-react";
import { speak } from "@/utils/text-to-speech";

export default function Lessons({ data, activeIndex }: { data: { judul: string; deskripsi: string }[]; activeIndex: number }) {
  return (
    <section className="mx-8 my-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
      {data.map((exercise, index) => {
        return (
          <figure key={index} className={`group relative flex flex-col gap-6 rounded-2xl border-2 bg-white p-8 transition-all duration-300 ${activeIndex === index + 4 ? "scale-[1.02] border-transparent shadow-2xl ring-4 shadow-blue-100 ring-blue-400" : "border-slate-100 shadow-sm"}`}>
            <figcaption className="flex items-center gap-4">
              <i className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                <Calculator size={28} />
              </i>
              <span>
                <h3 className="text-xl font-black text-slate-800">
                  {exercise.judul}
                </h3>
                <p className="text-sm font-medium text-slate-500">
                  {exercise.deskripsi}
                </p>
              </span>
            </figcaption>
            <span className="flex flex-col gap-3">
              <button
                onClick={() => speak(`${exercise.judul}. ${exercise.deskripsi}`)}
                className="flex w-fit items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-100"
              >
                <Volume2 size={14} /> Dengarkan
              </button>
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:brightness-110 active:scale-95">
                Mulai Latihan <MoveRight size={20} />
              </button>
            </span>
          </figure>
        );
      })}
    </section>
  );
}