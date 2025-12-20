"use client";

import { LuSprout, LuCalendar } from "react-icons/lu";

export default function Hero() {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="border-secondary/20 from-primary/5 to-secondary/5 mx-6 mt-6 flex flex-col gap-4 rounded-xl border bg-gradient-to-r p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
          <LuSprout size={24} />
        </div>
        <div>
          <h1 className="text-heading text-xl font-semibold">
            Selamat Datang, Admin
          </h1>
          <p className="text-text-secondary text-sm">
            Panel administrasi Mindsea
          </p>
        </div>
      </div>
      <div className="text-text-secondary flex items-center gap-2 text-sm">
        <LuCalendar size={16} />
        <span>{today}</span>
      </div>
    </section>
  );
}
