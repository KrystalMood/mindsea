"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { speak } from "@/lib/text-to-speech";
import Hero from "@/app/materi/components/hero";
import Statistics from "@/app/materi/components/statistics";
import Material from "@/app/materi/components/material";

const sections: { text: string }[] = [
  { text: "Halaman Materi Pembelajaran. Pilih materi yang ingin kamu pelajari hari ini." },
  { text: "Statistik Total Materi. Saat ini tersedia tiga materi pembelajaran." },
  { text: "Statistik Materi Selesai. Kamu telah menyelesaikan nol dari tiga materi." },
  { text: "Statistik Progres Belajar. Progres belajar kamu saat ini adalah nol persen." },
  { text: "Materi Matematika Dasar. Pengenalan konsep matematika dasar dengan tingkat kesulitan mudah. Tekan SHIFT untuk mulai belajar." },
  { text: "Materi Ilmu Pengetahuan Alam. Pengenalan konsep ilmu pengetahuan alam dengan tingkat kesulitan sulit. Tekan SHIFT untuk mulai belajar." },
];

const materialIds: Record<number, string> = {
  4: "matematika-dasar",
  5: "ilmu-pengetahuan-alam",
};

export default function Client() {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) => (prev + 1) % sections.length);
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prev) => (prev - 1 + sections.length) % sections.length);
      } else if (e.key === "Enter") {
        speak(sections[activeIndex].text);
      } else if (e.key === "Shift") {
        const target = materialIds[activeIndex];
        if (target) {
          speak(`Membuka halaman detail ${target.replace(/-/g, " ").toLowerCase()}`);
          router.push(`/materi/${target}`);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, router]);

  return (
    <>
      <span className="absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-10" />
      <div className={activeIndex === 0 ? "ring-2 ring-orange-400 rounded-3xl mx-4" : ""}>
        <Hero />
      </div>
      <Statistics activeIndex={activeIndex} />
      <Material activeIndex={activeIndex} />
    </>
  );
}