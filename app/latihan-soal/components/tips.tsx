"use client";

import { Lightbulb, Volume2 } from "lucide-react";

export default function Tips({ isFocused }: { isFocused?: boolean }) {
  return (
    <section className={`mx-8 mt-8 flex items-center justify-between rounded-2xl border-2 border-orange-100 bg-orange-100/50 px-6 py-4 transition-all duration-300 ${isFocused ? "border-transparent shadow-lg" : "border-orange-100 bg-orange-100/50"}`}>
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
          <Lightbulb size={20} fill="currentColor" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-orange-800">Tips Hari Ini!</h4>
          <p className="text-xs font-medium text-orange-700/80">
            Kerjakan soal dengan teliti dan jangan lupa untuk beristirahat ya!
          </p>
        </div>
      </div>
      <button className="rounded-full p-2 text-orange-400 hover:bg-orange-100">
        <Volume2 size={20} />
      </button>
    </section>
  );
}