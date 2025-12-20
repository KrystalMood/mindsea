"use client";

import { BookOpen, Volume2 } from "lucide-react";

export default function MaterialHero({ isActive }: { isActive?: boolean }) {
  return (
    <section
      className={`mx-8 mt-6 flex flex-col gap-4 rounded-xl border-2 bg-white p-6 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between ${
        isActive
          ? "scale-[1.01] border-transparent shadow-[0_4px_20px_-2px_rgba(251,146,60,0.3)]"
          : "border-transparent shadow-sm hover:border-orange-50"
      }`}
    >
      <div className="flex items-center gap-5">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          <BookOpen size={28} />
        </span>
        <span>
          <h1 className="text-heading text-xl font-semibold">
            Latihan Soal 📝
          </h1>
          <p className="text-text-secondary text-sm">
            Yuk, asah kemampuanmu dengan mengerjakan soal-soal seru!
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
