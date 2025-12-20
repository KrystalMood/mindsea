import { Metadata } from "next";
import Hero from "@/app/latihan-soal/components/hero";
import Statistics from "@/app/latihan-soal/components/statistics";
import Exercise from "./components/exercise";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Latihan Soal | Mindsea",
  description: "Latihan soal aplikasi Mindsea",
  openGraph: {
    title: "Latihan Soal | Mindsea",
    description: "Latihan soal aplikasi Mindsea",
  },
  twitter: {
    title: "Latihan Soal | Mindsea",
    description: "Latihan soal aplikasi Mindsea",
  },
};

export default function Latihan() {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero />
      <Statistics />
      <Exercise />
    </>
  );
}
