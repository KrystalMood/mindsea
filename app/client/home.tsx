"use client";

import { useState, useEffect, useMemo } from "react";
import { speak } from "@/utils/text-to-speech";
import Hero from "@/app/components/hero";
import Lessons from "@/app/components/lessons";
import Progress from "@/app/components/progress";

export default function Client({
  stats,
}: {
  stats?: { materiSelesai: number; totalMateri: number };
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const sections: { text: string }[] = useMemo(
    () => [
      { text: "Selamat Datang! Apa yang ingin kamu pelajari hari ini?" },
      {
        text: "Materi Belajar. Pilih materi yang ingin kamu pelajari hari ini. Tekan enter untuk memilih.",
      },
      {
        text: "Latihan Soal. Uji kemampuanmu dengan latihan soal interaktif. Tekan enter untuk memilih.",
      },
      {
        text: `Pencapaian Materi Selesai. Kamu telah mempelajari ${stats?.materiSelesai ?? 0} dari ${stats?.totalMateri ?? 0} materi.`,
      },
      {
        text: "Pencapaian Latihan Dikerjakan. Kamu telah menyelesaikan nol latihan.",
      },
      {
        text: "Pencapaian Nilai Rata-rata. Nilai rata-rata kamu adalah nol dari total seratus nilai.",
      },
    ],
    [stats],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) => (prev + 1) % sections.length);
      } else if (e.key === "ArrowUp") {
        setActiveIndex(
          (prev) => (prev - 1 + sections.length) % sections.length,
        );
      } else if (e.key === "Enter") {
        speak(sections[activeIndex].text);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (typeof window !== "undefined" && window.speechSynthesis)
        window.speechSynthesis.cancel();
    };
  }, [activeIndex, sections]);

  return (
    <>
      <span className="absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] opacity-10" />
      <div className="transition-all">
        <Hero isActive={activeIndex === 0} />
      </div>
      <Lessons activeIndex={activeIndex} />
      <Progress activeIndex={activeIndex} stats={stats} />
    </>
  );
}
