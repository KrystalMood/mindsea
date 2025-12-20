"use client";

import { useState, useEffect } from "react";
import { speak } from "@/lib/text-to-speech";
import Hero from "@/app/materi/components/hero";
import Statistics from "@/app/materi/components/statistics";
import Material from "@/app/materi/components/material";
import { MaterialCard as IMaterialCard } from "@/app/materi/constants/themes";
import { StatsData } from "@/app/materi/type/stats";
import statsConfig from "@/app/materi/constants/stats-config";

interface ClientProps {
  materials: IMaterialCard[];
  stats: StatsData;
}

export default function Client({ materials, stats }: ClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const statsList = statsConfig(stats);

  const dynamicSections = [
    {
      text: "Halaman Materi Pembelajaran. Pilih materi yang ingin kamu pelajari.",
    },
    ...statsList.map((s) => ({ text: `${s.label}. ${s.value}.` })),
    ...materials.map((m) => ({
      text: `Materi ${m.title}. ${m.description || ""}. Tekan enter untuk mulai.`,
    })),
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % dynamicSections.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(
          (prev) =>
            (prev - 1 + dynamicSections.length) % dynamicSections.length,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        speak(dynamicSections[activeIndex].text);

        if (activeIndex >= 4) {
          const materialIndex = activeIndex - 4;
          if (materials[materialIndex]) {
            window.location.href = `/materi/${materials[materialIndex].id}`;
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (typeof window !== "undefined" && window.speechSynthesis)
        window.speechSynthesis.cancel();
    };
  }, [activeIndex, dynamicSections, materials]);

  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <div className="transition-all">
        <Hero isActive={activeIndex === 0} />
      </div>
      <Statistics stats={stats} activeIndex={activeIndex} />
      <Material materials={materials} activeIndex={activeIndex} />
    </>
  );
}
