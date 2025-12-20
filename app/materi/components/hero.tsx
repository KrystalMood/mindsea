"use client";

import { BookOpen, Volume2 } from "lucide-react";

export default function MaterialHero({ isActive }: { isActive?: boolean }) {
  return (
    <section
      className={`mx-8 mt-6 flex flex-col gap-4 rounded-xl border-2 bg-white p-6 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between ${
        isActive
          ? "scale-[1.01] border-transparent shadow-[0_4px_20px_-2px_rgba(129,140,248,0.3)]"
          : "border-transparent shadow-sm hover:border-indigo-50"
      }`}
    >
      <div className="flex items-center gap-5">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
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
      <button className="flex items-center gap-2 rounded-xl bg-indigo-100 px-4 py-2.5 text-sm font-medium text-indigo-700 transition-all hover:bg-indigo-200">
        <Volume2 size={18} />
        Dengarkan
      </button>
    </section>
  );
}
