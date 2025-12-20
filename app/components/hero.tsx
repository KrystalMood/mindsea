"use client";

import { Volume2 } from "lucide-react";

export default function Hero() {
  const handleListenClick = () => {};

  return (
    <section className="flex cursor-default flex-col gap-4 p-8">
      <div className="space-y-1.5">
        <h1 className="cursor-default text-xl font-bold text-slate-800 lg:text-3xl">
          Selamat Datang! 👋🏻
        </h1>
        <p className="mt-1 text-sm text-slate-600 lg:text-base">
          Apa yang ingin kamu pelajari hari ini?
        </p>
      </div>
      <button
        onClick={handleListenClick}
        className="mt-1 flex w-fit cursor-pointer items-center gap-2.5 rounded-md bg-blue-100 px-5 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-200"
      >
        <Volume2 size={18} />
        Dengarkan
      </button>
    </section>
  );
}