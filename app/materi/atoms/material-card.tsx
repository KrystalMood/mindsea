"use client";

import { BookOpen, Volume2, MoveRight, Info } from "lucide-react";
import { MaterialCard as IMaterialCard, themes } from "@/app/materi/constants/themes";
import Link from "next/link";

export default function MaterialCard({ title, description, difficulty, colorTheme }: IMaterialCard) {
  const activeTheme = themes[colorTheme];

  return (
    <figure className={`group relative flex flex-col rounded-3xl border-2 ${activeTheme.border} bg-white p-6 transition-all duration-300 ${activeTheme.shadow} overflow-hidden`}>
      <span className={`absolute -top-4 -right-4 h-32 w-32 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-150 ${activeTheme.icon.split(" ")[0]}`} />
      <div className="relative z-10 mb-4 flex items-start justify-between">
        <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${activeTheme.icon} transition-transform group-hover:scale-105`}>
          <BookOpen size={24} />
        </span>
        <span className="flex items-center gap-1 rounded-full border border-slate-100 bg-white/80 px-2 py-0.5 text-[10px] font-bold tracking-tight text-slate-400 uppercase backdrop-blur-sm">
          <Info size={10} />
          {difficulty}
        </span>
      </div>
      <figcaption className="relative z-10 flex-1">
        <h3 className="mb-1 text-xl font-extrabold tracking-tight text-slate-800 group-hover:text-slate-900">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm leading-snug text-slate-500">
          {description}
        </p>
      </figcaption>
      <span className="relative z-10 mt-4 space-y-3">
        <button className="flex items-center gap-1.5 rounded-md bg-orange-50 px-5 py-2.5 text-xs font-bold text-orange-600 transition-all duration-300 ease-in-out hover:bg-orange-100">
          <Volume2 size={12} />
          Dengarkan
        </button>
        <Link href={title.toLowerCase().replace(/ /g, "-")} className={`mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg text-sm ${activeTheme.btn} py-3.5 font-bold text-white shadow-md transition-all duration-300 ease-in-out hover:brightness-105 active:scale-[0.98]`}>
          Mulai
          <MoveRight size={18} className="transition-all duration-300 ease-in-out group-hover:translate-x-1" />
        </Link>
      </span>
    </figure>
  );
}