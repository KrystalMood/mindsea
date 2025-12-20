"use client";

import { speak } from "@/lib/text-to-speech";
import { BookOpen, Volume2 } from "lucide-react";

export default function Hero({ isActive }: { isActive?: boolean }) {
  return (
    <section
      className={`mx-8 mt-6 flex flex-col gap-4 rounded-xl border-2 bg-white p-6 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between ${
        isActive
          ? "scale-[1.01] border-transparent shadow-[0_4px_20px_-2px_rgba(52,211,153,0.3)]"
          : "border-transparent shadow-sm hover:border-emerald-50"
      }`}
    >
      <div className="flex items-center gap-5">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <BookOpen className="h-4 w-4 lg:h-6 lg:w-6" />
        </span>
        <span>
          <h1 className="text-heading text-xl font-semibold">
            Progres Belajar 📈
          </h1>
          <p className="text-text-secondary text-sm">
            Pantau perkembangan belajarmu
          </p>
        </span>
      </div>
      <button
        onClick={() =>
          speak(
            "Halaman progres belajar, pantau perkembangan belajarmu di sini",
          )
        }
        className="flex items-center gap-2 rounded-xl bg-emerald-100 px-4 py-2.5 text-sm font-medium text-emerald-700 transition-all hover:bg-emerald-200"
      >
        <Volume2 size={18} />
        Dengarkan
      </button>
    </section>
  );
}
