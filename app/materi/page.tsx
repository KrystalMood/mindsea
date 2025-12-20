import { Metadata } from "next";
import Hero from "@/app/materi/components/hero";
import Statistics from "@/app/materi/components/statistics";
import Material from "@/app/materi/components/material";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Materi | Mindsea",
  description: "Materi aplikasi Mindsea",
  openGraph: {
    title: "Materi | Mindsea",
    description: "Materi aplikasi Mindsea",
  },
  twitter: {
    title: "Materi | Mindsea",
    description: "Materi aplikasi Mindsea",
  },
};

export default function Materi() {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero />
      <Statistics />
      <Material />
    </>
  );
}
