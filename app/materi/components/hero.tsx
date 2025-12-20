"use client";

import { BookOpen, Volume2 } from "lucide-react";

export default function MaterialHero() {
  return (
    <section className="m-8 flex cursor-default flex-col gap-8">
      <div className="flex items-center gap-5">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 shadow-sm">
          <BookOpen size={28} />
        </span>
        <span>
          <h1 className="text-lg font-bold text-slate-800 lg:text-2xl">
            Materi Pembelajaran 📚
          </h1>
          <p className="mt-1 text-xs text-slate-500 lg:text-sm">
            Pilih materi yang ingin kamu pelajari
          </p>
        </span>
      </div>
      <button className="flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-orange-100 px-5 py-2.5 text-xs font-medium text-orange-700 transition hover:bg-orange-200/40 lg:text-sm">
        <Volume2 size={18} />
        Dengarkan
      </button>
    </section>
  );
}