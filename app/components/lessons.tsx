"use client";

import { Volume2 } from "lucide-react";
import { lessons } from "@/app/constants/lessons";
import Link from "next/link";

export default function Lessons() {
  return (
    <section className="mx-8 mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
      {lessons.map((lesson, id) => (
        <Link
          href={lesson.url}
          key={id}
          className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm"
        >
          <span className={`absolute -top-4 -right-4 h-24 w-24 rounded-full opacity-10 ${id === 0 ? "bg-blue-500" : "bg-emerald-500"}`} />
          <figure className="relative z-10">
            <span className={`mb-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg shadow-lg ${id === 0 ? "bg-blue-500 text-white shadow-blue-200" : "bg-emerald-500 text-white shadow-emerald-200"}`}>
              <lesson.icon size={20} strokeWidth={2.5} />
            </span>
            <span className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-800 lg:text-2xl">
                {lesson.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">
                {lesson.description}
              </p>
            </span>
            <figcaption className="mt-8 flex items-center justify-between">
              <button className={`flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold transition-colors ${id === 0 ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`}>
                <Volume2 size={14} />
                Dengarkan
              </button>
              <span className={`flex items-center gap-3 text-sm font-bold ${id === 0 ? "text-blue-600" : "text-emerald-600"}`}>
                <h5>Mulai {id === 0 ? "Belajar" : "Latihan"}</h5>
                <h5 className="transition-transform group-hover:translate-x-1">
                  →
                </h5>
              </span>
            </figcaption>
          </figure>
        </Link>
      ))}
    </section>
  );
}