"use client";

import { PenTool, Volume2 } from "lucide-react";

export default function LatihanHero() {
  return (
    <section className="mx-8 mt-6 flex flex-col gap-4 rounded-xl border border-indigo-200 bg-gradient-to-r from-slate-50 to-indigo-50 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-5">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
          <PenTool size={28} />
        </span>
        <span>
          <h1 className="text-heading text-xl font-semibold">
            Latihan Soal ✏️
          </h1>
          <p className="text-text-secondary text-sm">
            Uji pemahamanmu dengan latihan soal
          </p>
        </span>
      </div>
      <button className="flex items-center gap-2 rounded-xl bg-indigo-100 px-4 py-2.5 text-sm font-medium text-indigo-700 transition-all hover:bg-indigo-200">
        <Volume2 size={18} />
        Dengarkan
      </button>
    </section>
  );
}
