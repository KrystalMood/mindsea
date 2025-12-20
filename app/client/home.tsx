"use client";

import { useState, useEffect } from "react";
import { speak } from "@/lib/text-to-speech";
import Hero from "@/app/components/hero";
import Lessons from "@/app/components/lessons";
import Progress from "@/app/components/progress";

const sections: { text: string }[] = [
  { text: "Selamat Datang! Apa yang ingin kamu pelajari hari ini?" },
  { text: "Materi Belajar. Pilih materi yang ingin kamu pelajari hari ini. Tekan enter untuk memilih." },
  { text: "Latihan Soal. Uji kemampuanmu dengan latihan soal interaktif. Tekan enter untuk memilih." },
  { text: "Pencapaian Materi Selesai. Kamu telah mempelajari nol materi." },
  { text: "Pencapaian Latihan Dikerjakan. Kamu telah menyelesaikan nol latihan." },
  { text: "Pencapaian Nilai Rata-rata. Nilai rata-rata kamu adalah nol dari total seratus nilai." },
];

export default function Client() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) => (prev + 1) % sections.length);
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prev) => (prev - 1 + sections.length) % sections.length);
      } else if (e.key === "Enter") {
        speak(sections[activeIndex].text);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [activeIndex]);

  return (
    <>
      <span className="absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] opacity-10" />
      <div className={`transition-all ${activeIndex === 0 ? "ring-2 ring-blue-400 rounded-3xl" : ""}`}>
        <Hero />
      </div>
      <Lessons activeIndex={activeIndex} />
      <Progress activeIndex={activeIndex} />
    </>
  );
}