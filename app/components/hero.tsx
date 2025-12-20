"use client";

import { Volume2 } from "lucide-react";
import { LuSprout } from "react-icons/lu";

export default function Hero() {
  const handleListenClick = () => {};

  return (
    <section className="mx-8 mt-6 flex flex-col gap-4 rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
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
