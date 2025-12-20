"use client";

import { Volume2 } from "lucide-react";
import { LuSprout } from "react-icons/lu";

export default function Hero({ isActive }: { isActive?: boolean }) {
  const handleListenClick = () => {};

  return (
    <section
      className={`mx-8 mt-6 flex flex-col gap-4 rounded-xl border-2 bg-white p-6 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between ${
        isActive
          ? "scale-[1.01] border-transparent shadow-[0_4px_20px_-2px_rgba(45,212,191,0.3)]"
          : "border-transparent shadow-sm hover:border-teal-50"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
          <LuSprout size={24} />
        </div>
        <div>
          <h1 className="text-heading text-xl font-semibold">
            Selamat Datang! 👋🏻
          </h1>
          <p className="text-text-secondary text-sm">
            Apa yang ingin kamu pelajari hari ini?
          </p>
        </div>
      </div>
      <button
        onClick={handleListenClick}
        className="flex items-center gap-2 rounded-xl bg-teal-100 px-4 py-2.5 text-sm font-medium text-teal-700 transition-all hover:bg-teal-200"
      >
        <Volume2 size={18} />
        Dengarkan
      </button>
    </section>
  );
}
