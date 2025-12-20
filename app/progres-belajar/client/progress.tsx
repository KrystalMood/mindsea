"use client";

import { useEffect, useState } from "react";
import { speak } from "@/utils/text-to-speech";
import Hero from "@/app/progres-belajar/components/hero";
import Statistics from "@/app/progres-belajar/components/statistics";
import Chart from "@/app/progres-belajar/components/chart";
import Activity from "@/app/progres-belajar/components/activity";

const dynamicSections: { text: string }[] = [
  { text: "Halaman Progres Belajar. Pantau perkembangan belajarmu di sini." }, // 0
  {
    text: "Statistik Materi Dipelajari. Kamu telah mempelajari lima dari sepuluh materi.",
  }, // 1
  {
    text: "Statistik Latihan Selesai. Kamu telah menyelesaikan delapan dari lima belas latihan.",
  }, // 2
  {
    text: "Statistik Nilai Rata-rata. Nilai rata-rata kamu saat ini adalah delapan puluh lima persen.",
  }, // 3
  { text: "Progress Keseluruhan. Delapan puluh lima persen selesai." }, // 4 (New Chart)
  {
    text: "Aktivitas Terakhir. Di sini kamu bisa melihat riwayat kegiatan belajarmu.",
  }, // 5 (Activity)
];

// prettier-ignore
export default function Client() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % dynamicSections.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + dynamicSections.length) % dynamicSections.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        speak(dynamicSections[activeIndex].text);
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
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <div className="transition-all">
        <Hero isActive={activeIndex === 0} />
      </div>
      <Statistics activeIndex={activeIndex} />
      <section className="mx-8 mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Chart isActive={activeIndex === 4} />
        <Activity isActive={activeIndex === 5} />
      </section>
    </>
  );
}
