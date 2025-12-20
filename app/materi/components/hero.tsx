"use client";

import { BookOpen, Volume2 } from "lucide-react";

export default function MaterialHero() {
  return (
    <section className="mx-8 mt-6 flex flex-col gap-4 rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-5">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
          <BookOpen size={28} />
        </span>
        <span>
          <h1 className="text-heading text-xl font-semibold">
            Materi Pembelajaran 📚
          </h1>
          <p className="text-text-secondary text-sm">
            Pilih materi yang ingin kamu pelajari
          </p>
        </span>
      </div>
      <button className="flex items-center gap-2 rounded-xl bg-orange-100 px-4 py-2.5 text-sm font-medium text-orange-700 transition-all hover:bg-orange-200">
        <Volume2 size={18} />
        Dengarkan
      </button>
    </section>
  );
}
