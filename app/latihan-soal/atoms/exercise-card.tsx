"use client";

import { Volume2, Info, ChevronRight, Calculator, PenTool } from "lucide-react";
import Link from "next/link";
import { speak } from "@/lib/text-to-speech";

const themes: Record<
  string,
  {
    border: string;
    bg: string;
    icon: string;
    btn: string;
    shadow: string;
    ring: string;
  }
> = {
  orange: {
    border: "border-orange-100",
    bg: "bg-orange-50",
    icon: "bg-orange-100 text-orange-600",
    btn: "bg-orange-500",
    shadow: "hover:shadow-orange-100",
    ring: "ring-orange-400",
  },
  blue: {
    border: "border-blue-100",
    bg: "bg-blue-50",
    icon: "bg-blue-100 text-blue-600",
    btn: "bg-blue-500",
    shadow: "hover:shadow-blue-100",
    ring: "ring-blue-400",
  },
};

interface ExerciseCardProps {
  index: number;
  title: string;
  description: string;
  theme: "orange" | "blue";
  isActive?: boolean;
}

export default function ExerciseCard({
  index,
  title,
  description,
  theme = "orange",
  isActive,
}: ExerciseCardProps) {
  const activeTheme = themes[theme];
  const Icon = theme === "blue" ? Calculator : PenTool;

  return (
    <figure
      className={`group relative flex flex-col overflow-hidden rounded-3xl border-2 bg-white p-6 transition-all duration-300 ${
        isActive
          ? `ring-4 ${activeTheme.ring} scale-[1.01] border-transparent shadow-xl`
          : `${activeTheme.border} hover:-translate-y-[2.5px] hover:shadow-xl`
      }`}
    >
      <span
        className={`absolute -top-4 -right-4 h-32 w-32 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-150 ${activeTheme.icon.split(" ")[0]}`}
      />
      <div className="relative z-10 mb-4 flex items-start justify-between">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${activeTheme.icon} transition-transform group-hover:scale-105`}
        >
          <Icon size={24} />
        </span>
        <span className="flex items-center gap-1 rounded-full border border-slate-100 bg-white/80 px-2 py-0.5 text-[10px] font-bold tracking-tight text-slate-400 uppercase backdrop-blur-sm">
          <Info size={10} />
          Latihan
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
        <button
          onClick={() => speak(`${title}. ${description}`)}
          className={`flex items-center gap-1.5 rounded-md ${activeTheme.bg} px-5 py-2.5 text-xs font-bold ${activeTheme.icon.split(" ")[1]} transition-all duration-300 ease-in-out hover:brightness-95`}
        >
          <Volume2 size={12} />
          Dengarkan
        </button>
        <Link
          href={`/latihan-soal/${index}`}
          className={`mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg text-sm ${activeTheme.btn} py-3.5 font-bold text-white shadow-md transition-all duration-300 ease-in-out hover:brightness-105 active:scale-[0.98]`}
        >
          Mulai Latihan
          <ChevronRight
            size={18}
            className="transition-all duration-300 ease-in-out group-hover:translate-x-1"
          />
        </Link>
      </span>
    </figure>
  );
}
