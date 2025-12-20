"use client";

import { useEffect, useState } from "react";
import { speak } from "@/lib/text-to-speech";
import Hero from "@/app/latihan-soal/components/hero";
import Statistics from "@/app/latihan-soal/components/statistics";
import Tips from "@/app/latihan-soal/components/tips";
import Lessons from "@/app/latihan-soal/components/lessons";

const dataLatihanDariDB = [
  {
    judul: "Matematika Dasar",
    deskripsi: "Latihan soal hitungan sederhana.",
  },
  {
    judul: "Bahasa Indonesia",
    deskripsi: "Latihan soal membaca dan menulis.",
  },
];

const dynamicSections: { text: string }[] = [
  {
    text: "Halaman Latihan Soal. Yuk, asah kemampuanmu dengan mengerjakan soal-soal seru!",
  },
  { text: "Statistik Soal Selesai." },
  { text: "Statistik Nilai Tertinggi." },
  {
    text: "Kerjakan soal dengan teliti dan jangan lupa untuk beristirahat ya!",
  },
  ...dataLatihanDariDB.map((example) => ({
    text: `${example.judul}. ${example.deskripsi}. Tekan enter untuk mulai.`,
  })),
];

export default function Client() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) => (prev + 1) % dynamicSections.length);
      } else if (e.key === "ArrowUp") {
        setActiveIndex(
          (prev) =>
            (prev - 1 + dynamicSections.length) % dynamicSections.length,
        );
      } else if (e.key === "Enter") {
        speak(dynamicSections[activeIndex].text);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (typeof window !== "undefined" && window.speechSynthesis)
        window.speechSynthesis.cancel();
    };
  }, [activeIndex]);

  return (
    <>
      <span className="absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-10" />
      <div className="transition-all">
        <Hero isActive={activeIndex === 0} />
      </div>
      <Statistics activeIndex={activeIndex} />
      <div
        className={
          activeIndex === 3 ? "rounded-3xl ring-2 ring-orange-400" : ""
        }
      >
        <Tips isFocused={activeIndex === 3} />
      </div>
      <Lessons data={dataLatihanDariDB} activeIndex={activeIndex} />
    </>
  );
}
