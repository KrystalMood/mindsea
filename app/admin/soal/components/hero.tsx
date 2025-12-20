"use client";

import { LuBookOpen, LuPlus } from "react-icons/lu";
import { ADMIN_QUIZZES_ADD } from "@/constants/route";
import Link from "next/link";

export default function Hero() {
  return (
    <header className="mx-6 mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-indigo-100">
          <LuBookOpen size={28} />
        </div>
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            Kelola Soal
          </h1>
          <p className="text-xs font-medium text-slate-500">
            Manajemen latihan soal di platform Mindsea
          </p>
        </div>
      </div>
      <Link href={ADMIN_QUIZZES_ADD} className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4.5 py-3 text-xs font-bold text-white shadow-md shadow-indigo-100 transition-all hover:brightness-110 active:scale-95">
        <LuPlus size={18} />
        Generate Soal dengan AI
      </Link>
    </header>
  );
}