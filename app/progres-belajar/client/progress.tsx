"use client";

import { useEffect, useState } from "react";
import { speak } from "@/utils/text-to-speech";
import Hero from "@/app/progres-belajar/components/hero";
import Statistics from "@/app/progres-belajar/components/statistics";
import Chart from "@/app/progres-belajar/components/chart";
import Activity from "@/app/progres-belajar/components/activity";

const dynamicSections: { text: string }[] = [
  { text: "Halaman Progres Belajar. Pantau perkembangan belajarmu di sini." },
  { text: "Statistik Materi Dipelajari. Kamu telah mempelajari lima dari sepuluh materi." },
  { text: "Statistik Latihan Selesai. Kamu telah menyelesaikan delapan dari lima belas latihan." },
  { text: "Statistik Nilai Rata-rata. Nilai rata-rata kamu saat ini adalah delapan puluh lima persen." },
  { text: "Aktivitas Terakhir. Di sini kamu bisa melihat riwayat kegiatan belajarmu." },
];

// prettier-ignore
export default function Client() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) => (prev + 1) % dynamicSections.length);
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prev) => (prev - 1 + dynamicSections.length) % dynamicSections.length);
      } else if (e.key === "Enter") {
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
      <div className={activeIndex === 0 ? "ring-4 ring-emerald-400 rounded-2xl mx-4" : ""}>
        <Hero />
      </div>
      <Statistics activeIndex={activeIndex} />
      <section className="mx-8 mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Chart />
        <div className={activeIndex === 4 ? "ring-4 ring-indigo-400 rounded-xl" : ""}>
          <Activity />
        </div>
      </section>
    </>
  );
}